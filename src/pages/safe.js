import styles from './safe.less';
import React, { useCallback, useState } from 'react';
import CardView from '../components/safe/CardView';
import ListView from '../components/safe/ListView';
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faSortAlphaDown, faSortAmountUp, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { Slider, Checkbox, Row, Col, Pagination } from 'antd';
import { useEffect, useContext } from 'react';
import { StorageContext } from '../hooks';
import { commafy, getSymbolFromTokenAddress } from '../utils';
import { WalletContext } from '../wallet/Wallet';
import { useLocalStorageState, useRequest } from 'ahooks';
import axios from 'axios';
import { axioGet } from '../utils/cache';
import Loader from '../components/loader'
import { checkMarketSellApprove } from '../wallet/send';
import { getPrices } from '../hooks/price';
import { categorys } from '../config';
import { getHistory } from '../utils/db';


function TxPanel() {
  return
}


export default function () {
  function toggleFilter() {
    // Remove TX //
    document.getElementById('toggle_tx').classList.remove("toggled");
    document.getElementById('tx_panel').classList.remove("toggled");
    //document.getElementById('filterbar_backdrop').classList.remove("toggled");


    document.getElementById('toggle_filter').classList.toggle("toggled");
    document.getElementById('filter1').classList.toggle("toggled");
    document.getElementById('filter2').classList.toggle("toggled");
    document.getElementById('filterbar_backdrop').classList.toggle("toggled");
  }

  function toggleTx() {
    // Remove filter //
    document.getElementById('toggle_filter').classList.remove("toggled");
    document.getElementById('filter1').classList.remove("toggled");
    document.getElementById('filter2').classList.remove("toggled");
    //document.getElementById('filterbar_backdrop').classList.remove("toggled");


    document.getElementById('toggle_tx').classList.toggle("toggled");
    document.getElementById('tx_panel').classList.toggle("toggled");
    document.getElementById('filterbar_backdrop').classList.toggle("toggled");
  }

  function removeToggle() {
    document.getElementById('toggle_filter').classList.remove("toggled");
    document.getElementById('filter1').classList.remove("toggled");
    document.getElementById('filter2').classList.remove("toggled");
    document.getElementById('filterbar_backdrop').classList.remove("toggled");
    document.getElementById('toggle_tx').classList.remove("toggled");
    document.getElementById('tx_panel').classList.remove("toggled");
  }

  const [txWaiting, setTxWaiting] = useState(false);

  const storage = useContext(StorageContext);
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useLocalStorageState("safeView", false);

  const nftCards = storage.nftCards;
  const nftBalance = storage.nftBalance;
  const markets = storage.markets;
  const [updateApprove, setUpdateApprove] = useState(0);
  const [approved, setApproved] = useState(false);

  const prices = getPrices();

  const [sortType, setSortType] = useState('');

  const [filters, setFilters] = useState({});

  const [boostSlider, setBoostSlider] = useState(0);

  const [reduceSlider, setReduceSlider] = useState(0);

  const [txType, setTxType] = useState('purchase');

  const [txPage, setTxPage] = useState(1);

  const txData = getHistory(txType);

  const pageSize = 10;

  const sortFunc = useCallback((a, b) => {
    if (sortType === '') {
      return 0;
    }

    if (sortType === 'name') {
      return a.name > b.name ? 1 : -1;
    }

    if (sortType === 'totalSupply') {
      return a.itemSupply - b.itemSupply;
    }

    // if (sortType === 'price') {
    //   let priceA = a.price;
    //   let priceB = b.price;
    //   let retA = getSymbolFromTokenAddress(a.token, chainId);
    //   let retB = getSymbolFromTokenAddress(b.token, chainId);
    //   priceA = priceA / 10 ** retA.decimals;
    //   priceB = priceB / 10 ** retB.decimals;
    //   priceA = priceA * prices[retA.symbol];
    //   priceB = priceB * prices[retB.symbol];
    //   return priceA - priceB;
    // }

    if (sortType === 'boost') {
      return b.boost - a.boost;
    }

    if (sortType === 'reduce') {
      return b.reduce - a.reduce;
    }


  }, [sortType, chainId, prices]);

  const filterFunc = useCallback((v) => {
    let level = Number(v.attributes[1].value);
    let category = Number(v.attributes[0].value);
    let cateName = categorys[category - 1];
    let item = Number(v.attributes[2].value);
    // let ret = getSymbolFromTokenAddress(v.token, chainId);
    // let symbol = ret.symbol;
    if (filters.level && filters.level !== level) {
      return false;
    }

    // let cs = ['ZOO', 'wanBTC', 'wanETH', 'WASP', 'WWAN', 'wanUSDT'];
    // let found = false;
    // Object.keys(filters).map(v => {
    //   if (cs.includes(v)) {
    //     found = true;
    //   }
    // });

    // if (found) {
    //   if (!filters[symbol]) {
    //     return false;
    //   }
    // }

    let found = false;
    let items = ['N', 'R', 'SR', 'SSR', 'UR'];
    Object.keys(filters).map(v => {
      if (items.includes(v)) {
        found = true;
      }
    });
    if (found) {
      if (!filters[items[item - 1]]) {
        return false;
      }
    }

    found = false;
    Object.keys(filters).map(v => {
      if (categorys.includes(v)) {
        found = true;
      }
    });
    if (found) {
      if (!filters[cateName]) {
        return false;
      }
    }

    if (v.boost * 100 < boostSlider) {
      return false;
    }

    if (v.reduce * 100 < reduceSlider) {
      return false;
    }

    return true;
  }, [filters, chainId, boostSlider, reduceSlider]);

  const onSetFilterLevel = (level) => {
    if (filters.level !== level) {
      setFilters({ ...filters, level });
    } else {
      let tmp = Object.assign({ ...filters });
      delete tmp.level;
      setFilters(tmp);
    }
  }

  const onSetFilterCurrency = (type) => {
    if (!filters[type]) {
      setFilters({ ...filters, [type]: true });
    } else {
      let tmp = Object.assign({ ...filters });
      delete tmp[type];
      setFilters(tmp);
    }
  }

  useEffect(() => {
    if (!chainId || !address || !connected || !web3) {
      return;
    }
    // console.debug('checkApprove begin', updateApprove);
    checkMarketSellApprove(chainId, web3, address).then(ret => {
      // console.debug('checkMarketSellApprove', ret);
      setApproved(ret);
    }).catch(err => {
      console.error('checkApprove err', err);
    });
  }, [chainId, address, connected, web3, updateApprove]);

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const arr = nftCards.map(v => {
        return axioGet(v.uri);
      });

      let rets;
      try {
        rets = await Promise.all(arr);
      } catch (error) {
        console.error('axio error', error);
      }

      if (!rets) {
        return;
      }

      let objs = rets.map(v => v.data);

      objs = objs.map((v, i) => {
        return { ...v, ...nftCards[i] };
      });

      objs = objs.map(v => {
        markets.map(m => {
          if (v.tokenId.toString() === m.tokenId.toString()) {
            v.isOnSell = true;
            v.onSellPrice = m.price;
            v.onSellToken = m.token;
          }
        });

        return v;
      });

      setCards(objs)
      setLoading(false);
    }

    func();
  }, [chainId, address, nftCards, nftBalance, markets]);

  return (
    <React.Fragment>
      {
        txWaiting && <Loader />
      }
      {
        !connected && <div className={styles.connect_or_undercontruction}>
          <div className={styles.title}>
            My Safe
          </div>
          <img src="assets/safe_connect.png" />
          <a onClick={() => { wallet.connect() }}>Connect Wallet</a>
        </div>
      }

      <div className={styles.connected} style={{ display: !connected && 'none' }}> {/* remove display none after connected */}
        <div id="filterbar_backdrop" onClick={removeToggle}></div>
        <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png" /> FILTER</span></a>
        <a id="toggle_tx" className={styles.toggle_tx} onClick={toggleTx}><span><img src="assets/reload24x24.png" /> HISTORY</span></a>
        <div className={styles.content_wrapper}>
          <div className={styles.left_side}>
            <div id="filter1" className={styles.filter_panel}>
              <div className={styles.title}>
                Filter ({Object.keys(filters).length})
              </div>
              <a className={styles.clear_filter} onClick={() => {
                setFilters({});
                setBoostSlider(0);
                setReduceSlider(0);
              }}>Clear Filter</a>
              <div className={styles.filter_ability} style={{ marginTop: 15 }}>
                <div className={styles.ability_title}>
                  <img src="assets/rocket24x24.png" />
                  <div>
                    <span>Minimum</span>
                    <span>Boost reward</span>
                  </div>
                </div>
                <div className={styles.ability_slider}>
                  +{boostSlider}%
                <div className={styles.slider}>
                    <Slider value={boostSlider} min={0} max={70} tooltipVisible={false} onChange={e => setBoostSlider(e)} />
                  </div>
                </div>

              </div>
              <div className={styles.filter_ability}>
                <div className={styles.ability_title}>
                  <img src="assets/hourglass24x24.png" />
                  <div>
                    <span>Minimum</span>
                    <span>Locktime reducer</span>
                  </div>
                </div>
                <div className={styles.ability_slider}>
                  -{reduceSlider}%
                  <div className={styles.slider}>
                    <Slider value={reduceSlider} min={0} max={20} tooltipVisible={false} onChange={e => setReduceSlider(e)} />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                Level
              </div>
              <div className={styles.filter_level}>
                <a className={filters.level === 1 && styles.is_active} onClick={() => { onSetFilterLevel(1) }}><img src="assets/star18x18.png" /></a>
                <a className={filters.level === 2 && styles.is_active} onClick={() => { onSetFilterLevel(2) }}><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /></a>
                <a className={filters.level === 3 && styles.is_active} onClick={() => { onSetFilterLevel(3) }}><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /></a>
                <a className={filters.level === 4 && styles.is_active} onClick={() => { onSetFilterLevel(4) }}><img src="assets/max.png" /></a>
              </div>
              <div className={styles.title}>
                Class
              </div>
              <div className={styles.filter_class}>
                <Checkbox.Group style={{ width: '100%' }} value={Object.keys(filters)}>
                  <Row gutter={[5, 10]}>
                    <Col span={12}>
                      <Checkbox value="N" onClick={() => { onSetFilterCurrency('N') }}><img src="assets/grade/N.png" /></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="R" onClick={() => { onSetFilterCurrency('R') }}><img src="assets/grade/R.png" /></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="SR" onClick={() => { onSetFilterCurrency('SR') }}><img src="assets/grade/SR.png" /></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="SSR" onClick={() => { onSetFilterCurrency('SSR') }}><img src="assets/grade/SSR.png" /></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="UR" onClick={() => { onSetFilterCurrency('UR') }}><img src="assets/grade/UR.png" /></Checkbox>
                    </Col>

                  </Row>
                </Checkbox.Group>
              </div>
              <div className={styles.title}>
                Category
                    </div>
              <div className={styles.filter_category}>
                <Checkbox.Group style={{ width: '100%' }} value={Object.keys(filters)} >
                  <Row gutter={[5, 10]}>
                    <Col span={12}>
                      <Checkbox value="Fruits" onClick={() => { onSetFilterCurrency('Fruits') }}><img src="assets/category/fruits.png" /> <span>Fruits</span></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Foods" onClick={() => { onSetFilterCurrency('Foods') }}><img src="assets/category/dishes.png" /> <span>Foods</span></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Sweets" onClick={() => { onSetFilterCurrency('Sweets') }}><img src="assets/category/sweets.png" /> <span>Sweets</span></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Potions" onClick={() => { onSetFilterCurrency('Potions') }}><img src="assets/category/potions.png" /> <span>Potions</span></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Spices" onClick={() => { onSetFilterCurrency('Spices') }}><img src="assets/category/spices.png" /> <span>Spices</span></Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Magic" onClick={() => { onSetFilterCurrency('Magic') }}><img src="assets/category/magic.png" /> <span>Magic</span></Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </div>


            <div id="tx_panel" className={styles.tx_panel}>
              <div className={styles.title}>
                TX history
               </div>
              <div className={styles.history_btn}>
                <a className={txType === 'purchase' && styles.is_active} onClick={() => {
                  setTxType('purchase');
                }}>Purchase</a>
                <a className={txType === 'sale' && styles.is_active} onClick={() => {
                  setTxType('sale');
                }}>Sale</a>
                <a className={txType === 'chest' && styles.is_active} onClick={() => {
                  setTxType('chest');
                }}>From Chest</a>
              </div>

              <div className={styles.table_wrapper}>
                <table>
                  <tbody>
                    {
                      txData && txData.slice((txPage-1) * pageSize, (txPage) * pageSize).map(v => {
                        return <tr key={v.time}>
                          <td className={styles.name}>#{v.tokenId} {v.name}</td>
                          <td className={styles.price}>{v.price} {v.symbol}</td>
                          <td className={styles.explorer}><a href={"https://" + (Number(chainId) === 888 ? "www" : "testnet") + ".wanscan.org/tx/" + v.txHash} target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                <div className={styles.table_pagination}>
                  <Pagination size="small" current={txPage} total={txData ? txData.length : 0} pageSize={pageSize} onChange={e => {
                    setTxPage(e);
                  }} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main_panel}>
            <div className={styles.filter_row}>
              <div id="filter2" className={styles.box}>
                <div className={styles.sorting}>
                  <div className={styles.title}>
                    Sort by
                                </div>
                  <div className={styles.sort_btn}>
                    <a className={sortType === 'name' && styles.is_acitve} onClick={() => {
                      setSortType(sortType === 'name' ? '' : 'name');
                    }}>
                      <div className={styles.icon}>
                        <FontAwesomeIcon icon={faSortAlphaDown} />
                      </div>
                      Name
                      </a>
                    <a className={sortType === 'totalSupply' && styles.is_acitve} onClick={() => {
                      setSortType(sortType === 'totalSupply' ? '' : 'totalSupply');
                    }}>
                      <div className={styles.icon}>
                        <FontAwesomeIcon icon={faSortNumericDown} />
                      </div>
                      Total supply
                      </a>
                    <a className={sortType === 'boost' && styles.is_acitve} onClick={() => {
                      setSortType(sortType === 'boost' ? '' : 'boost');
                    }}>
                      <div className={styles.icon}>
                        <FontAwesomeIcon icon={faSortNumericDown} />
                      </div>
                        Boost reward
                      </a>
                    <a className={sortType === 'reduce' && styles.is_acitve} onClick={() => {
                      setSortType(sortType === 'reduce' ? '' : 'reduce');
                    }}>
                      <div className={styles.icon}>
                        <FontAwesomeIcon icon={faSortNumericDown} />
                      </div>
                      Time reducer
                    </a>
                  </div>
                </div>
                <div className={styles.view_selection}>
                  <div className={styles.title}>
                    View
                                </div>
                  <div className={styles.view_btn}>
                    <a className={!listView && styles.is_acitve} onClick={() => {
                      setListView(false);
                    }}>Card</a>
                    <a className={listView && styles.is_acitve} onClick={() => {
                      setListView(true);
                    }}>List</a>
                  </div>
                </div>
              </div>


            </div>
            <div className={styles.total_items}>
              Total Items: {commafy(cards.length, null, false)}
            </div>
            {
              // loading && <div>Loading...</div>
            }
            <div className={styles.row}>
              {
                !listView && cards.filter(filterFunc).sort(sortFunc).map(v => {
                  return <CardView key={v.tokenId}
                    icon={v.image} name={v.name} tokenId={v.tokenId}
                    attributes={v.attributes} boost={v.boost} reduce={v.reduce}
                    setTxWaiting={setTxWaiting}
                    approved={approved}
                    updateApprove={updateApprove}
                    setUpdateApprove={setUpdateApprove}
                    chainId={chainId}
                    isOnSell={v.isOnSell}
                    onSellPrice={v.onSellPrice}
                    onSellToken={v.onSellToken}
                    itemSupply={v.itemSupply} />
                })
              }

              {
                listView && <ListView cards={cards}
                  setTxWaiting={setTxWaiting}
                  approved={approved}
                  updateApprove={updateApprove}
                  setUpdateApprove={setUpdateApprove}
                  filterFunc={filterFunc}
                  sortFunc={sortFunc}
                />
              }

            </div>

          </div>
        </div>

      </div>
    </React.Fragment>
  );
}
