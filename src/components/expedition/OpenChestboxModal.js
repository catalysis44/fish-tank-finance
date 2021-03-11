import { useState, useEffect } from 'react';
import styles from './OpenChestboxModal.less';
import '../../../node_modules/animate.css/animate.min.css';
export default function OpenChestboxModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }


  return (
    <div id="OpenChestBoxModal" className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 246 }} className="modal-card animate__animated  animate__jackInTheBox animate__fast">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.header}>
            <div className={styles.star}>
              <img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
            </div>
            <div className={styles.title}>
              Wonderland Cheery Jam
            </div>
            <div className={styles.supply}>
              <img src="assets/gem/common18x18.png" /> total supply: 100
            </div>
          </div>

          <div className={styles.item_wrapper}>
            <div className={styles.item}>
              <img src="assets/item80x80.png" className={styles.float_item}/>
              <img src="assets/openedBox80x80.png" className={styles.openedBox}/>
            </div>
            <div  className={styles.item_description}>
              <div className={styles.description}>
                <span>Card #</span>
                55,555,555
              </div>
              <div className={styles.description}>
                <span><img src="assets/apple24x24.png"/> Fruits</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/rocket24x24.png"/> +5.15%</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/hourglass24x24.png" style={{height:20}}/> -12:40</span>
              </div>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>
          <div className={styles.rule}>
            <div>GOLD CHEST HAS BEEN OPENED</div>
            <span>You got "<a href="">Wasabi Ginger Sake</a>",
          your boost card has been transfered
          to you wallet</span>
          </div>

          <div className={styles.action}>
            <a className={styles.action_btn}>
              Check your Safe
              </a>
          </div>
        </section>
      </div>



    </div>
  )
}
