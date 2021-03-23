import { useState, useEffect, useContext } from 'react';
import styles from './ConfirmAction.less';
import '../../../node_modules/animate.css/animate.min.css';
import { WalletContext } from '../../wallet/Wallet';
import { checkMarketSellApprove, approveMarket, createOrder } from '../../wallet/send';
export default function ConfirmAction(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }

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

  // console.debug('category:', props);

  const setTxWaiting = props.setTxWaiting;
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;
  const approved = props.approved;
  const setUpdateApprove = props.setUpdateApprove;

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
              <img src="assets/gem/common18x18.png" /> total supply: {props.itemSupply}
            </div>
          </div>

          <div className={styles.item_wrapper}>
            <div className={styles.item}>
              <img src={props.icon} className={styles.float_item}/>

            </div>
            <div  className={styles.item_description}>
              <div className={styles.description}>
                <span>Card #</span>
                {props.tokenId}
              </div>
              <div className={styles.description}>
                <span><img src={props.categoryIcon}/>{props.categoryName}</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/rocket24x24.png"/> +{(props.boost * 100).toFixed(2)}%</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/hourglass24x24.png" style={{height:20}}/> -{(props.reduce * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>
          <div className={styles.rule}>
            <div>BUSINESS IS GROWING</div>
            <span>"<b>{props.name}</b>" will be added to the market with a tag price of</span>
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
                APPROVE
            </a>
            <a className={styles.action_btn}  disabled={!approved} onClick={()=>{
              setTxWaiting(true);
              createOrder(props.tokenId, props.currency, props.amount, chainId, web3, address).then(ret=>{
                setTxWaiting(false);
                console.log('createOrder', ret);
              }).catch(err=>{
                setTxWaiting(false);
              });
            }}>
                CONFIRM
            </a>
          </div>
        </section>
      </div>



    </div>
  )
}