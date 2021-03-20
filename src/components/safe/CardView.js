import { useState, useEffect, useContext, useRef } from 'react';
import styles from './CardView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { commafy } from '../../utils';


export default function CardView(props) {

  const categorys = [
    "Fruits",
    "Foods",
    "Sweets",
    "Potions",
    "Spices",
    "Magic",
  ]

  const categoryIcons = [
    "/assets/category/fruits.png",
    "/assets/category/dishes.png",
    "/assets/category/sweets.png",
    "/assets/category/potions.png",
    "/assets/category/spices.png",
    "/assets/category/magic.png",
  ]

  const category = Number(props.attributes[0].value);
  const rare = Number(props.attributes[2].value);

  console.debug('CardView', props);

  return (
    <React.Fragment >
     
        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>
            <div className={styles.flip_card_front} data-is-max={rare === 5 ? "true":"false"}> {/* data-is-max="true" if this is max item */}
              <div className={styles.item_title}>
                <img src={props.icon} />
                <div className={styles.title}>
                  {props.name}
                  <div>
                    {
                      Array.from({length: Number(props.attributes[1].value)}).map(v=>{
                        return <img src="assets/star18x18.png" />
                      })
                    }
                  </div>
                </div>
              </div>
              {
                rare === 1 && <div className={styles.total_supply}>
                  <img src="assets/gem/common18x18.png" /> Total Supply : 1
                </div>
              }
              {
                rare === 2 && <div className={styles.total_supply}>
                  <img src="assets/gem/epic18x18.png" /> Total Supply : 1
                </div>
              }
              {
                rare === 3 && <div className={styles.total_supply}>
                  <img src="assets/gem/rare18x18.png" /> Total Supply : 1
                </div>
              }
              {
                rare === 4 && <div className={styles.total_supply}>
                  <img src="assets/gem/ultrarare18x18.png" /> Total Supply : 1
                </div>
              }
              {
                rare === 5 && <div className={styles.total_supply}>
                  <img src="assets/gem/ultrarare18x18.png" /> Total Supply : 1
                </div>
              }
              
              <div className={styles.item_description}>
                <div className={styles.description}>
                  <span><img src="assets/rocket24x24.png" /> +{commafy(props.boost*100, 2)}%</span>
                </div>
                <div className={styles.description}>
                  <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -{commafy(props.reduce*100, 2)}%</span>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.description}>
                  <span><img src={categoryIcons[category-1]} /> {categorys[category-1]}</span>
                </div>
                <div className={styles.description}>
                  <span>Card #</span>
                  {props.tokenId}
                  </div>

              </div>
              {/*On Sale : hide it if not on the market*/}
              <div className={styles.on_sale} style={{ display: 'none' }}>
                <div className={styles.title}>
                  On Sale for
                                        </div>
                <div>
                  23,394.55 ZOO
                                        </div>
              </div>
              <a className={styles.sell_btn}>
                <span>SELL</span>
              </a>
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
              <a className={styles.withdraw_btn} style={{ display: 'none' }}> {/*Show this one when on sale*/}
                                        WITHDRAW FROM SALE
                                    </a>
              <div className={styles.sell_action}> {/*Show this when not on sale*/}
                <input type="text" value="0.0" />
                <div className="dropdown is-active">
                  <a className={styles.select_currency} aria-haspopup="true" aria-controls="dropdown-menu">
                    <img src="assets/currency/wanBTC.png" />
                    <span>wanBTC</span>
                    <span><FontAwesomeIcon icon={faCaretDown} /></span>
                  </a>


                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">

                      <a class="dropdown-item">
                        <img src="assets/currency/zoo.png" /> ZOO
                                                </a>

                      <a href="#" class="dropdown-item">
                        <img src="assets/currency/wanBTC.png" /> wanBTC
                                                </a>

                      <a href="#" class="dropdown-item">
                        <img src="assets/currency/wanETH.png" /> wanETH
                                                </a>

                    </div>
                  </div>

                </div>


              </div>
              <a className={styles.sell_btn}>
                SELL
                                    </a>
            </div>
          </div>
        </div>





    </React.Fragment>
  )
}
