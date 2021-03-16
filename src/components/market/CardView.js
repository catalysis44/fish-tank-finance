import { useState, useEffect, useContext, useRef } from 'react';
import styles from './CardView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExternalLinkSquareAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd';




export default function CardView(props) {


  return (
    <React.Fragment >
      <div className={styles.row}>
        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>
            <div className={styles.flip_card_front} data-is-max="true"> {/* data-is-max="true" if this is max item */}
              <div className={styles.item_title}>
                <img src="assets/lemon64x64.png" />
                <div className={styles.title}>
                  Lemon of Bunbury
                                        <div>
                    <img src="assets/max.png" />

                  </div>
                </div>
              </div>
              <div className={styles.total_supply}>
                <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.description}>
                  <span><img src="assets/category/potions.png" /> Potions</span>
                </div>
                <div className={styles.description}>
                  <span>Card #</span>
                                        555,555,555
                                    </div>
                <div className={styles.price}>
                  <img src="assets/currency/zoo.png" />
                  <div>
                    1,535,350
                                            <span>ZOO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.flip_card_back}>
              <div className={styles.title}>
                <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <a className={styles.buy_btn}>
                Buy for 1,535,350 ZOO
                                    </a>
            </div>
          </div>
        </div>
        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>
            <div className={styles.flip_card_front} data-is-max="true"> {/* data-is-max="true" if this is max item */}
              <div className={styles.item_title}>
                <img src="assets/lemon64x64.png" />
                <div className={styles.title}>
                  Lemon of Bunbury
                                        <div>
                    <img src="assets/max.png" />

                  </div>
                </div>
              </div>
              <div className={styles.total_supply}>
                <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.description}>
                  <span><img src="assets/category/potions.png" /> Potions</span>
                </div>
                <div className={styles.description}>
                  <span>Card #</span>
                                        555,555,555
                                    </div>
                <div className={styles.price}>
                  <img src="assets/currency/zoo.png" />
                  <div>
                    1,535,350
                                            <span>ZOO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.flip_card_back}>
              <div className={styles.title}>
                <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <a className={styles.buy_btn}>
                Buy for 1,535,350 ZOO
                                    </a>
            </div>
          </div>
        </div>

        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>
            <div className={styles.flip_card_front}> {/* data-is-max="true" if this is max item */}
              <div className={styles.item_title}>
                <img src="assets/lemon64x64.png" />
                <div className={styles.title}>
                  Lemon of Bunbury
                                        <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
              </div>
              <div className={styles.total_supply}>
                <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.description}>
                  <span><img src="assets/category/dishes.png" /> Dishes</span>
                </div>
                <div className={styles.description}>
                  <span>Card #</span>
                                        555,555,555
                                    </div>
                <div className={styles.price}>
                  <img src="assets/currency/zoo.png" />
                  <div>
                    1,535,350
                                            <span>ZOO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.flip_card_back}>
              <div className={styles.title}>
                <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <a className={styles.buy_btn}>
                Buy for 1,535,350 ZOO
                                    </a>
            </div>
          </div>
        </div>

        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>
            <div className={styles.flip_card_front}> {/* data-is-max="true" if this is max item */}
              <div className={styles.item_title}>
                <img src="assets/lemon64x64.png" />
                <div className={styles.title}>
                  Lemon of Bunbury
                                        <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
              </div>
              <div className={styles.total_supply}>
                <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.description}>
                  <span><img src="assets/category/fruits.png" /> Potions</span>
                </div>
                <div className={styles.description}>
                  <span>Card #</span>
                                        555,555,555
                                    </div>
                <div className={styles.price}>
                  <img src="assets/currency/zoo.png" />
                  <div>
                    1,535,350
                                            <span>ZOO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.flip_card_back}>
              <div className={styles.title}>
                <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <div>
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                    <img src="assets/star18x18.png" />
                  </div>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                </div>
              </div>
              <a className={styles.buy_btn}>
                Buy for 1,535,350 ZOO
                                    </a>
            </div>
          </div>
        </div>




      </div>



    </React.Fragment>
  )
}
