import { useState, useEffect, useContext, useRef } from 'react';
import styles from './ListView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { checkNumber, commafy } from '../../utils';
import {categorys, categoryIcons} from '../../config';

const currencyList = [
  {
    symbol: 'ZOO',
    icon: 'assets/currency/zoo.png',
  },
  {
    symbol: 'WASP',
    icon: 'assets/currency/wasp.png',
  },
  {
    symbol: 'wanUSDT',
    icon: 'assets/currency/wanUSDT.png',
  },
  {
    symbol: 'wanBTC',
    icon: 'assets/currency/wanBTC.png',
  },
  {
    symbol: 'wanETH',
    icon: 'assets/currency/wanETH.png',
  },
  {
    symbol: 'WWAN',
    icon: 'assets/currency/wan.png',
  },
]

function Row(props) {

  const [currency, setCurrency] = useState('ZOO');
  const [currencyIcon, setCurrencyIcon] = useState('assets/currency/zoo.png');
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState('0.0');

  return <div className={styles.listview_row} key={props.tokenId}>
    <div className={`${styles.listview_col} ${styles.star}`}>
      {
        Number(props.attributes[1].value) < 4 && Array.from({ length: Number(props.attributes[1].value) }).map(v => {
          return <img src="assets/star18x18.png" />
        })
      }
      {
        Number(props.attributes[1].value) === 4 && <img src="assets/max.png" />
      }
    </div>
    <div className={`${styles.listview_col} ${styles.title}`}>
      <div className={styles.listview_subcol}>
        <img src="assets/gem/common18x18.png" className={styles.gem} /> <img src={props.icon} /> <div>{props.name}</div>
      </div>
    </div>
    <div className={styles.block_responsive}>

      <div className={`${styles.listview_col} ${styles.stat_action}`}>
        <div className={styles.listview_subcol}>
          <div className={styles.stat}><span><img src="assets/rocket24x24.png" />+{(props.boost * 100).toFixed(2)}%</span></div>
          <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{ width: 20 }} />-{(props.reduce * 100).toFixed(2)}%</span></div>
        </div>
      </div>

      <div className={`${styles.listview_col} ${styles.item_description}`}>
        <div className={styles.listview_subcol}>
          <div className={styles.description}>
            <span><img src={categoryIcons[Number(props.attributes[0].value) - 1]} /> {categorys[Number(props.attributes[0].value) - 1]}</span>
          </div>
          <div className={styles.description}>
            <span>Card #</span>
            {props.tokenId}
          </div>
          <div className={styles.description}>
            <span>Total Supply</span>
            {props.itemSupply}
          </div>
        </div>
      </div>

      {/*In case of On sale*/}
      <div className={`${styles.listview_col} ${styles.onsale_action}`} style={{ display: 'none' }}>
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
            <input type="text" value={amount} onChange={e => {
              if (checkNumber(e)) {
                setAmount(e.target.value);
              }
            }} />
            <div className={"dropdown is-active"}> {/*add class .is-active to open dropdown*/}
              <a className={styles.select_currency} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => {
                setShowDropdown(!showDropdown);
              }}>
                <img src={currencyIcon} />
                <span className={styles.currency_name}>{currency}</span>
                <span><FontAwesomeIcon icon={faCaretDown} /></span>
              </a>
              {
                showDropdown && <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    {
                      currencyList.map(c => {
                        return <a class="dropdown-item" onClick={() => {
                          setShowDropdown(false);
                          setCurrencyIcon(c.icon);
                          setCurrency(c.symbol);
                        }}>
                          <img src={c.icon} /> {c.symbol}
                        </a>
                      })
                    }
                  </div>
                </div>
              }

            </div>


          </div>
          <a className={styles.sell_btn}>
            SELL
          </a>
        </div>
      </div>

    </div>
  </div>
}

export default function ListView(props) {

  const cards = props.cards;
  // console.log('cards', cards);

  return (
    <React.Fragment >
      <div className={styles.listview_panel}>
        <div className={styles.listview_table}>
          {
            cards.map(v=>{
              return <Row  key={v.tokenId} icon={v.image} name={v.name} tokenId={v.tokenId} attributes={v.attributes} boost={v.boost} reduce={v.reduce} itemSupply={v.itemSupply} />
            })
          }

          <div className={styles.listview_row}>
            <div className={`${styles.listview_col} ${styles.star}`}>
              <img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
            </div>
            <div className={`${styles.listview_col} ${styles.title}`}>
              <div className={styles.listview_subcol}>
                <img src="assets/gem/common18x18.png" className={styles.gem} /> <img src="/dummy/booster.png" /> <div>NFT boost full name</div>
              </div>
            </div>

            <div className={styles.block_responsive}>

              <div className={`${styles.listview_col} ${styles.stat_action}`}>
                <div className={styles.listview_subcol}>
                  <div className={styles.stat}><span><img src="assets/rocket24x24.png" />+21.55%</span></div>
                  <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{ width: 20 }} />-55.33%</span></div>
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
              <div className={`${styles.listview_col} ${styles.market_action}`} style={{ display: 'none' }}>
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
