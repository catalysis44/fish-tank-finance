import styles from './insight.less';
import React, { useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Tooltip, Progress } from 'antd';
import { StorageContext } from '../hooks';
import { commafy } from '../utils';
import { getPrices } from '../hooks/price';
import BigNumber from 'bignumber.js';
import { useLanguage } from '../hooks/language';
import axios from 'axios';
import { WalletContext } from '../wallet/Wallet';
import { history } from 'umi';
import { invalidNFT } from '../config';



function getTimeStr(time,t) {
  
  if (parseInt(time / (3600 * 24)) === 1) {
    return t('{0} day ago...',[parseInt(time / (3600 * 24))]);
  }

  if (parseInt(time / (3600 * 24)) >= 2) {
    return t('{0} days ago...',[parseInt(time / (3600 * 24))]);
  }

  if (parseInt(time / (3600)) === 1) {
    return t('{0} hour ago...',[parseInt(time / (3600))]);
  }

  if (parseInt(time / (3600)) >= 2) {
    return t('{0} hours ago...',[parseInt(time / (3600))]);
  }

  if (parseInt(time / (60)) === 1) {
    return t('{0} minute ago...',[parseInt(time / (60))]);
  }

  if (parseInt(time / (60)) >= 2) {
    return t('{0} minutes ago...',[parseInt(time / (60))]);
  }

  return t('Just now...');
}

export default function (props) {
  const t = useLanguage();
  const storage = useContext(StorageContext);
  const prices = getPrices();
  const expeditions = storage.expeditions;
  const zooPrice = prices['ZOO'];
  const blockNumber = storage.blockNumber;
  const endBlockNumber = 14174838 + 3600 / 5 * 24 * 365 * 2;
  const startBlockNumber = 14174838;
  let leftDays = endBlockNumber > blockNumber ? (endBlockNumber - blockNumber) * 5 / 3600 / 24 : 0;
  let startDays = (blockNumber - startBlockNumber) * 5 / 3600 / 24;

  // category->item->level
  const initNftList = {
    1: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    2: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    3: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    4: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    5: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
    6: {
      1: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      2: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      3: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      4: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
      5: {
        1: {},
        2: {},
        3: {},
        4: {},
      },
    },
  }

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;

  const expTvl = useMemo(() => {
    if (!zooPrice || !expeditions || expeditions.length === 0) {
      return new BigNumber(0);
    }
    let expeditionAmount = expeditions[0].stakedAmount.plus(expeditions[1].stakedAmount).plus(expeditions[2].stakedAmount);
    return expeditionAmount.multipliedBy(zooPrice);
  }, [zooPrice, expeditions]);

  const zooTvl = window.tvl && window.tvl.length > 0 ? window.tvl.reduce((pre, v, i) => {
    return Number(pre) + Number(v);
  }) : 0;

  useEffect(() => {
    if (Number(expTvl) > 0 && Number(zooTvl) > 0 && Number(zooPrice) > 0 && Number(chainId) !== 999) {
      axios.get('https://rpc.zookeeper.finance/api/v1/setTvl?tvl=' + (Number(expTvl) + Number(zooTvl))).then(ret => {
        // console.debug(ret);
      }).catch(console.error);
      window.insightLoading = false;
    } else {
      window.insightLoading = true;
      history.push('/');
    }
  }, [expTvl, zooTvl, zooPrice, chainId])

  const [golden, setGolden] = useState([]);
  const [silver, setSilver] = useState([]);
  const [silverRate, setSilverRate] = useState(0);
  const [lastTx, setLastTx] = useState([]);

  useEffect(() => {
    axios.get('https://rpc.zookeeper.finance/api/v1/chest').then(ret => {
      let allChest = ret.data;
      let silver = ret.data.filter(v => {
        return v.type === 'SilverBuy';
      });

      let golden = ret.data.filter(v => {
        return v.type !== 'SilverBuy';
      })

      setSilver(silver);
      setGolden(golden);

      let silver24h = silver.filter(v => {
        return (Date.now() - (new Date(v.time))) / 3600000 < 24
      })
      let silverGood = silver24h.filter(v => {
        return v.level > 0;
      });

      setSilverRate(silverGood.length * 100 / silver24h.length);

      axios.get('https://rpc.zookeeper.finance/api/v1/market').then(ret => {
        let allMarket = ret.data;
        let allTx = allChest.concat(allMarket);

        allTx.sort((a, b) => {
          if ((new Date(a.time)) > (new Date(b.time))) {
            return 1;
          }
          return -1;
        });
        setLastTx(allTx.slice(-30).reverse());
      }).catch(console.error);

    }).catch(console.error);
  }, []);

  const [priceChange24h, setPriceChange24h] = useState();
  const [priceChangeWeek, setPriceChangeWeek] = useState();

  useEffect(() => {
    axios.get('https://rpc.zookeeper.finance/api/v1/goldenPrice').then(ret => {
      let priceArray = ret.data;
      let p24s = priceArray.length > 24 ? priceArray.slice(-24) : priceArray;
      setPriceChange24h((p24s[p24s.length - 1].price - p24s[0].price) * 100 / p24s[0].price);
      let pWeeks = priceArray.length > 24 * 7 ? priceArray.slice(-24 * 7) : priceArray;
      setPriceChangeWeek((pWeeks[pWeeks.length - 1].price - pWeeks[0].price) * 100 / pWeeks[0].price);
    }).catch(console.error);
  }, []);

  const [totalNft, setTotalNft] = useState();
  const [totalHolder, setTotalHolder] = useState();
  const [averageBoost, setAverageBoost] = useState();
  const [averageReduce, setAverageReduce] = useState();
  const [lockedNftValue, setLockedNftValue] = useState();
  useEffect(() => {
    axios.get('https://rpc.zookeeper.finance/api/v1/nftInfo').then(ret => {
      let info = ret.data;
      setTotalNft(info.totalNFT - invalidNFT.length);
      setTotalHolder(info.totalHolder);
      setAverageBoost(info.averageBoosting);
      setAverageReduce(info.averageReduce);
      let nftLocked = 0;
      for (let i=0; i<info.lockedNft.length; i++) {
        nftLocked += info.lockedNft[i].price * prices[info.lockedNft[i].symbol];
      }
      setLockedNftValue(nftLocked);
    }).catch(console.error);
  }, [prices]);

  const [nftList, setNftList] = useState(initNftList);
  const [nftTab, setNftTab] = useState(1);

  useEffect(() => {
    axios.get('https://rpc.zookeeper.finance/api/v1/nft').then(ret => {
      let list = ret.data;
      let newNftList = initNftList;
      list = list.filter(v => {
        if (invalidNFT.includes(Number(v.tokenId))) {
          if (!newNftList[v.category][v.item][v.level].bannedSupply) {
            newNftList[v.category][v.item][v.level].bannedSupply = 0;
          }

          newNftList[v.category][v.item][v.level].bannedSupply++;
          return false;
        }
        return true;
      });

      list.map(v => {
        let bannedSupply = newNftList[v.category][v.item][v.level].bannedSupply;
        newNftList[v.category][v.item][v.level] = v;
        newNftList[v.category][v.item][v.level].bannedSupply = bannedSupply;
      })

      setNftList(newNftList);
    }).catch(console.error);
  }, []);


  return (
    <React.Fragment>
      <div className={styles.row}>
        <div className={styles.panel_full} style={{ marginBottom: 30, padding: '10px 20px', marginTop: 0 }}>
          <div className={styles.price_mc_wrapper}>
            <div className={styles.price_wrapper}>
              <img src="assets/zoo_panel.png" />
              <div className={styles.details}>
                <div className={styles.title}>
                  {t("ZOO Price")}
                </div>
                <div className={styles.amount}>
                  ${commafy(zooPrice)}
                </div>
                <div className={styles.title}>
                  {t("Circulating supply")}: <span>{commafy(storage.zooTotalSupply).split('.')[0]} ZOO</span>
                </div>
              </div>
            </div>
            <div className={styles.mc_wrapper}>
              <img src="assets/MC.png" />
              <div className={styles.details}>
                <div className={styles.title}>
                  {t("Market Cap")}
                </div>
                <div className={styles.amount}>
                  ${commafy(storage && storage.zooTotalSupply * zooPrice).split('.')[0]}
                </div>
                <div className={styles.title}>
                  {t("Fully Diluted MC")}: <span>${commafy(storage.zooTotalSupply / startDays * 365 * 2 * zooPrice).split('.')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.panel}>
          <div className={styles.tvl_header}>
            <img src="assets/tvl.png" />
            <div className={styles.tvl_value}>
              ${commafy(Number(zooTvl) + Number(expTvl) + Number(lockedNftValue)).split('.')[0]}
              <div>{t('Total value locked')}</div>
            </div>
          </div>
          <table className={styles.tvl_table}>
            <tr>
              <td>{t('The Zoo')}</td>
              <td>${commafy(zooTvl).split('.')[0]}</td>
            </tr>
            <tr>
              <td>{t('The Expedition')}</td>
              <td>${commafy(expTvl).split('.')[0]}</td>
            </tr>
            {/* <tr>
              <td>The Safari</td>
              <td>${commafy()}</td>
            </tr>
            <tr>
              <td>The ZooRena</td>
              <td>${commafy()}</td>
            </tr> */}
            <tr>
              <td>{t('Locked NFTs Value')}</td>
              <td>${commafy(lockedNftValue).split('.')[0]}</td>
            </tr>
          </table>
        </div>
        <div className={`${styles.panel} ${styles.zoo_stat}`}>
          <div>
            <div className={styles.title} >
              {t('Zoo Distribution Ends In')}
            </div>
            <Progress status="active" percent={((365 * 2 - leftDays) * 100 / (365 * 2))} format={percent => `${leftDays.toFixed(0)} ` + t('Days')} />
          </div>

          <div>
            <div className={styles.title}>
              {t('Zoo Burning Rate')}
            </div>
            <div id="burning_bar">
              <Progress percent={(storage.zooBurned * 100 / (Number(storage.zooTotalSupply) + Number(storage.zooBurned))).toFixed(1)} />
            </div>
          </div>

          <div>
            <div className={styles.title}>
              {t('Estimated Zoo Supply')}
            </div>

            <div className={styles.estimated_supply}>
              {commafy(storage.zooTotalSupply / startDays * 365 * 2).split('.')[0]} <span>~{commafy(storage.zooTotalSupply / startDays / 1000).split('.')[0]}K {t('per day')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.panel}>
          <div className={styles.chest_opened}>
            <img src="assets/goldenbox42x42.png" />
            <div className={styles.chest_opened_value}>
              {golden.length}
              <div>{t('Gold Chests opened')}</div>
            </div>
          </div>
          <div className={styles.chest_opened}>
            <img src="assets/silverbox42x42.png" />
            <div className={styles.chest_opened_value}>
              {silver.length}
              <div>{t('Silver Chests opened')}</div>
            </div>
            <div className={styles.silver_daily}>
              {commafy(silverRate).split('.')[0]}%
            <div>{t('24 hr Rate')}</div>
            </div>
          </div>
          <div className={styles.price_title}>
            {t('Gold Chest Price')}
          </div>
          <div className={styles.chest_price_wrapper}>
            <div className={styles.chest_price}>
              {priceChange24h && (priceChange24h > 0 ? ('+' + priceChange24h.toFixed(1)) : priceChange24h.toFixed(1))}%
            <div>{t('24 hrs')}</div>
            </div>
            <div className={styles.chest_price}>
              {priceChangeWeek && (priceChangeWeek > 0 ? ('+' + priceChangeWeek.toFixed(1)) : priceChangeWeek.toFixed(1))}%
            <div>{t('1 Week')}</div>
            </div>

          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.booster}>
            <img src="assets/rocket.png" />
            <div className={styles.booster_value}>
              +{averageBoost && (averageBoost * 100).toFixed(1)}%
              <div>{t('Average Boosting Attached')}</div>
            </div>
          </div>
          <div className={styles.booster}>
            <img src="assets/glasshour.png" />
            <div className={styles.booster_value}>
              -{averageReduce && (averageReduce * 100).toFixed(1)}%
              <div>{t('Average Time Reducing Attached')}</div>
            </div>
          </div>
          <div className={styles.booster_sub_wrapper}>
            <div className={styles.booster_sub}>
              {t('Total Booster')}
              <div>{totalNft}</div>
            </div>
            <div className={styles.booster_sub}>
              {t('Booster Holders')}
              <div>{totalHolder}</div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.panel_full}>
          <div className={styles.item_category_tab}>
            <a className={`${styles.category} ${nftTab === 1 ? styles.is_active : ''}`} onClick={() => setNftTab(1)}>
              <img src="assets/category/fruits.png" />
              <span>{t('Fruits')}</span>
            </a>
            <a className={`${styles.category} ${nftTab === 2 ? styles.is_active : ''}`} onClick={() => setNftTab(2)}>
              <img src="assets/category/dishes.png" />
              <span>{t('Foods')}</span>
            </a>
            <a className={`${styles.category} ${nftTab === 3 ? styles.is_active : ''}`} onClick={() => setNftTab(3)}>
              <img src="assets/category/sweets.png" />
              <span>{t('Sweets')}</span>
            </a>
            <a className={`${styles.category} ${nftTab === 4 ? styles.is_active : ''}`} onClick={() => setNftTab(4)}>
              <img src="assets/category/potions.png" />
              <span>{t('Potions')}</span>
            </a>
            <a className={`${styles.category} ${nftTab === 5 ? styles.is_active : ''}`} onClick={() => setNftTab(5)}>
              <img src="assets/category/spices.png" />
              <span>{t('Spices')}</span>
            </a>
            <a className={`${styles.category} ${nftTab === 6 ? styles.is_active : ''}`} onClick={() => setNftTab(6)}>
              <img src="assets/category/magic.png" />
              <span>{t('Magic')}</span>
            </a>
          </div>

          {/* Each Class of Item*/}
          <div className={styles.item_list_wrapper}>
            {
              Object.keys(nftList[nftTab]).map(item => {
                return (
                  <div className={styles.item_list} key={item}>
                    <div className={styles.grade}>
                      {
                        Number(item) === 1 && <><img src="assets/grade/N.png" /> NORMAL CLASS</>
                      }
                      {
                        Number(item) === 2 && <><img src="assets/grade/R.png" /> RARE CLASS</>
                      }
                      {
                        Number(item) === 3 && <><img src="assets/grade/SR.png" /> SUPER RARE CLASS</>
                      }
                      {
                        Number(item) === 4 && <><img src="assets/grade/SSR.png" /> SUPER SUPER RARE CLASS</>
                      }
                      {
                        Number(item) === 5 && <><img src="assets/grade/UR.png" /> ULTRA RARE CLASS</>
                      }

                    </div>
                    <div className={styles.listview_table}>
                      <div className={styles.listview_row}>
                        <div className={`${styles.listview_col} ${styles.header}`}>
                        </div>
                        <div className={`${styles.listview_col} ${styles.header}`}>
                          {t('BOOSTER NAME')}
                        </div>
                        <div className={`${styles.listview_col} ${styles.header} ${styles.centered}`}>
                          {t('LEVEL')}
                        </div>
                        <div className={`${styles.listview_col} ${styles.header} ${styles.centered}`} >
                          {t('SUPPLY')}
                        </div>
                        <div className={`${styles.listview_col} ${styles.header} ${styles.centered}`}>
                          {t('INIT. ABILITIES')}
                        </div>
                        <div className={`${styles.listview_col} ${styles.header}  ${styles.centered}`}>
                          {t('LATEST SALE')}
                        </div>
                      </div>
                      {
                        Object.keys(nftList[nftTab][item]).map(level => {
                          return <div className={styles.listview_row} key={level}>
                            <div className={`${styles.listview_col} ${styles.item_image}`}>
                              {
                                nftList[nftTab][item][level].image ? <img src={nftList[nftTab][item][level].image} /> : <img src="assets/locked.png" />
                              }
                            </div>
                            <div className={`${styles.listview_col} ${styles.item_name}`}>
                              {
                                nftList[nftTab][item][level].name ? nftList[nftTab][item][level].name : t('None Unlocked (yet)')
                              }
                            </div>
                            <div className={`${styles.listview_col} ${styles.item_stars}`}>
                              {
                                Number(level) < 4 ? Array.from({ length: level }).map((v, i) => {
                                  return <img src="assets/star18x18.png" key={i} />
                                }) : <img src="assets/max.png" />
                              }
                            </div>
                            <div className={`${styles.listview_col} ${styles.item_supply}`}>
                              {
                                nftList[nftTab][item][level].itemSupply ? (nftList[nftTab][item][level].bannedSupply ? (nftList[nftTab][item][level].itemSupply - nftList[nftTab][item][level].bannedSupply) : nftList[nftTab][item][level].itemSupply) : '--'
                              }
                            </div>
                            <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                              <div><img src="assets/rocket24x24.png" />
                        +{
                                  nftList[nftTab][item][level].boosting ? (nftList[nftTab][item][level].boosting / 1e10 - 100).toFixed(1) : '--'
                                }%
                        </div>
                              <div><img src="assets/hourglass24x24.png" />
                        -{
                                  nftList[nftTab][item][level].reduce ? (100 - nftList[nftTab][item][level].reduce / 1e10).toFixed(1) : '--'
                                }%
                        </div>
                            </div>
                            <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                              {
                                nftList[nftTab][item][level].price ? (commafy(nftList[nftTab][item][level].price) + ' ' + nftList[nftTab][item][level].symbol) : '--'
                              }
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      {/*LOG*/}
      <div className={styles.row} style={{ marginTop: -40 }}>
        <div className={styles.panel_full}>
          <div className={styles.log_title}>
            <img src="assets/sidebar/insight.png" /> <span>{t("LATEST 30 NFT TRANSACTIONS")}</span>
          </div>
          <div className={styles.item_list_wrapper}>
            <div className={styles.item_list}>
              <div className={styles.listview_table}>
                {
                  lastTx.map(v => {
                    let time = (Date.now() - (new Date(v.time))) / 1000;
                    let timeStr = getTimeStr(time,t);
                   
                    return <div className={styles.listview_row}>
                      <div className={`${styles.listview_col} ${styles.log_icon}`}>
                        {
                          v.type === 'GoldenBuy' && <img src="assets/goldenbox42x42.png" />
                        }
                        {
                          v.type === 'ZooClaim' && <img src="assets/goldenbox42x42.png" />
                        }
                        {
                          v.type === 'SilverBuy' && <img src="assets/silverbox42x42.png" />
                        }
                        {
                          !v.type && <img src="assets/sidebar/market.png" />
                        }
                      </div>
                      <div className={`${styles.listview_col} ${styles.log_message}`}>
                        <div>{timeStr}</div>
                        {
                          v.type === 'SilverBuy' && t('Silver Chest opened and received ')
                        }
                        {
                          v.type === 'SilverBuy' && <span>{Number(v.level) === 0 ? t('Nothing...') : nftList[v.category][v.item][v.level].name}</span>
                        }

                        {
                          (v.type === 'GoldenBuy' || v.type === 'ZooClaim') && t('Gold Chest opened and received ')
                        }
                        {
                          (v.type === 'GoldenBuy' || v.type === 'ZooClaim') && <span>{nftList[v.category][v.item][v.level].name}</span>
                        }

                        {
                          !v.type && <>{t('Purchased')} <span>{nftList[v.category][v.item][v.level].name}</span> {t('for')} <span>{Number(v.price.toFixed(8)) + ' ' + v.symbol}</span></>
                        }
                      </div>
                    </div>
                  })
                }
                {
                  lastTx.length === 0 && 'Loading...'
                }

              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}
