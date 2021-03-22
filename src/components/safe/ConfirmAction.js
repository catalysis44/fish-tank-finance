import { useState, useEffect } from 'react';
import styles from './ConfirmAction.less';
import '../../../node_modules/animate.css/animate.min.css';
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
                <span><img src={categoryIcons[props.category-1]}/>{categorys[props.category-1]}</span>
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
            <span>"<b>Wasabi Ginger Sake</b>" will be added to the market with a tag price of</span>
            <div className={styles.price_wrapper}>
              <img src="assets/currency/wanETH.png"/>
              <div className={styles.price_currency}>
                <div className={styles.price}>105.151454</div>
                <div className={styles.currency}>wanETH</div>
              </div>
            </div>
          </div>

          <div className={styles.action}>
            <a className={styles.action_btn} disabled>
                APPROVE
            </a>
            <a className={styles.action_btn}>
                CONFIRM
            </a>
          </div>
        </section>
      </div>



    </div>
  )
}
