import styles from './header.less';
import ChestboxBuyModal from './expedition/ChestboxBuyModal';
import React from 'react';
import { useState } from 'react';
export default function Header(props) {
    const [modal, setModal] = useState(0);
    return (
        <React.Fragment>
        <ChestboxBuyModal isActived={modal} setModal={setModal}></ChestboxBuyModal>
        <div className={styles.row}>
            <div className={styles.box}>
                <img src="assets/silverbox42x42.png" class={styles.chestbox}/>
                <a className={styles.buy_btn} onClick={()=>{setModal(1)}}>
                   <img src="assets/silverkey29x29.png"/> BUY
                </a>
                <div className={styles.chestPrice}>
                    1 SILVERCHEST FOR
                    <div>2,554.15 ZOO</div>
                </div>
            </div>

            <div className={styles.box}>
                <img src="assets/goldenbox42x42.png" class={styles.chestbox}/>
                <a className={styles.buy_btn} onClick={()=>{setModal(1)}}>
                   <img src="assets/goldenkey29x29.png"/> BUY
                </a>
                <div className={styles.chestPrice}>
                    1 GOLDENCHEST FOR
                    <div>25,541.53 ZOO</div>
                </div>
            </div>

            <div className={styles.box} style={{display:'none'}}>
                <img src="assets/zoo48x48.png" class={styles.zoo_icon}/>
                <div class={styles.current_supply}>
                    <div>Current Supply</div>
                    <div>154,548,453 ZOO</div>
                </div>
                <div class={styles.verticle_line}>

                </div>
                <div class={styles.market}>
                    <div>1 ZOO = <span>$10.32</span></div>
                    <div>MC $154,548,453</div>
                </div>
            </div>

            <div className={styles.box} style={{display:'none'}}>
                <img src="assets/burned42x42.png" class={styles.burn_icon}/>
                <div class={styles.burn}>
                    <div class={styles.burn_text}>TOTAL BURNED</div>
                    <div class={styles.burn_amount}>55,012,345.56 ZOO</div>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}
