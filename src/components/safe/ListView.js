import { useState, useEffect, useContext, useRef } from 'react';
import styles from './ListView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { checkNumber, commafy, getSupplyLevel, getSymbolFromTokenAddress } from '../../utils';
import { categorys, categoryIcons, trade_tokens } from '../../config';
import { WalletContext } from '../../wallet/Wallet';
import ConfirmActionModal from './ConfirmAction';
import { cancelOrder } from '../../wallet/send';
import { currencyList } from '../../config';


function Row(props) {

  const [currency, setCurrency] = useState('ZOO');
  const [currencyIcon, setCurrencyIcon] = useState('assets/currency/zoo.png');
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState();
  const rare = Number(props.attributes[2].value);
  const level = Number(props.attributes[1].value);
  const category = Number(props.attributes[0].value);

  const isOnSell = props.isOnSell;
  const onSellPrice = props.onSellPrice;
  const onSellToken = props.onSellToken;

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  const ret = getSymbolFromTokenAddress(onSellToken, chainId);
  const symbol = ret && ret.symbol;
  const decimals = ret && ret.decimals;

  const setTxWaiting = props.setTxWaiting;

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

        {/* <img src="assets/grade/N.png" className={styles.gem} />  */}
        <div className={styles.content}><img src={props.icon} /> {props.name}</div>
      </div>
    </div>
    <div className={`${styles.listview_col} ${styles.class}`}>
      <div className={styles.listview_subcol}>
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
          <div className={styles.description_supply}>
            <div className={styles.gauge} data-level={getSupplyLevel(props.itemSupply)}> {/*LV 1-5*/}
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
      </div>



      {/*In case of On sale*/}
      {
        isOnSell && <div className={`${styles.listview_col} ${styles.onsale_action}`} >
          <div className={styles.listview_subcol}>
            <div className={styles.onsale_price}>
              <span>On Sale for</span>
              {commafy(onSellPrice / 10 ** decimals)} {symbol}
            </div>
            <a className={styles.cancel} onClick={() => {
              setTxWaiting(true);
              cancelOrder(props.tokenId, symbol, chainId, web3, address).then(ret => {
                setTxWaiting(false);
                console.log('createOrder', ret);
              }).catch(err => {
                console.error('cancelOrder', err);
                setTxWaiting(false);
              });
            }}>
              Cancel the SALE
          </a>
          </div>
        </div>
      }


      {/*In case of On sale*/}

      {
        !isOnSell && <div className={`${styles.listview_col} ${styles.market_action}`}>
          <div className={styles.listview_subcol}>
            <div className={styles.sell_action}> {/*Show this when not on sale*/}
              <input type="text" value={amount} placeholder={'0.0'} onChange={e => {
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
            <a className={styles.sell_btn} onClick={() => {
              let currentOrder = {
                icon: props.icon,
                name: props.name,
                amount: amount,
                level,
                rare,
                token: props.token,
                decimals: trade_tokens[chainId][currency].decimals,
                orderId: props.orderId,
                categoryName: categorys[category - 1],
                categoryIcon: categoryIcons[category - 1],
                tokenId: props.tokenId,
                itemSupply: props.itemSupply,
                boost: props.boost,
                reduce: props.reduce,
                currency: isOnSell ? symbol : currency,
                currencyIcon: currencyIcon,
              };
              console.log('currentOrder', currentOrder);
              props.setCurrentOrder(currentOrder);
              props.setShowConfirmActionModal(1);
            }}>
              SELL
          </a>
          </div>
        </div>
      }


    </div>
  </div>
}

export default function ListView(props) {

  const cards = props.cards;
  // console.log('cards', cards);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState({});
  const setTxWaiting = props.setTxWaiting;
  const sortFunc = props.sortFunc;
  const filterFunc = props.filterFunc;

  return (
    <React.Fragment >
      <ConfirmActionModal isActived={showConfirmActionModal} setModal={setShowConfirmActionModal}
        icon={currentOrder.icon}
        name={currentOrder.name}
        amount={currentOrder.amount}
        level={currentOrder.level}
        rare={currentOrder.rare}
        token={currentOrder.token}
        currency={currentOrder.currency}
        categoryName={currentOrder.categoryName}
        categoryIcon={currentOrder.categoryIcon}
        tokenId={currentOrder.tokenId}
        itemSupply={currentOrder.itemSupply}
        boost={currentOrder.boost}
        reduce={currentOrder.reduce}
        currency={currentOrder.currency}
        currencyIcon={currentOrder.currencyIcon}
        setTxWaiting={props.setTxWaiting}
        approved={props.approved}
        updateApprove={props.updateApprove}
        setUpdateApprove={props.setUpdateApprove}
      ></ConfirmActionModal>

      <div className={styles.listview_panel}>
        <div className={styles.listview_table}>
          {
            cards.filter(filterFunc).sort(sortFunc).map(v => {
              return <Row
                key={v.tokenId}
                icon={v.image}
                name={v.name}
                token={v.token}
                tokenId={v.tokenId}
                attributes={v.attributes}
                boost={v.boost}
                reduce={v.reduce}
                itemSupply={v.itemSupply}
                isOnSell={v.isOnSell}
                onSellPrice={v.onSellPrice}
                onSellToken={v.onSellToken}
                setShowConfirmActionModal={setShowConfirmActionModal}
                setCurrentOrder={setCurrentOrder}
                setTxWaiting={setTxWaiting}
              />
            })
          }

        </div>
      </div>
    </React.Fragment>
  )
}
