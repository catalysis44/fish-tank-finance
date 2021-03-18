import BigNumber from 'bignumber.js';
import { useInterval, useLockFn, useReactive } from 'ahooks';
import { MULTICALL_ADDRESS, RPC_URL, ZOO_TOKEN_ADDRESS, ZOO_FARMING_ADDRESS, ZOO_BOOSTING_ADDRESS, NFT_FACTORY_ADDRESS, ZOO_NFT_ADDRESS } from '../config';
import React, { useCallback, useMemo } from 'react';
import { getWaspPrice } from './waspPrice';
const { aggregate } = require('@makerdao/multicall');
const DataLoader = require('dataloader');


export const initialState = {
  zooBalance: new BigNumber(300),
  address: '',
  chainId: 999,
  farmingInfo: {
    startBlock: 0,
    allEndBlock: 0,
    zooPerBlock: 0,
    poolLength: 0,
  },
  poolInfo: [],
  goldenPrice: 0,
  zooBurned: 0,
  zooTotalSupply: 0,
  nftBalance: 0,
  nftCards: [],
}

const differ = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return 0;
  } else {
    return 1;
  }
}

export const StorageContext = React.createContext(initialState, differ);

export const useLoader = (chainId) => {
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
        console.debug('calls', newCalls.length, newCalls, conf);
        let ret = await aggregate(newCalls, conf);

        Object.keys(ret.results.transformed).map(v => {
          let str = v.split('#');
          if (!newCalls[str[1]].returnValue) {
            newCalls[str[1]].returnValue = {};
          }
          newCalls[str[1]].returnValue[str[0]] = ret.results.transformed[v];
          newCalls[str[1]].returns = newCalls[str[1]].returns.map(r => {
            let r0 = r[0].split('#')[0];
            return [r0, r[1]];
          })
        });

        console.debug('calls to return', newCalls);
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

export const getZooBalance = (loader, chainId, address) => {
  return loader.load({
    target: ZOO_TOKEN_ADDRESS[chainId],
    call: ['balanceOf(address)(uint256)', address],
    returns: [['zooBalance', val => (new BigNumber(val.toString())).div(1e18)]]
  });
}

export const getZooTotalSupply = (loader, chainId) => {
  return loader.load({
    target: ZOO_TOKEN_ADDRESS[chainId],
    call: ['totalSupply()(uint256)'],
    returns: [['totalSupply', val => (new BigNumber(val.toString())).div(1e18)]]
  });
}

export const getUserNftBalance = (loader, chainId, address) => {
  return loader.load({
    target: ZOO_NFT_ADDRESS[chainId],
    call: ['balanceOf(address)(uint256)', address],
    returns: [['nftBalance', val => Number(val)]]
  });
}

export const getUserNftTokenId = (loader, chainId, address, count) => {
  let calls = Array.from({ length: count }, (v, i) => { return i }).map(i => {
    return {
      target: ZOO_NFT_ADDRESS[chainId],
      call: ['tokenOfOwnerByIndex(address,uint256)(uint256)', address, i],
      returns: [['tokenId', val => val.toString()]]
    }
  });

  return loader.loadMany(calls);
}

export const getNftBaseInfo = (loader, chainId, tokenIds) => {
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

  return loader.loadMany(calls);
}

// export const getZooBurned = (loader, chainId, address) => {
//   return loader.load({
//     target: ZOO_TOKEN_ADDRESS[chainId],
//     call: ['balanceOf(address)(uint256)', '0x'],
//     returns: [['zooBalance', val => (new BigNumber(val.toString())).div(1e18)]]
//   });
// }

export const getZooPools = (loader, chainId, address, poolLength) => {
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
        ['getMultiplier', val => (new BigNumber(val)).div(1e10)], //%
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

  return loader.loadMany(calls);
}

export const getLpInfo = (loader, lpToken, chainId, address) => {
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
    // {
    //   target: lpToken,
    //   call: ['balanceOf(address)(uint256)', ZOO_FARMING_ADDRESS[chainId]],
    //   returns: [['totalDeposited', val => (new BigNumber(val)).div(1e18)]]
    // },
  ]);
}

export const getTokenSymbols = (loader, token0, token1) => {
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
  ]);
}

export const getFarmingInfo = (loader, chainId) => {
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
  ]);
}

export const getNFTFactoryInfo = (loader, chainId) => {
  return loader.loadMany([
    {
      target: NFT_FACTORY_ADDRESS[chainId],
      call: ['queryGoldenPrice()(uint)'],
      returns: [['goldenPrice', val => (new BigNumber(val)).div(1e18)]]
    },
  ]);
}

export const useDataPump = (storage, setStorage, chainId, address, connected) => {
  const loader = useLoader(chainId);

  // getWaspPrice().then(ret=>{
  //   console.debug('wasp price', ret);
  // })

  const updater = () => {
    console.debug('timer ~', JSON.stringify(storage, null, 2));
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
      console.debug('getZooBalance ret', ret, ret.returnValue.zooBalance);

      tmpStorage = Object.assign({ ...tmpStorage, zooBalance: ret.returnValue.zooBalance });
      setStorage(tmpStorage);
    }).catch(err => {
      console.error('err 1', err);
    });

    getZooTotalSupply(loader, chainId).then(ret => {
      console.debug('getZooTotalSupply ret', ret, ret.returnValue.totalSupply);

      tmpStorage = Object.assign({ ...tmpStorage, zooTotalSupply: ret.returnValue.totalSupply })
      setStorage(tmpStorage);
    }).catch(err => {
      console.error('err 1.1', err);
    });

    getUserNftBalance(loader, chainId, address).then(ret => {
      console.debug('getUserNftBalance ret', ret);

      if (ret.returnValue.nftBalance > 0) {
        getUserNftTokenId(loader, chainId, address, ret.returnValue.nftBalance).then(ret => {
          console.debug('getUserNftTokenId ret', ret);
          let tokenIds = ret.map(v => {
            return v.returnValue.tokenId;
          });

          getNftBaseInfo(loader, chainId, tokenIds).then(ret => {
            console.debug('getNftBaseInfo ret', ret);
            let cards = [];
            for (let i = 0; i < tokenIds.length; i++) {
              cards.push({
                tokenId: tokenIds[i],
                uri: ret[i].returnValue.uri,
                boost: ret[i + tokenIds.length].returnValue.boost,
                reduce: ret[i + tokenIds.length * 2].returnValue.reduce,
              });
            }
            console.debug('cards:', cards);
            tmpStorage = Object.assign({ ...tmpStorage, nftCards: cards });
            setStorage(tmpStorage);
          });
        }).catch(err => {
          console.error('err 1.2.1', err);
        });
      }
    }).catch(err => {
      console.error('err 1.2', err);
    });

    getFarmingInfo(loader, chainId).then(ret => {
      console.debug('getFarmingInfo ret', ret);
      let farmingInfo = {};
      ret.forEach(v => {
        farmingInfo[v.returns[0][0]] = v.returnValue[v.returns[0][0]];
      });

      tmpStorage = Object.assign({ ...tmpStorage, farmingInfo })
      setStorage(tmpStorage);
      console.debug('farmingInfo', farmingInfo);

      getZooPools(loader, chainId, address, farmingInfo.poolLength).then(ret => {
        console.debug('getZooPools ret', ret);
        let poolInfo = []
        // TODO: 
        for (let i = 0; i < farmingInfo.poolLength; i++) {
          poolInfo[i] = {
            ...ret[i].returnValue,    // PoolInfo
            ...ret[farmingInfo.poolLength + i].returnValue, // UserInfo
            ...ret[2 * farmingInfo.poolLength + i].returnValue, // PendingZoo
            ...ret[3 * farmingInfo.poolLength + i].returnValue, // PendingWasp
            ...ret[4 * farmingInfo.poolLength + i].returnValue, // Boosting
            ...ret[5 * farmingInfo.poolLength + i].returnValue, // ExpirationTime
          };
        }

        console.debug('poolInfo', poolInfo);

        for (let i = 0; i < farmingInfo.poolLength; i++) {
          getLpInfo(loader, poolInfo[i].lpToken, chainId, address).then(ret => {
            console.debug('getLpInfo', i, ret);
            poolInfo[i].token0 = ret[0].returnValue.token0;
            poolInfo[i].token1 = ret[1].returnValue.token1;
            poolInfo[i].lpBalance = ret[2].returnValue.lpBalance;
            // poolInfo[i].totalDeposited = ret[3].returnValue.totalDeposited;

            getTokenSymbols(loader, poolInfo[i].token0, poolInfo[i].token1).then(ret => {
              console.debug('getTokenSymbols', i, ret);
              poolInfo[i].symbol0 = ret[0].returnValue.symbol0;
              poolInfo[i].symbol1 = ret[1].returnValue.symbol1;

              if (i === farmingInfo.poolLength - 1) {
                tmpStorage = Object.assign({ ...tmpStorage, poolInfo })
                setStorage(tmpStorage);
              }
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

    getNFTFactoryInfo(loader, chainId).then(ret => {
      console.debug('getNFTFactoryInfo ret', ret);
      tmpStorage.goldenPrice = ret[0].returnValue.goldenPrice;
    }).catch(err => {
      console.error('err 30', err);
    });

  };


  useInterval(updater, 10000, { immediate: true });
}


