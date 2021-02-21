import styles from './header.less';

export default function Header(props) {
    return (
        <div className={styles.row}>
            <div className={styles.box}>
                <img src="assets/silverbox42x42.png" class={styles.chestbox}/>
                <a className={styles.buy_btn}>
                   <img src="assets/silverkey29x29.png"/> BUY
                </a>
                <div className={styles.chestPrice}>
                    OPEN 1 SILVERCHEST FOR
                    <div>2,554.15 ZOO</div>
                </div>
            </div>

            <div className={styles.box}>
                <img src="assets/goldenbox42x42.png" class={styles.chestbox}/>
                <a className={styles.buy_btn}>
                   <img src="assets/goldenkey29x29.png"/> BUY
                </a>
                <div className={styles.chestPrice}>
                    OPEN 1 GOLDENCHEST FOR
                    <div>25,541.53 ZOO</div>
                </div>
            </div>

            <div className={styles.box}>

            </div>

            <div className={styles.box}>

            </div>
        </div>
    );
}
