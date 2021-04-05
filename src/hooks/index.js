import BigNumber from 'bignumber.js';
import { useInterval, useLockFn, useReactive } from 'ahooks';
import { MULTICALL_ADDRESS, RPC_URL, ZOO_TOKEN_ADDRESS, ZOO_FARMING_ADDRESS, ZOO_BOOSTING_ADDRESS, NFT_FACTORY_ADDRESS, ZOO_NFT_ADDRESS, WASP_FARMING_ADDRESS, NFT_MARKETPLACE_ADDRESS } from '../config';
import React, { useCallback, useMemo } from 'react';
import { updatePrice } from './price';
const { aggregate } = require('@makerdao/multicall');
const DataLoader = require('dataloader');

export const initialState = require('./initState.json');

//  {
//   zooBalance: new BigNumber(0),
//   address: '',
//   chainId: 999,
//   farmingInfo: {
//     startBlock: 0,
//     allEndBlock: 0,
//     zooPerBlock: 0,
//     poolLength: 0,
//   },
//   poolInfo: [],
//   goldenPrice: 0,
//   expeditions: [],
//   zooBurned: new BigNumber(0),
//   zooTotalSupply: new BigNumber(0),
//   nftBalance: 0,
//   nftCards: [],
//   blockNumber: 0,
//   marketOrderCount: 0,
//   markets: [],
// }

const differ = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return 0;
  } else {
    return 1;
  }
}

export const StorageContext = React.createContext(initialState, differ);

const useLoader = (chainId) => {
  const loader = useMemo(() => {
    if (!chainId) {
      return undefined;
    }

    const getBatchData = async (calls) => {
      try {
        const conf = {
          rpcUrl: RPC_URL[chainId],
          multicallAddress: MULTICALL_ADDRESS[chainId],
        };
        let newCalls = calls.map((v, i) => {
          v.returns = v.returns.map(r => {
            return [r[0] + '#' + i, r[1]];
          })
          return v;
        })
        // console.debug('calls', newCalls.length, newCalls, conf);
        let ret = await aggregate(newCalls, conf);
        // console.debug('aggregate ret', ret);;
        Object.keys(ret.results.transformed).map(v => {
          let str = v.split('#');
          if (!newCalls[str[1]].returnValue) {
            newCalls[str[1]].returnValue = {};
          }
          newCalls[str[1]].returnValue[str[0]] = ret.results.transformed[v];
          newCalls[str[1]].returnValue['blockNumber'] = Number(ret.results.blockNumber.toString());

          newCalls[str[1]].returns = newCalls[str[1]].returns.map(r => {
            let r0 = r[0].split('#')[0];
            return [r0, r[1]];
          })
        });

        // console.debug('calls to return', newCalls);
        return newCalls;
      } catch (error) {
        console.error('getBatchData error', error);
        return calls.map(v => (undefined));
      }
    }

    const chainDataLoader = new DataLoader(keys => getBatchData(keys), { cache: false, maxBatchSize: 100 });
    return chainDataLoader;
  }, [chainId]);
  return loader;
}

const getZooBalance = (loader, chainId, address) => {
  return loader.load({
    target: ZOO_TOKEN_ADDRESS[chainId],
    call: ['balanceOf(address)(uint256)', address],
    returns: [['zooBalance', val => (new BigNumber(val.toString())).div(1e18)]]
  });
}

const getZooTotalSupply = (loader, chainId) => {
  return loader.load({
    target: ZOO_TOKEN_ADDRESS[chainId],
    call: ['totalSupply()(uint256)'],
    returns: [['totalSupply', val => (new BigNumber(val.toString())).div(1e18)]]
  });
}

const getUserNftBalance = (loader, chainId, address) => {
  return loader.load({
    target: ZOO_NFT_ADDRESS[chainId],
    call: ['balanceOf(address)(uint256)', address],
    returns: [['nftBalance', val => Number(val)]]
  });
}

const getUserNftTokenId = (loader, chainId, address, count) => {
  let calls = Array.from({ length: count }, (v, i) => { return i }).map(i => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['tokenOfOwnerByIndex(address,uint256)(uint256)', address, i],
      returns: [['tokenId', val => val.toString()]]
    }
  });

  return loader.loadMany(calls);
}

const getNftBaseInfo = (loader, chainId, tokenIds) => {
  let calls = tokenIds.map(id => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['tokenURI(uint256)(string)', id],
      returns: [['uri', val => val]]
    }
  });

  calls = calls.concat(tokenIds.map(id => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['getBoosting(uint256)(uint256)', id],
      returns: [['boost', val => (val / 1e12 - 1)]]
    }
  }));

  calls = calls.concat(tokenIds.map(id => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['getLockTimeReduce(uint256)(uint256)', id],
      returns: [['reduce', val => (1 - val / 1e12)]]
    }
  }));

  calls = calls.concat(tokenIds.map(id => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['tokenInfo(uint256)(uint256,uint256,uint256,uint256)', id],
      returns: [
        ['level', val => Number(val)],
        ['category', val => Number(val)],
        ['item', val => Number(val)],
        ['random', val => Number(val)],
      ]
    }
  }));

  return loader.loadMany(calls);
}

const getNftItemSupply = (loader, chainId, level, category, item) => {
  return loader.load({
    target: ZOO_NFT_ADDRESS[chainId],
    call: ['itemSupply(uint256,uint256,uint256)(uint256)', level, category, item],
    returns: [['itemSupply', val => Number(val)]]
  });
}

const getZooBurned = (loader, chainId, address) => {
  return loader.load({
    target: ZOO_TOKEN_ADDRESS[chainId],
    call: ['totalBurned()(uint256)'],
    returns: [['zooBurned', val => (new BigNumber(val.toString())).div(1e18)]]
  });
}

const getZooPools = (loader, chainId, address, poolLength) => {
  let poolIndexs = Array.from({ length: poolLength }, (v, i) => i);

  //PoolInfo
  let calls = poolIndexs.map(v => {
    return {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['poolInfo(uint256)(address,uint256,uint256,uint256,uint256,uint256,bool)', v],
      returns: [
        ['lpToken', val => val],
        ['allocPoint', val => Number(val)],
        ['lastRewardBlock', val => Number(val)],
        ['accZooPerShare', val => new BigNumber(val)],
        ['waspPid', val => Number(val)],
        ['accWaspPerShare', val => new BigNumber(val)],
        ['dualFarmingEnable', val => val],
      ]
    }
  });

  //UserInfo
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['userInfo(uint256,address)(uint256,uint256,uint256)', v, address],
      returns: [
        ['lpAmount', val => (new BigNumber(val)).div(1e18)],
        ['rewardDebt', val => new BigNumber(val)],
        ['waspRewardDebt', val => new BigNumber(val)],
      ]
    }
  }));

  //PendingZoo
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['pendingZoo(uint256,address)(uint256)', v, address],
      returns: [
        ['pendingZoo', val => (new BigNumber(val)).div(1e18)],
      ]
    }
  }));

  //PendingWasp
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['pendingWasp(uint256,address)(uint256)', v, address],
      returns: [
        ['pendingWasp', val => (new BigNumber(val)).div(1e18)],
      ]
    }
  }));

  //Boosting
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_BOOSTING_ADDRESS[chainId],
      call: ['getMultiplier(uint256,address)(uint256)', v, address],
      returns: [
        ['getMultiplier', val => (val / 1e12)],
      ]
    }
  }));

  //ExpirationTime
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_BOOSTING_ADDRESS[chainId],
      call: ['getExpirationTime(uint256,address)(uint256)', v, address],
      returns: [
        ['expirationTime', val => Number(val)],
      ]
    }
  }));

  // nftId
  calls = calls.concat(poolIndexs.map(v => {
    return {
      target: ZOO_BOOSTING_ADDRESS[chainId],
      call: ['userInfo(uint256,address)(uint256,uint256,uint256)', v, address],
      returns: [
        ['startTime', val => Number(val)],
        ['lockTime', val => Number(val)],
        ['tokenId', val => Number(val)],
      ]
    }
  }));

  return loader.loadMany(calls);
}

const getLpInfo = (loader, lpToken, chainId, address, waspPid) => {
  return loader.loadMany([
    {
      target: lpToken,
      call: ['token0()(address)'],
      returns: [['token0', val => val]]
    },
    {
      target: lpToken,
      call: ['token1()(address)'],
      returns: [['token1', val => val]]
    },
    {
      target: lpToken,
      call: ['balanceOf(address)(uint256)', address],
      returns: [['lpBalance', val => (new BigNumber(val)).div(1e18)]]
    },
    {
      target: WASP_FARMING_ADDRESS[chainId],
      call: ['userInfo(uint256,address)(uint256,uint256)', waspPid, ZOO_FARMING_ADDRESS[chainId]],
      returns: [
        ['totalDeposited', val => (new BigNumber(val)).div(1e18)],
        ['waspFarmingUserRewardDebt', val => (new BigNumber(val)).div(1e18)],
      ]
    },
    {
      target: WASP_FARMING_ADDRESS[chainId],
      call: ['totalAllocPoint()(uint256)'],
      returns: [
        ['waspTotalAllocPoint', val => Number(val)],
      ]
    },
    {
      target: WASP_FARMING_ADDRESS[chainId],
      call: ['poolInfo(uint256)(address,uint256,uint256,uint256)', waspPid],
      returns: [
        ['waspLpToken', val => val],
        ['waspAllocPoint', val => Number(val)],
        ['waspLastRewardBlock', val => Number(val)],
        ['waspAccPerShare', val => val],
      ]
    },
    {
      target: lpToken,
      call: ['balanceOf(address)(uint256)', WASP_FARMING_ADDRESS[chainId]],
      returns: [['waspTotalLP', val => (new BigNumber(val)).div(1e18)]]
    },
    {
      target: lpToken,
      call: ['getReserves()(uint112,uint112,uint32)'],
      returns: [
        ['reserve0', val => val],
        ['reserve1', val => val],
        ['reserveTime', val => val],
      ]
    },
  ]);
}

const getTokenSymbols = (loader, token0, token1) => {
  return loader.loadMany([
    {
      target: token0,
      call: ['symbol()(string)'],
      returns: [['symbol0', val => val]]
    },
    {
      target: token1,
      call: ['symbol()(string)'],
      returns: [['symbol1', val => val]]
    },
    {
      target: token0,
      call: ['decimals()(uint8)'],
      returns: [['decimals0', val => val]]
    },
    {
      target: token1,
      call: ['decimals()(uint8)'],
      returns: [['decimals1', val => val]]
    },
  ]);
}

const getFarmingInfo = (loader, chainId) => {
  return loader.loadMany([
    {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['poolLength()(uint256)'],
      returns: [['poolLength', val => Number(val.toString())]]
    },
    {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['startBlock()(uint256)'],
      returns: [['startBlock', val => Number(val.toString())]]
    },
    {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['allEndBlock()(uint256)'],
      returns: [['allEndBlock', val => Number(val.toString())]]
    },
    {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['zooPerBlock()(uint256)'],
      returns: [['zooPerBlock', val => (new BigNumber(val.toString())).div(1e18)]]
    },
    {
      target: ZOO_FARMING_ADDRESS[chainId],
      call: ['totalAllocPoint()(uint256)'],
      returns: [['totalAllocPoint', val => Number(val)]]
    },
  ]);
}

const getNFTFactoryInfo = (loader, chainId, address) => {
  return loader.loadMany([
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['queryGoldenPrice()(uint256)'],
      returns: [['goldenPrice', val => (new BigNumber(val)).div(1e18)]]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakeInfo(address,uint256)(uint256,uint256,uint256)', address, 0],
      returns: [
        ['lockTime', val => Number(val)],
        ['startTime', val => Number(val)],
        ['stakeAmount', val => (new BigNumber(val)).div(1e18)],
      ]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakeInfo(address,uint256)(uint256,uint256,uint256)', address, 1],
      returns: [
        ['lockTime', val => Number(val)],
        ['startTime', val => Number(val)],
        ['stakeAmount', val => (new BigNumber(val)).div(1e18)],
      ]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakeInfo(address,uint256)(uint256,uint256,uint256)', address, 2],
      returns: [
        ['lockTime', val => Number(val)],
        ['startTime', val => Number(val)],
        ['stakeAmount', val => (new BigNumber(val)).div(1e18)],
      ]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakedAmount(uint256)(uint256)', 0],
      returns: [['stakedAmount', val => (new BigNumber(val)).div(1e18)]]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakedAmount(uint256)(uint256)', 1],
      returns: [['stakedAmount', val => (new BigNumber(val)).div(1e18)]]
    },
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['stakedAmount(uint256)(uint256)', 2],
      returns: [['stakedAmount', val => (new BigNumber(val)).div(1e18)]]
    },
  ]);
}

const getMarketCount = (loader, chainId) => {
  return loader.load({
    target: NFT_MARKETPLACE_ADDRESS[chainId],
    call: ['orderCount()(uint256)'],
    returns: [['orderCount', val => Number(val)]]
  });
}

const getMarketOrderIds = (count, loader, chainId) => {
  let calls = Array.from({ length: count }, (v, i) => i).map(v => {
    return {
      target: NFT_MARKETPLACE_ADDRESS[chainId],
      call: ['getOrderId(uint256)(uint256,bool)', v],
      returns: [
        ['id', val => '0x' + (new BigNumber(val.toString())).toString(16)],
        ['isValid', val => val],
      ]
    }
  });

  return loader.loadMany(calls);
}

const getMarketOrders = (orderIds, loader, chainId) => {
  let calls = orderIds.map(v => {
    return {
      target: NFT_MARKETPLACE_ADDRESS[chainId],
      call: ['getOrderById(uint256)(address,uint256,address,uint256,uint256,uint256)', v],
      returns: [
        ['owner', val => val],
        ['tokenId', val => val.toString()],
        ['token', val => val],
        ['price', val => val.toString()],
        ['expiration', val => Number(val)],
        ['createTime', val => Number(val)],
      ]
    }
  });

  return loader.loadMany(calls);
}

export const useDataPump = (storage, setStorage, chainId, address, connected) => {
  const loader = useLoader(chainId);
  const blockNumber = storage.blockNumber;
  const updateStorage = (newStorage) => {
    if (!newStorage.blockNumber || newStorage.blockNumber >= blockNumber) {
      setStorage(newStorage);
    } else {
      console.debug('data from old blockNumber', blockNumber, newStorage.blockNumber);
    }
  }

  const updater = useCallback(() => {
    // console.debug('timer ~', JSON.stringify(storage, null, 2));
    if (!loader) {
      return;
    }

    if (!address || address === '') {
      address = '0x00000000000000000000000000000000000000da';
    }

    if (!chainId) {
      chainId = 999;
    }

    let tmpStorage = Object.assign({ ...storage });

    getZooBalance(loader, chainId, address).then(ret => {
      // console.debug('getZooBalance ret', ret, ret.returnValue.zooBalance);
      tmpStorage.zooBalance = ret.returnValue.zooBalance;
      tmpStorage.blockNumber = ret.returnValue.blockNumber;
      updateStorage(tmpStorage);
    }).catch(err => {
      console.error('err 1', err);
    });

    getZooTotalSupply(loader, chainId).then(ret => {
      // console.debug('getZooTotalSupply ret', ret, ret.returnValue.totalSupply);
      tmpStorage.zooTotalSupply = ret.returnValue.totalSupply;
      tmpStorage.blockNumber = ret.returnValue.blockNumber;
      updateStorage(tmpStorage);
    }).catch(err => {
      console.error('err 1.1', err);
    });

    getZooBurned(loader, chainId).then(ret => {
      // console.debug('getZooBurned ret', ret, ret.returnValue.totalSupply);
      tmpStorage.zooBurned = ret.returnValue.zooBurned;
      tmpStorage.blockNumber = ret.returnValue.blockNumber;
      updateStorage(tmpStorage);
    }).catch(err => {
      console.error('err 1.2', err);
    });

    getUserNftBalance(loader, chainId, address).then(ret => {
      // console.debug('getUserNftBalance ret', ret);

      if (ret.returnValue.nftBalance > 0) {
        getUserNftTokenId(loader, chainId, address, ret.returnValue.nftBalance).then(ret => {
          // console.debug('getUserNftTokenId ret', ret);
          let tokenIds = ret.map(v => {
            return v.returnValue.tokenId;
          });

          getNftBaseInfo(loader, chainId, tokenIds).then(ret => {
            // console.debug('getNftBaseInfo ret', ret);
            let cards = [];
            for (let i = 0; i < tokenIds.length; i++) {
              cards.push({
                tokenId: tokenIds[i],
                uri: ret[i] && ret[i].returnValue.uri,
                boost: ret[i] && ret[i + tokenIds.length].returnValue.boost,
                reduce: ret[i] && ret[i + tokenIds.length * 2].returnValue.reduce,
                tokenInfo: ret[i] && { ...ret[i + tokenIds.length * 3].returnValue },
              });
            }

            Promise.all(cards.map(v => {
              return getNftItemSupply(loader, chainId, v.tokenInfo.level, v.tokenInfo.category, v.tokenInfo.item);
            })).then(ret => {
              // console.debug('getNftItemSupply ret', ret);
              cards = cards.map((v, i) => {
                v.itemSupply = ret[i].returnValue.itemSupply;
                return v;
              });

              // console.debug('cards:', cards);
              tmpStorage.nftCards = cards;
              updateStorage(tmpStorage);
            }).catch(err => {
              console.error('err 1.2.1.1', err);
            })
          });
        }).catch(err => {
          console.error('err 1.2.1', err);
        });
      } else {
        tmpStorage.nftCards = [];
        updateStorage(tmpStorage);
      }
    }).catch(err => {
      console.error('err 1.2', err);
    });

    getFarmingInfo(loader, chainId).then(ret => {
      // console.debug('getFarmingInfo ret', ret);
      let farmingInfo = tmpStorage.farmingInfo;
      ret.forEach(v => {
        farmingInfo[v.returns[0][0]] = v.returnValue[v.returns[0][0]];
      });

      // tmpStorage = Object.assign({ ...tmpStorage, farmingInfo })
      updateStorage(tmpStorage);
      // console.debug('farmingInfo', farmingInfo);

      getZooPools(loader, chainId, address, farmingInfo.poolLength).then(ret => {
        // console.debug('getZooPools ret', ret);
        let poolInfo = tmpStorage.poolInfo;

        for (let i = 0; i < farmingInfo.poolLength; i++) {
          poolInfo[i] = {
            pid: i,
            ...ret[i].returnValue,    // PoolInfo
            ...ret[farmingInfo.poolLength + i].returnValue, // UserInfo
            ...ret[2 * farmingInfo.poolLength + i].returnValue, // PendingZoo
            ...ret[3 * farmingInfo.poolLength + i].returnValue, // PendingWasp
            ...ret[4 * farmingInfo.poolLength + i].returnValue, // Boosting
            ...ret[5 * farmingInfo.poolLength + i].returnValue, // ExpirationTime
            ...ret[6 * farmingInfo.poolLength + i].returnValue, // BoostUserInfo
          };
        }

        // console.debug('poolInfo', poolInfo);

        for (let i = 0; i < farmingInfo.poolLength; i++) {
          getLpInfo(loader, poolInfo[i].lpToken, chainId, address, poolInfo[i].waspPid).then(ret => {
            // console.debug('getLpInfo', i, ret);
            poolInfo[i].token0 = ret[0].returnValue.token0;
            poolInfo[i].token1 = ret[1].returnValue.token1;
            poolInfo[i].lpBalance = ret[2].returnValue.lpBalance;
            poolInfo[i].totalDeposited = ret[3].returnValue.totalDeposited;
            poolInfo[i].waspTotalAllocPoint = ret[4].returnValue.waspTotalAllocPoint;
            poolInfo[i].waspAllocPoint = ret[5].returnValue.waspAllocPoint;
            poolInfo[i].waspTotalLP = ret[6].returnValue.waspTotalLP;
            poolInfo[i].reserve0 = ret[7].returnValue.reserve0;
            poolInfo[i].reserve1 = ret[7].returnValue.reserve1;
            poolInfo[i].reserveTime = ret[7].returnValue.reserveTime;


            getTokenSymbols(loader, poolInfo[i].token0, poolInfo[i].token1).then(ret => {
              // console.debug('getTokenSymbols', i, ret);
              poolInfo[i].symbol0 = ret[0].returnValue.symbol0;
              poolInfo[i].symbol1 = ret[1].returnValue.symbol1;
              poolInfo[i].decimals0 = ret[2].returnValue.decimals0;
              poolInfo[i].decimals1 = ret[3].returnValue.decimals1;

              updatePrice(poolInfo[i].symbol0, poolInfo[i].symbol1, poolInfo[i].decimals0, poolInfo[i].decimals1, poolInfo[i].reserve0, poolInfo[i].reserve1);

              updateStorage(tmpStorage);
            }).catch(err => {
              console.error('err 5', err);
            });
          }).catch(err => {
            console.error('err 4', err);
          });
        }
      }).catch(err => {
        console.error('err 3', err);
      });
    }).catch(err => {
      console.error('err 2', err);
    });

    getNFTFactoryInfo(loader, chainId, address).then(ret => {
      // console.debug('getNFTFactoryInfo ret', ret, tmpStorage);
      tmpStorage.goldenPrice = ret[0].returnValue.goldenPrice;
      if (!tmpStorage.expeditions) {
        tmpStorage.expeditions = [];
      }
      tmpStorage.expeditions[0] = { ...ret[1].returnValue, ...ret[4].returnValue };
      tmpStorage.expeditions[1] = { ...ret[2].returnValue, ...ret[5].returnValue };
      tmpStorage.expeditions[2] = { ...ret[3].returnValue, ...ret[6].returnValue };

      updateStorage(tmpStorage);
    }).catch(err => {
      console.error('err 30', err);
    });

    getMarketCount(loader, chainId).then(ret => {
      // console.debug('getMarketCount', ret);
      tmpStorage.marketOrderCount = ret.returnValue.orderCount;
      getMarketOrderIds(ret.returnValue.orderCount, loader, chainId).then(ret => {
        // console.debug('getMarketOrderIds', ret);
        let goodOrders = ret.filter(v => {
          return v.returnValue.isValid;
        });
        let goodOrderIds = goodOrders.map(v => {
          return v.returnValue.id;
        })
        // console.debug('goodOrderIds', goodOrderIds);

        getMarketOrders(goodOrderIds, loader, chainId).then(ret => {
          // console.debug('getMarketOrders', ret);
          tmpStorage.markets = ret.map(v=>{
            return {
              ...v.returnValue
            };
          });

          let tokenIds = tmpStorage.markets.map(v=>{
            return v.tokenId;
          })

          getNftBaseInfo(loader, chainId, tokenIds).then(ret => {
            // console.debug('getNftBaseInfo ret', ret);
            
            for (let i = 0; i < tmpStorage.markets.length; i++) {
              // console.log('goodOrderIds', goodOrderIds[i]);
              tmpStorage.markets[i] = {
                ...tmpStorage.markets[i],
                orderId: goodOrderIds[i],
                uri: ret[i] && ret[i].returnValue.uri,
                boost: ret[i] && ret[i + tokenIds.length].returnValue.boost,
                reduce: ret[i] && ret[i + tokenIds.length * 2].returnValue.reduce,
                tokenInfo: ret[i] && { ...ret[i + tokenIds.length * 3].returnValue},
              };
            }

            tmpStorage.markets = tmpStorage.markets.filter(v=>{
              return v.tokenInfo && v.uri;
            });

            Promise.all(tmpStorage.markets.map(v => {
              return getNftItemSupply(loader, chainId, v.tokenInfo.level, v.tokenInfo.category, v.tokenInfo.item);
            })).then(ret => {
              // console.debug('getNftItemSupply ret', ret);
              tmpStorage.markets = tmpStorage.markets.map((v, i) => {
                v.itemSupply = ret[i].returnValue.itemSupply;
                return v;
              });

              // console.debug('tmpStorage.markets:', tmpStorage.markets);
              updateStorage(tmpStorage);
            }).catch(err => {
              console.error('err 1.2.1.1', err);
            })
          });
        }).catch(err => {
          console.error('err getMarketOrders', err);
        })
      }).catch(err => {
        console.error('err getMarketOrderIds', err);
      })
    }).catch(err => {
      console.error('err getMarketCount', err);
    })
  }, [chainId, address, storage, connected]);


  useInterval(updater, 10000, { immediate: true });
}


