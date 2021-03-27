import styles from './market.less';
import React, { useCallback, useContext, useState } from 'react';
import CardView from '../components/market/CardView';
import ListView from '../components/market/ListView';
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAmountUp, faSortNumericDown, faSortNumericUp, faSortNumericDownAlt } from '@fortawesome/free-solid-svg-icons';
import { Slider, Checkbox, Row, Col } from 'antd';
import { useEffect } from 'react';
import Loader from '../components/loader'
import { useLocalStorageState } from 'ahooks';
import { getSymbolFromTokenAddress } from '../utils';
import { WalletContext } from '../wallet/Wallet';
import { getPrices } from '../hooks/price';


export default function () {
  function toggleFilter() {
    document.getElementById('toggle_filter').classList.toggle("toggled");
    document.getElementById('filter1').classList.toggle("toggled");
    document.getElementById('filter2').classList.toggle("toggled");
    document.getElementById('filterbar_backdrop').classList.toggle("toggled");

  }

  const [txWaiting, setTxWaiting] = useState(false);
  const [listView, setListView] = useLocalStorageState("marketView", false);

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;

  const [sortType, setSortType] = useState('');

  const [filters, setFilters] = useState({});

  const prices = getPrices();

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

    if (sortType === 'price') {
      let priceA = a.price;
      let priceB = b.price;
      let retA = getSymbolFromTokenAddress(a.token, chainId);
      let retB = getSymbolFromTokenAddress(b.token, chainId);
      priceA = priceA / 10 ** retA.decimals;
      priceB = priceB / 10 ** retB.decimals;
      priceA = priceA * prices[retA.symbol];
      priceB = priceB * prices[retB.symbol];
      return priceA - priceB;
    }

    if (sortType === 'boost') {
      return b.boost - a.boost;
    }

    if (sortType === 'reduce') {
      return b.reduce - a.reduce;
    }


  }, [sortType, chainId, prices]);

  const filterFunc = useCallback((v) => {
    return true;
  }, [filters]);


  return (
    <React.Fragment>
      {
        txWaiting && <Loader />
      }
      <div id="filterbar_backdrop" onClick={toggleFilter}></div>
      <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png" /> FILTER</span></a>
      <div className={styles.content_wrapper}>

        <div id="filter1" className={styles.filter_panel}>
          <div className={styles.title}>
            Filter (0)
                    </div>
          <a className={styles.clear_filter}>Clear Filter</a>

          <div className={styles.filter_by} style={{ display: 'none' }}>
            <a className={styles.is_active}>By Type</a>
            <a>By Name</a>
          </div>
          <div className={styles.filter_ability} style={{ marginTop: 15 }}>
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
            Currency
                    </div>
          <div className={styles.filter_currency}>
            <Checkbox.Group style={{ width: '100%' }} >
              <Row gutter={[5, 10]}>
                <Col span={12}>
                  <Checkbox value="A"><img src="assets/currency/zoo.png" /> <span>ZOO</span></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="B"><img src="assets/currency/wanBTC.png" /> <span>wanBTC</span></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="C"><img src="assets/currency/wan.png" /><span> WAN</span></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="D"><img src="assets/currency/wanUSDT.png" /> <span>wanUSDT</span></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="E"><img src="assets/currency/wasp.png" /> <span>WASP</span></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="F"><img src="assets/currency/wanETH.png" /> <span>wanETH</span></Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
          <div className={styles.title}>
            Class
                    </div>
          <div className={styles.filter_class}>
            <Checkbox.Group style={{ width: '100%' }} >
              <Row gutter={[5, 10]}>
                <Col span={12}>
                  <Checkbox value="N"><img src="assets/grade/N.png" /></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="R"><img src="assets/grade/R.png" /></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="SR"><img src="assets/grade/SR.png" /></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="SSR"><img src="assets/grade/SSR.png" /></Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="UR"><img src="assets/grade/UR.png" /></Checkbox>
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
                  <a className={sortType === 'price' && styles.is_acitve} onClick={() => {
                    setSortType(sortType === 'price' ? '' : 'price');
                  }}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDown} />
                    </div>
                      Price
                    </a>
                  <a className={sortType === 'boost' && styles.is_acitve} onClick={() => {
                    setSortType(sortType === 'boost' ? '' : 'boost');
                  }}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDownAlt} />
                    </div>
                      Boost reward
                    </a>
                  <a className={sortType === 'reduce' && styles.is_acitve} onClick={() => {
                    setSortType(sortType === 'reduce' ? '' : 'reduce');
                  }}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faSortNumericDownAlt} />
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
                  <a className={listView ? '' : styles.is_acitve} onClick={() => { setListView(false) }}>Card</a>
                  <a className={listView ? styles.is_acitve : ''} onClick={() => { setListView(true) }}>List</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            {
              !listView && <CardView setTxWaiting={setTxWaiting} sortFunc={sortFunc} filterFunc={filterFunc} />
            }
            {
              listView && <ListView setTxWaiting={setTxWaiting} sortFunc={sortFunc} filterFunc={filterFunc} />
            }

          </div>

        </div>
      </div>


    </React.Fragment>
  );
}
