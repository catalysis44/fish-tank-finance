import { useState, useEffect } from 'react';
import styles from './ChestboxBuyModal.less';
import '../../../node_modules/animate.css/animate.css';
export default function ChestboxBuyModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }


  return (
    <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background animate__animated" onClick={closeModal}></div>
      <div style={{ maxWidth: 400 }} className="modal-card animate__animated  animate__rubberBand">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.description}>
            <img src="assets/goldenbox48x48.png" /> {/*silverbox48x48 or goldenbox48x48*/}
            <div>
              <div>GOLD CHEST INSTANT BUY</div>
              <div>ZOO TO BURN : <span>21,152.10</span></div>
            </div>
          </div>
          <div className={styles.rule}>
            <div>RULES</div>
            <span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</span>
            <a>MORE DETAILS ABOUT THE CHEST</a>
          </div>
          <div className={styles.action}>
              <a className={styles.action_btn}> {/* Can remove Top-up button and it will expand 100% automatically*/}
                    Withdraw
              </a>
              <a className={styles.action_btn}>
                    Top-up
              </a>
          </div>
        </section>
      </div>



    </div>
  )
}
