import { useState, useEffect, useContext, useRef } from 'react';
import styles from './CardView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { checkNumber, commafy, getSupplyLevel, getSymbolFromTokenAddress } from '../../utils';
import ConfirmActionModal from './ConfirmAction';
import { categorys, categoryIcons } from '../../config';
import { cancelOrder } from '../../wallet/send';
import { WalletContext } from '../../wallet/Wallet';
import { currencyList } from '../../config';


export default function CardView(props) {
  const category = Number(props.attributes[0].value);
  const rare = Number(props.attributes[2].value);
  const level = Number(props.attributes[1].value);
  const isOnSell = props.isOnSell;
  const onSellPrice = props.onSellPrice;
  const onSellToken = props.onSellToken;
  const ret = getSymbolFromTokenAddress(onSellToken, props.chainId);
  const onSellSymbol = ret && ret.symbol;
  const onSellDecimals = ret && ret.decimals;
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  // console.log('isOnSell', isOnSell, onSellPrice, onSellToken, onSellSymbol);

  // console.debug('CardView', props);
  const [currency, setCurrency] = useState('ZOO');
  const [currencyIcon, setCurrencyIcon] = useState('assets/currency/zoo.png');
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState('0.0');

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(0);

  const setTxWaiting = props.setTxWaiting;

  return (
    <React.Fragment >
      <ConfirmActionModal isActived={showConfirmActionModal} setModal={setShowConfirmActionModal}
        icon={props.icon}
        name={props.name}
        amount={amount}
        level={level}
        rare={rare}
        categoryName={categorys[category - 1]}
        categoryIcon={categoryIcons[category - 1]}
        tokenId={props.tokenId}
        itemSupply={props.itemSupply}
        boost={props.boost}
        reduce={props.reduce}
        currency={currency}
        currencyIcon={currencyIcon}
        setTxWaiting={props.setTxWaiting}
        approved={props.approved}
        updateApprove={props.updateApprove}
        setUpdateApprove={props.setUpdateApprove}
      ></ConfirmActionModal>
      <div className={styles.flip_card}>
        <div className={styles.flip_card_inner}>
          <div className={styles.flip_card_front} data-is-max={rare === 5 || level === 4 ? "true" : "false"}> {/* data-is-max="true" if this is max item */}
            <div className={styles.item_title}>
              <img src={props.icon} />
              <div className={styles.title}>
                {props.name}
                <div>
                  {
                    level < 4 && Array.from({ length: level }).map((v, i) => {
                      return <img src="assets/star18x18.png" key={i} />
                    })
                  }
                  {
                    level === 4 && <img src="assets/max.png" />
                  }
                </div>
              </div>
            </div>

            <div className={styles.item_description}>
              <div className={styles.description}>
                <span><img src="assets/rocket24x24.png" /> +{commafy(props.boost * 100, 2)}%</span>
              </div>
              <div className={styles.description}>
                <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -{commafy(props.reduce * 100, 2)}%</span>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.description}>
                <span><img src={categoryIcons[category - 1]} /> {categorys[category - 1]}</span>
              </div>
              <div className={styles.description_supply}>
                <div className={styles.gauge} data-level={getSupplyLevel(props.itemSupply)}> {/*LV 1-5*/ }
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>Total Supply</span>
                {props.itemSupply}
              </div>
            </div>
            {/*On Sale : hide it if not on the market*/}
            {
              isOnSell && <div className={styles.on_sale}>
                <div className={styles.title}>
                  On Sale for
                  </div>
                <div>
                  {onSellPrice && onSellDecimals && commafy(onSellPrice / 10 ** onSellDecimals)} {onSellSymbol}
                </div>
              </div>
            }

            {
              !isOnSell && <a className={styles.sell_btn} >
                <span>SELL</span>
              </a>
            }

          </div>
          <div className={styles.flip_card_back}>
            <div className={styles.title}>
              <img src={props.icon} />
              <div className={styles.title_card_number}>
                <span>{props.name}</span>
                <span className={styles.card_number}>Card #{props.tokenId}</span>
              </div>
            </div>
            <div className={styles.class}>
              {
                rare === 1 && <img src="assets/grade/N.png" />
              }
              {
                rare === 2 && <img src="assets/grade/R.png" />
              }
              {
                rare === 3 && <img src="assets/grade/SR.png" />
              }
              {
                rare === 4 && <img src="assets/grade/SSR.png" />
              }
              {
                rare === 5 && <img src="assets/grade/UR.png" />
              }
            </div>
            <div className={styles.item_description}>
              <div className={styles.description}>
                <div>
                  {
                    level < 4 && Array.from({ length: level }).map((v, i) => {
                      return <img src="assets/star18x18.png" key={i} />
                    })
                  }
                  {
                    level === 4 && <img src="assets/max.png" />
                  }
                </div>
              </div>
              <div className={styles.description}>
                <span><img src="assets/rocket24x24.png" /> +{commafy(props.boost * 100, 2)}%</span>
              </div>
              <div className={styles.description}>
                <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -{commafy(props.reduce * 100, 2)}%</span>
              </div>
            </div>
            {
              isOnSell && <a className={styles.withdraw_btn} onClick={() => {
                setTxWaiting(true);
                cancelOrder(props.tokenId, onSellSymbol, chainId, web3, address).then(ret => {
                  setTxWaiting(false);
                  console.log('createOrder', ret);
                }).catch(err => {
                  setTxWaiting(false);
                });
              }}> {/*Show this one when on sale*/}
                  WITHDRAW FROM SALE
              </a>
            }
            {
              !isOnSell && <div className={styles.sell_action} > {/*Show this when not on sale*/}
                <input type="text" value={amount} onChange={e => {
                  if (checkNumber(e)) {
                    setAmount(e.target.value);
                  }
                }} />
                <div className="dropdown is-active">
                  <a className={styles.select_currency} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}>
                    <img src={currencyIcon} />
                    <span>{currency}</span>
                    <span><FontAwesomeIcon icon={faCaretDown} /></span>
                  </a>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" style={{ display: showDropdown ? '' : 'none' }}>
                      {
                        currencyList.map(v => {
                          return <a class="dropdown-item" key={v.symbol} onClick={() => {
                            setCurrency(v.symbol);
                            setCurrencyIcon(v.icon);
                            setShowDropdown(false);
                          }}>
                            <img src={v.icon} /> {v.symbol}
                          </a>
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              !isOnSell && <a className={styles.sell_btn} style={{ display: isOnSell ? 'none' : 'true' }} onClick={() => { setShowConfirmActionModal(1) }}>
                SELL
              </a>
            }
          </div>
        </div>
      </div>





    </React.Fragment>
  )
}
