import styles from './safari.less';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useLanguage } from '../hooks/language';

export default function (props) {
  const t = useLanguage();
  const [topup, setTopup] = useState(0);
  return (
    <React.Fragment>
      {
        //txWaiting && <Loader />
      }

      <div className={styles.row}>

        <div className={styles.pool} data-active={false}> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desertxbtc.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555
              </div>
              <span>{t("ZOO LOCKED")}</span>
            </div>
          </div>
          <div className={styles.title}>
            HUNTING THE BTC (Season01)
          </div>

          <div className={styles.inactive_wrapper} style={{display:'none'}}>
           <img src="assets/currency/wanBTC.png"/>
           <div className={styles.amount}>0.5 wanBTC</div>
           <div className={styles.distributed}>{t('Distributed')}</div>
          </div>

          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              <div className={styles.deposited}>
                {t("unlimited")}
                <span style={{display:'none'}}>Deposited</span>
              </div>
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <div>
                {t("End in")}
                <span>18:54:12</span>
              </div>

            </div>
          </div>

          <div className={styles.topup_wrapper} data-show-topup={false}> {/* Show topup panel when Stake Zoo or Topup */}
            <div className={styles.reward}>
              <div className={styles.type}>
                <img src="assets/currency/wanBTC.png" />
                <div className={styles.amount}>0.25<div className={styles.per_week}>{t('per week')}</div></div>

              </div>
              <div className={styles.description}>
                <div className={styles.caption}>
                  <div>{t("STAKE ZOO AND")}</div>
                  <div>{t("GET")} wanSUSHI</div>
                </div>
                <a className={styles.topup_btn}  style={{display:'none'}}>{t('Top-up')}</a>
              </div>
            </div>

            <div className={styles.topup}>
              <div className={styles.deposit_wrapper}>
                <div className={styles.title}>
                  {t('DEPOSIT ZOO')}
                </div>
                <input className={styles.deposit_amount} value="0" />
              </div>
              <div className={styles.avaliable_wrapper}>
                <div className={styles.title}>
                  154,540.55 {t('AVAILABLE')}
                </div>
                <a className={styles.max}>
                  MAX
              </a>
              </div>
            </div>
          </div>


          <div className={styles.action_wrapper} style={{ display: 'none' }}>
            <a className={styles.action_btn} disabled={false} >
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
          </div>

          <div className={styles.action_wrapper} style={{display:'none'}}>
          
            <a className={styles.action_btn}>
                {t("Withdraw")}
              </a>
           
            <a className={styles.action_btn}>
                {t("Claim")}
              </a>
            
          </div>
        </div>

        <div className={styles.pool} data-active={false}> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desertxbtc.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555
              </div>
              <span>{t("ZOO LOCKED")}</span>
            </div>
          </div>
          <div className={styles.title}>
            HUNTING THE BTC (Season01)
          </div>

          <div className={styles.inactive_wrapper} style={{display:'none'}}>
           <img src="assets/currency/wanBTC.png"/>
           <div className={styles.amount}>0.5 wanBTC</div>
           <div className={styles.distributed}>{t('Distributed')}</div>
          </div>

          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              <div className={styles.deposited}>
                {t("unlimited")}
                <span style={{display:'none'}}>Deposited</span>
              </div>
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <div>
                {t("End in")}
                <span>18:54:12</span>
              </div>

            </div>
          </div>

          <div className={styles.topup_wrapper} data-show-topup={true}> {/* Show topup panel when Stake Zoo or Topup */}
            <div className={styles.reward}>
              <div className={styles.type}>
                <img src="assets/currency/wanBTC.png" />
                <div className={styles.amount}>0.25<div className={styles.per_week}>{t('per week')}</div></div>

              </div>
              <div className={styles.description}>
                <div className={styles.caption}>
                  <div>{t("STAKE ZOO AND")}</div>
                  <div>{t("GET")} wanSUSHI</div>
                </div>
                <a className={styles.topup_btn}  style={{display:'none'}}>{t('Top-up')}</a>
              </div>
            </div>

            <div className={styles.topup}>
              <div className={styles.deposit_wrapper}>
                <div className={styles.title}>
                  {t('DEPOSIT ZOO')}
                </div>
                <input className={styles.deposit_amount} value="0" />
              </div>
              <div className={styles.avaliable_wrapper}>
                <div className={styles.title}>
                  154,540.55 {t('AVAILABLE')}
                </div>
                <a className={styles.max}>
                  MAX
              </a>
              </div>
            </div>
          </div>


          <div className={styles.action_wrapper}>
            <a className={styles.action_btn} disabled={false} >
              {t("Approve")}
            </a>
            <a className={styles.action_btn} disabled={false}>
              {t("Validate")}
            </a>
          </div>


          <div className={styles.action_wrapper} style={{display:'none'}}>
            <a className={styles.action_btn}>
              {t("Stake ZOO")}
            </a>
          </div>

          <div className={styles.action_wrapper} style={{display:'none'}}>
          
            <a className={styles.action_btn}>
                {t("Withdraw")}
              </a>
           
            <a className={styles.action_btn}>
                {t("Claim")}
              </a>
            
          </div>
        </div>

        <div className={styles.pool} data-active={true}> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desertxbtc.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555
              </div>
              <span>{t("ZOO LOCKED")}</span>
            </div>
          </div>
          <div className={styles.title}>
            HUNTING THE BTC (Season01)
          </div>

          <div className={styles.inactive_wrapper} style={{display:'none'}}>
           <img src="assets/currency/wanBTC.png"/>
           <div className={styles.amount}>0.5 wanBTC</div>
           <div className={styles.distributed}>{t('Distributed')}</div>
          </div>

          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              <div className={styles.deposited}>
                152,652.5
                <span>Deposited</span>
              </div>
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <div>
                {t("End in")}
                <span>18:54:12</span>
              </div>

            </div>
          </div>

          <div className={styles.topup_wrapper} data-show-topup={false}> {/* Show topup panel when Stake Zoo or Topup */}
            <div className={styles.reward}>
              <div className={styles.type}>
                <img src="assets/currency/wanBTC.png" />
                <div className={styles.amount}>.002<div className={styles.per_week}>{t('per week')}</div></div>

              </div>
              <div className={styles.description}>
                <div className={styles.caption}  style={{display:'none'}}>
                  <div>{t("STAKE ZOO AND")}</div>
                  <div>{t("GET")} wanSUSHI</div>
                </div>
                <a className={styles.topup_btn}>{t('Top-up')}</a>
              </div>
            </div>

            <div className={styles.topup}>
              <div className={styles.deposit_wrapper}>
                <div className={styles.title}>
                  {t('DEPOSIT ZOO')}
                </div>
                <input className={styles.deposit_amount} value="0" />
              </div>
              <div className={styles.avaliable_wrapper}>
                <div className={styles.title}>
                  154,540.55 {t('AVAILABLE')}
                </div>
                <a className={styles.max}>
                  MAX
              </a>
              </div>
            </div>
          </div>


          <div className={styles.action_wrapper} style={{ display: 'none' }}>
            <a className={styles.action_btn} disabled={false} >
              {t("Approve")}
            </a>
            <a className={styles.action_btn} disabled={false}>
              {t("Validate")}
            </a>
          </div>


          <div className={styles.action_wrapper} style={{display:'none'}}>
            <a className={styles.action_btn}>
              {t("Stake ZOO")}
            </a>
          </div>

          <div className={styles.action_wrapper}>
          
            <a className={styles.action_btn}>
                {t("Withdraw")}
              </a>
           
            <a className={styles.action_btn}>
                {t("Claim")}
              </a>
            
          </div>
        </div>

        <div className={`${styles.pool} ${styles.in_active_pool}`} data-active={false}> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desertxbtc.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                POOL ENDED
              </div>
              <span style={{ display: 'none' }}>{t("ZOO LOCKED")}</span>
            </div>
          </div>
          <div className={styles.title}>
            HUNTING THE BTC (Season01)
          </div>

          <div className={styles.inactive_wrapper}>
           <img src="assets/currency/wanBTC.png"/>
           <div className={styles.amount}>0.5 wanBTC</div>
           <div className={styles.distributed}>{t('Distributed')}</div>
          </div>

          <div className={styles.condition}  style={{ display: 'none' }}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              <div className={styles.deposited}>
                {t("unlimited")}
                <span style={{display:'none'}}>Deposited</span>
              </div>
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <div>
                {t("End in")}
                <span>18:54:12</span>
              </div>

            </div>
          </div>

          <div className={styles.topup_wrapper} data-show-topup={false}  style={{ display: 'none' }}> {/* Show topup panel when Stake Zoo or Topup */}
            <div className={styles.reward}>
              <div className={styles.type}>
                <img src="assets/currency/wanBTC.png" />
                <div className={styles.amount}>0.25<div className={styles.per_week}>{t('per week')}</div></div>

              </div>
              <div className={styles.description}>
                <div className={styles.caption}>
                  <div>{t("STAKE ZOO AND")}</div>
                  <div>{t("GET")} wanSUSHI</div>
                </div>
                <a className={styles.topup_btn}  style={{display:'none'}}>{t('Top-up')}</a>
              </div>
            </div>

            <div className={styles.topup}>
              <div className={styles.deposit_wrapper}>
                <div className={styles.title}>
                  {t('DEPOSIT ZOO')}
                </div>
                <input className={styles.deposit_amount} value="0" />
              </div>
              <div className={styles.avaliable_wrapper}>
                <div className={styles.title}>
                  154,540.55 {t('AVAILABLE')}
                </div>
                <a className={styles.max}>
                  MAX
              </a>
              </div>
            </div>
          </div>


          <div className={styles.action_wrapper} style={{ display: 'none' }}>
            <a className={styles.action_btn} disabled={false} >
              {t("Approve")}
            </a>
            <a className={styles.action_btn} disabled={false}>
              {t("Validate")}
            </a>
          </div>


          <div className={styles.action_wrapper} style={{ display: 'none' }}>
            <a className={styles.action_btn}>
              {t("Stake ZOO")}
            </a>
          </div>

          <div className={styles.action_wrapper} style={{display:'none'}}>
          
            <a className={styles.action_btn}>
                {t("Withdraw")}
              </a>
           
            <a className={styles.action_btn}>
                {t("Claim")}
              </a>
            
          </div>
        </div>


      </div>

    </React.Fragment>
  );
}
