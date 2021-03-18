import styles from './market.less';
import React from 'react';
import CardView from '../components/market/CardView';
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown,faSortAmountUp,faSortNumericDown,faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { Slider, Checkbox, Row, Col } from 'antd';
import { useEffect } from 'react';
export default function () {
    function toggleFilter()
    {
        document.getElementById('toggle_filter').classList.toggle("toggled");
        document.getElementById('filter1').classList.toggle("toggled");
        document.getElementById('filter2').classList.toggle("toggled");
        document.getElementById('filterbar_backdrop').classList.toggle("toggled");
        
    }
  
    
    return (
        <React.Fragment>
            <div id="filterbar_backdrop"  onClick={toggleFilter}></div>
            <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png"/> FILTER</span></a>
            <div className={styles.content_wrapper}>
                
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
                <div className={styles.main_panel}>
                    <div  className={styles.filter_row}>
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
                                    <a className={styles.is_acitve}>Card</a>
                                    <a>List</a>
                                </div>
                            </div>
                        </div>
                    </div>
                  <div className={styles.row}>
                    <CardView/>
                  </div>

                </div>
            </div>


        </React.Fragment>
    );
}
