import styles from './safe.less';
import React, { useState } from 'react';
import CardView from '../components/safe/CardView';
import ListView from '../components/safe/ListView';
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faSortAlphaDown, faSortAmountUp, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { Slider, Checkbox, Row, Col, Pagination } from 'antd';
import { useEffect, useContext } from 'react';
import { StorageContext } from '../hooks';
import { commafy } from '../utils';
import { WalletContext } from '../wallet/Wallet';
import { useLocalStorageState, useRequest } from 'ahooks';
import axios from 'axios';
import { axioGet } from '../utils/cache';

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

  useEffect(() => {
    const func = async ()=>{
      setLoading(true);
      const arr = nftCards.map(v=>{
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

      let objs = rets.map(v=>v.data);
      
      setCards(objs.map((v,i)=>{
        v.tokenId = nftCards[i].tokenId;
        v.boost = nftCards[i].boost;
        v.reduce = nftCards[i].reduce;
        v.itemSupply = nftCards[i].itemSupply;
        return v;
      }))
      setLoading(false);
    }

    func();
  }, [chainId, address, nftCards, nftBalance]);

  // console.debug('new cards', cards);

  return (
    <React.Fragment>
      {
        !connected && <div className={styles.connect_or_undercontruction}>
          <div className={styles.title}>
            My Safe
          </div>
          <img src="assets/safe_connect.png"/>
          <a onClick={()=>{wallet.connect()}}>Connect Wallet</a>
        </div>
      }
      
      <div className={styles.connected} style={{display: !connected && 'none'}}> {/* remove display none after connected */}
      <div id="filterbar_backdrop" onClick={removeToggle}></div>
      <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png" /> FILTER</span></a>
      <a id="toggle_tx" className={styles.toggle_tx} onClick={toggleTx}><span><img src="assets/reload24x24.png" /> HISTORY</span></a>
      <div className={styles.content_wrapper}>
        <div className={styles.left_side}>
          <div id="filter1" className={styles.filter_panel}>
            <div className={styles.title}>
              Filter (0)
                    </div>
            <a className={styles.clear_filter}>Clear Filter</a>

            <div className={styles.filter_by}>
              <a className={styles.is_active}>By Type</a>
              <a>By Name</a>
            </div>
            <div className={styles.filter_ability}>
              <div className={styles.ability_title}>
                <img src="assets/rocket24x24.png" />
                <div>
                  <span>Minimum</span>
                  <span>Boost reward</span>
                </div>
              </div>
              <div className={styles.ability_slider}>
                +12.0%
                            <div className={styles.slider}>
                  <Slider defaultValue={12} min={0} max={50} tooltipVisible={false} />
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
                -5.25%
                            <div className={styles.slider}>
                  <Slider defaultValue={5} min={0} max={20} tooltipVisible={false} />
                </div>
              </div>
            </div>
            <div className={styles.title}>
              Level
                    </div>
            <div className={styles.filter_level}>
              <a className={styles.is_active}><img src="assets/star18x18.png" /></a>
              <a><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /></a>
              <a><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" /></a>
              <a><img src="assets/max.png" /></a>
            </div>
            <div className={styles.title}>
              Rarity
                    </div>
            <div className={styles.filter_rarity}>
              <Checkbox.Group style={{ width: '100%' }} >
                <Row gutter={[5, 10]}>
                  <Col span={12}>
                    <Checkbox value="A"><img src="assets/gem/common18x18.png" /> <span>Common</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="B"><img src="assets/gem/epic18x18.png" /> <span>Epic</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="C"><img src="assets/gem/rare18x18.png" /> <span>Rare</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="D"><img src="assets/gem/ultrarare18x18.png" /> <span>Ultra Rare</span></Checkbox>
                  </Col>

                </Row>
              </Checkbox.Group>
            </div>
            <div className={styles.title}>
              Category
                    </div>
            <div className={styles.filter_category}>
              <Checkbox.Group style={{ width: '100%' }} >
                <Row gutter={[5, 10]}>
                  <Col span={12}>
                    <Checkbox value="A"><img src="assets/category/fruits.png" /> <span>Fruits</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="B"><img src="assets/category/dishes.png" /> <span>Dishes</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="C"><img src="assets/category/sweets.png" /> <span>Sweets</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="D"><img src="assets/category/potions.png" /> <span>Potions</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="E"><img src="assets/category/spices.png" /> <span>Spices</span></Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="F"><img src="assets/category/magic.png" /> <span>Magic</span></Checkbox>
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
              <a className={styles.is_active}>Purchase</a>
              <a>Sale</a>
              <a>From Chest</a>
            </div>

            <div className={styles.table_wrapper}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.name}>#1 ROYAL SWEET BASIL</td>
                    <td className={styles.price}>0.3495 wanETH</td>
                    <td className={styles.explorer}><a href="https://www.wanscan.org" target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                  </tr>
                  <tr>
                    <td className={styles.name}>#1 ROYAL SWEET BASIL</td>
                    <td className={styles.price}>0.3495 wanETH</td>
                    <td className={styles.explorer}><a href="https://www.wanscan.org" target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                  </tr>

                  <tr>
                    <td className={styles.name}>#1 ROYAL SWEET BASIL</td>
                    <td className={styles.price}>0.3495 wanETH</td>
                    <td className={styles.explorer}><a href="https://www.wanscan.org" target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                  </tr>
                  <tr>
                    <td className={styles.name}>#1 ROYAL SWEET BASIL</td>
                    <td className={styles.price}>0.3495 wanETH</td>
                    <td className={styles.explorer}><a href="https://www.wanscan.org" target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                  </tr>
                  <tr>
                    <td className={styles.name}>#1 ROYAL SWEET BASIL</td>
                    <td className={styles.price}>0.3495 wanETH</td>
                    <td className={styles.explorer}><a href="https://www.wanscan.org" target="_blank">TX WanScan  <FontAwesomeIcon icon={faExternalLinkAlt} /></a></td>
                  </tr>

                </tbody>
              </table>
              <div className={styles.table_pagination}>
                <Pagination size="small" total={50} />
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
                  <a className={styles.is_acitve}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortAlphaDown} />
                    </div>
                                        Name
                                    </a>
                  <a>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDown} />
                    </div>
                                Total supply
                                </a>
                  <a>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDown} />
                    </div>
                                Price
                                </a>
                  <a>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDown} />
                    </div>
                                    Boost reward
                                    </a>
                  <a>
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
                  <a className={ !listView && styles.is_acitve } onClick={()=>{
                    setListView(false);
                  }}>Card</a>
                  <a className={ listView && styles.is_acitve} onClick={()=>{
                    setListView(true);
                  }}>List</a>
                </div>
              </div>
            </div>


          </div>
          {
            // loading && <div>Loading...</div>
          }
          <div className={styles.row}>
          {
            !listView && cards.map(v=>{
              return <CardView icon={v.image} name={v.name} tokenId={v.tokenId} attributes={v.attributes} boost={v.boost} reduce={v.reduce} itemSupply={v.itemSupply}/>
            })
          }

          {
            listView && <ListView cards={cards}/>
          }
          
          </div>

        </div>
      </div>

      </div>
    </React.Fragment>
  );
}
