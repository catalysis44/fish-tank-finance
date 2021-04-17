import { useState, useEffect, useContext } from 'react';
import styles from './ConfirmAction.less';
import '../../../node_modules/animate.css/animate.min.css';
import { WalletContext } from '../../wallet/Wallet';
import { checkMarketSellApprove, approveMarket, createOrder } from '../../wallet/send';
import {categorys, categoryIcons} from '../../config';
import { insertHistory } from '../../utils/db';
import { commafy } from '../../utils';
import BigNumber from 'bignumber.js';
import { useLanguage } from '../../hooks/language';

export default function ConfirmAction(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const t = useLanguage();
  const setTxWaiting = props.setTxWaiting;
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;
  const approved = props.approved;
  const setUpdateApprove = props.setUpdateApprove;
  const rare = props.rare;

  return (
    <div id="ConfirmAction" className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 246 }} className="modal-card animate__animated  animate__jackInTheBox animate__fast">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.header}>
            <div className={styles.star}>
              {
                props.level < 4 && Array.from({length: props.level}).map(v=>{
                  return <img src="assets/star18x18.png" />
                })
              }
              {
                props.level === 4 && <img src="assets/max.png" />
              }
            </div>
            <div className={styles.title}>
              {props.name}
            </div>
            <div className={styles.supply}>
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
            <div>{t('Total supply')}: {props.itemSupply}</div>
            </div>
          </div>

          <div className={styles.item_wrapper}>
            <div className={styles.item}>
              <img src={props.icon} className={styles.float_item}/>

            </div>
            <div  className={styles.item_description}>
              <div className={styles.description}>
                <span>{t('Card')} #</span>
                {props.tokenId}
              </div>
              <div className={styles.description}>
                <span><img src={props.categoryIcon}/>{t(props.categoryName)}</span>
              </div>
              <div  className={`${styles.description} ${styles.boost_timereduce}`}>
                <span><img src="assets/rocket24x24.png"/> +{(props.boost * 100).toFixed(2)}%</span>
              </div>
              <div  className={`${styles.description} ${styles.boost_timereduce}`}>
                <span><img src="assets/hourglass24x24.png" style={{height:20}}/> -{(props.reduce * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>
          <div className={styles.rule}>
            <div>{t('BUSINESS IS GROWING')}</div>
            <span>"<b>{props.name}</b>" {t('will be added to the market with a tag price of')}</span>
            <div className={styles.price_wrapper}>
              <img src={props.currencyIcon}/>
              <div className={styles.price_currency}>
                <div className={styles.price}>{props.amount}</div>
                <div className={styles.currency}>{props.currency}</div>
              </div>
            </div>
          </div>

          <div className={styles.action}>
            <a className={styles.action_btn} disabled={approved} onClick={()=>{
              setTxWaiting(true);
              approveMarket(chainId, web3, address).then(ret=>{
                setTxWaiting(false);
                setUpdateApprove(props.updateApprove + 1);
              }).catch(err=>{
                console.error('approveMarket', err);
                setTxWaiting(false);
              });
            }}>
                {t('APPROVE')}
            </a>
            <a className={styles.action_btn}  disabled={!approved} onClick={()=>{
              setTxWaiting(true);
              createOrder(props.tokenId, props.currency, props.amount, chainId, web3, address).then(ret=>{
                console.log('createOrder', ret);
                insertHistory('sale', Date.now(), props.tokenId, props.name, props.icon, props.level, commafy(props.amount), props.currency, ret.transactionHash, 'pending', ret.blockNumber, '0x'+(new BigNumber(ret.events.CreateOrder.returnValues._orderId)).toString(16));
                setTxWaiting(false);
                console.log('createOrder', ret);
                closeModal();
              }).catch(err=>{
                console.error('createOrder', err);
                setTxWaiting(false);
              });
            }}>
                {t('CONFIRM')}
            </a>
          </div>
        </section>
      </div>



    </div>
  )
}
