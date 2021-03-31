import { useState, useEffect } from 'react';
import styles from './ConfirmResetCache.less';
import '../../../node_modules/animate.css/animate.min.css';
import React, { useContext } from 'react';
import { useLanguage } from '../../hooks/language';

export default function ConfirmResetCache(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const t = useLanguage();

  return (
    <React.Fragment>
     <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 400 }} className="modal-card animate__animated  animate__fadeInUp animate__faster">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.description}>
          <img src="assets/notification/exclamation.png" /> 
            <div>
              <div>{t('RESET CACHE CONFIRMATION')}</div>
              <span>{t('Warning! all TX History will be cleared')}</span>
            </div>
          </div>
          
          <div className={styles.action}>
            <a className={styles.action_btn} onClick={()=>{
                window.localStorage.clear();
                window.location.reload();
              }}>
              CONFIRM
            </a>
 
          </div>
          <div className={styles.action}>
          </div>
      </section>
      </div>



    </div>
    </React.Fragment>
  )
}
