import styles from './safari.less';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useLanguage } from '../hooks/language';

export default function (props) {
  const t = useLanguage();
  return (
    <React.Fragment>
      {
        //txWaiting && <Loader />
      }
     
      <div className={styles.row}>
        <div className={styles.pool} data-active={true}> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="assets/expedition/mightycave.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555
              </div>
                {t("ZOO LOCKED")}
            </div>
          </div>
          <div className={styles.title}>
            We're Satoshi
          </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {t("unlimited")}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>2 {t("Days")}</span>

            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/goldenbox48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>
              <div>{t("STAKE AND LOCK")}</div>
              <div>{t("ZOO TO RECEIVE")}</div>
              <div>1 {t("GOLDEN CHEST")}</div>
            </div>
          </div>
          
          <div className={styles.action_wrapper}>
            <a className={styles.action_btn} disabled={false}>
              {t("Approve")}
            </a>
            <a className={styles.action_btn} disabled={false}>
              {t("Validate")}
            </a>
          </div>
          

          <div className={styles.action_wrapper}>
           <a className={styles.action_btn}>
                {t("Stake ZOO")}
            </a>
            <a className={styles.action_btn}>
                {t("Claim 1 Golden Chest")}
              </a>
           
            <a className={styles.action_btn} disabled>
                {t("Left")}
              </a>
            
          </div>
        </div>


      </div>

    </React.Fragment>
  );
}
