import { useState, useEffect, useContext, useRef } from 'react';
import styles from './ListView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { commafy } from '../../utils';


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

  return (
    <React.Fragment >
      <div className={styles.listview_panel}>
        <div className={styles.listview_table}>
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

              
              <div className={`${styles.listview_col} ${styles.buy_action}`}>
                <div className={styles.listview_subcol}>
                    <a className={styles.buy_btn}>
                      Buy for 5555,555.55 wanBTC
                    </a>
                  </div>
              </div>

              </div>

            
          </div>
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

              
              <div className={`${styles.listview_col} ${styles.buy_action}`}>
                <div className={styles.listview_subcol}>
                    <a className={styles.buy_btn}>
                      Buy for 5555,555.55 wanBTC
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
