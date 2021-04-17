import { useState, useEffect, useContext } from 'react';
import styles from './ConfirmAction.less';
import '../../../node_modules/animate.css/animate.min.css';
import { WalletContext } from '../../wallet/Wallet';
import { checkMarketSellApprove, approveMarket, createOrder, checkMarketBuyApprove, approveForMarketBuy, buyOrder } from '../../wallet/send';
import {categorys, categoryIcons} from '../../config';
import { commafy } from '../../utils';
import BigNumber from 'bignumber.js';
import { insertHistory } from '../../utils/db';
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
  const [updateApprove, setUpdateApprove] = useState(0);
  const [approved, setApproved] = useState(false);
  const rare = props.rare;
  const token = props.token;
  const amount = props.amount;
  const decimals = props.decimals;

  useEffect(() => {
    if (!chainId || !address || !connected || !web3) {
      return;
    }
    // console.debug('checkApprove begin', updateApprove);
    checkMarketBuyApprove(token, (new BigNumber(amount)).multipliedBy(10**decimals), chainId, web3, address).then(ret => {
      // console.debug('checkMarketSellApprove', ret);
      setApproved(ret);
    }).catch(err => {
      console.error('checkApprove err', err);
    });
  }, [token, amount, decimals, chainId, address, connected, web3, updateApprove]);

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
              <div className={`${styles.description} ${styles.boost_timereduce}`}>
                <span><img src="assets/rocket24x24.png"/> +{(props.boost * 100).toFixed(2)}%</span>
              </div>
              <div className={`${styles.description} ${styles.boost_timereduce}`}>
                <span><img src="assets/hourglass24x24.png" style={{height:20}}/> -{(props.reduce * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>
          <div className={styles.rule}>
            <div>{t('BUYING NFT')}</div>
            <span>{t('Do you want to buy')} "<b>{props.name}</b>" {t('with a tag price of')}</span>
            <div className={styles.price_wrapper}>
              <img src={props.currencyIcon}/>
              <div className={styles.price_currency}>
                <div className={styles.price}>{commafy(props.amount)}</div>
                <div className={styles.currency}>{props.currency}</div>
              </div>
            </div>
          </div>

          <div className={styles.action}>
            <a className={styles.action_btn} disabled={approved} onClick={()=>{
              setTxWaiting(true);
              approveForMarketBuy(token, chainId, web3, address).then(ret=>{
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
              // console.log('on buyOrder')
              setTxWaiting(true);
              buyOrder(props.orderId, chainId, web3, address).then(ret=>{
                insertHistory('purchase', Date.now(), props.tokenId, props.name, props.icon, props.level, commafy(props.amount), props.currency, ret.transactionHash);
                setTxWaiting(false);
                console.log('buyOrder', ret);
                closeModal();
              }).catch(err=>{
                console.error('buyOrder', err);
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
