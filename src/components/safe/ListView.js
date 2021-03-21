import { useState, useEffect, useContext, useRef } from 'react';
import styles from './ListView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { commafy } from '../../utils';

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

export default function ListView(props) {

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

  //const category = Number(props.attributes[0].value)

  // console.debug('ListView', props);

  const cards = props.cards;

  return (
    <React.Fragment >
      <div className={styles.listview_panel}>
        <div className={styles.listview_table}>
          {
            cards.map(v=>{
              return <div className={styles.listview_row}>
              <div className={`${styles.listview_col} ${styles.star}`}>
                {
                  Number(v.attributes[1].value) < 4 && Array.from({length: Number(v.attributes[1].value)}).map(v=>{
                    return <img src="assets/star18x18.png" />
                  })
                }
                {
                  Number(v.attributes[1].value) === 4 && <img src="assets/max.png" />
                }
              </div>
              <div className={`${styles.listview_col} ${styles.title}`}>
                <div className={styles.listview_subcol}>
                  <img src="assets/gem/common18x18.png" className={styles.gem}/> <img src={v.image}/> <div>{v.name}</div>
                </div>
              </div>
              <div className={styles.block_responsive}>

              <div className={`${styles.listview_col} ${styles.stat_action}`}>
                <div className={styles.listview_subcol}>
                  <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+{(v.boost * 100).toFixed(2)}%</span></div>
                  <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-{(v.reduce * 100).toFixed(2)}%</span></div>
                </div>
              </div>

              <div className={`${styles.listview_col} ${styles.item_description}`}>
                <div className={styles.listview_subcol}>
                  <div className={styles.description}>
                    <span><img src={categoryIcons[Number(v.attributes[0].value)-1]} /> {categorys[Number(v.attributes[0].value)-1]}</span>
                  </div>
                  <div className={styles.description}>
                    <span>Card #</span>
                      {v.tokenId}
                  </div>
                  <div className={styles.description}>
                    <span>Total Supply</span>
                      {v.itemSupply}
                  </div>
                </div>
              </div>

              {/*In case of On sale*/}
              <div className={`${styles.listview_col} ${styles.onsale_action}`} style={{display:'none'}}>
                <div className={styles.listview_subcol}>
                    <div className={styles.onsale_price}>
                      <span>On Sale for</span>
                        5,230,529 wanUSDT
                    </div>
                    <a className={styles.cancel}>
                      Cancel the SALE
                    </a>
                  </div>
              </div>

              {/*In case of On sale*/}
              <div className={`${styles.listview_col} ${styles.market_action}`}>
                  <div className={styles.listview_subcol}>
                  <div className={styles.sell_action}> {/*Show this when not on sale*/}
                    <input type="text" value="0.0" />
                    <div className="dropdown"> {/*add class .is-active to open dropdown*/}
                      <a className={styles.select_currency} aria-haspopup="true" aria-controls="dropdown-menu">
                        <img src="assets/currency/wanBTC.png" />
                        <span className={styles.currency_name}>wanBTC</span>
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
          </div>
            })
          }




          <div className={styles.listview_row}>
              <div className={`${styles.listview_col} ${styles.star}`}>
                <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
              </div>
              <div className={`${styles.listview_col} ${styles.title}`}>
                <div className={styles.listview_subcol}>
                  <img src="assets/gem/common18x18.png" className={styles.gem}/> <img src="/dummy/booster.png"/> <div>NFT boost full name</div>
                </div>
              </div>

              <div className={styles.block_responsive}>

              <div className={`${styles.listview_col} ${styles.stat_action}`}>
                <div className={styles.listview_subcol}>
                  <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+21.55%</span></div>
                  <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-55.33%</span></div>
                </div>
              </div>

              <div className={`${styles.listview_col} ${styles.item_description}`}>
                <div className={styles.listview_subcol}>
                  <div className={styles.description}>
                    <span><img src="assets/category/potions.png" /> Potions</span>
                  </div>
                  <div className={styles.description}>
                    <span>Card #</span>
                      555,555,555
                  </div>
                  <div className={styles.description}>
                    <span>Total Supply</span>
                      555,555,555
                  </div>
                </div>
              </div>

              {/*In case of On sale*/}
              <div className={`${styles.listview_col} ${styles.onsale_action}`}>
                <div className={styles.listview_subcol}>
                    <div className={styles.onsale_price}>
                      <span>On Sale for</span>
                        5,230,529 wanUSDT
                    </div>
                    <a className={styles.cancel}>
                      Cancel the SALE
                    </a>
                  </div>
              </div>

              {/*In case of On sale*/}
              <div className={`${styles.listview_col} ${styles.market_action}`}  style={{display:'none'}}>
                  <div className={styles.listview_subcol}>
                  <div className={styles.sell_action}> {/*Show this when not on sale*/}
                    <input type="text" value="0.0" />
                    <div className="dropdown"> {/*add class .is-active to open dropdown*/}
                      <a className={styles.select_currency} aria-haspopup="true" aria-controls="dropdown-menu">
                        <img src="assets/currency/wanBTC.png" />
                        <span className={styles.currency_name}>wanBTC</span>
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

            
          </div>
        
        </div>
      </div>
    </React.Fragment>
  )
}
