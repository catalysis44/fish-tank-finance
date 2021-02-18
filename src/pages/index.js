import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
export default function () {
  return (
    <div className={styles.row}>
     
      
      <div className={styles.pool} data-active="false"> {/*active true for on staking pool */}
        <div className={styles.header}>
          <div className={styles.title}>
            TITLE OF THE POOL
          </div>
          {/*is-success for KEEPER CHOICE and is-dark for COMMUNITY CHOICE*/}
          <div className="choice button is-success is-outlined">
            <span class="icon is-small">
              <FontAwesomeIcon icon={faCheckSquare} />
            </span>
            <span>KEEPER CHOICE</span>
          </div>
        </div>

        <div className={styles.avatar}>
          <img src="dummy/bear.png" />
        </div>
        <div className={styles.mul_apy}>
            <div className={styles.multiplier}>
              <img src="assets/golden_coin.png" />
              <span>x2</span>
            </div>
            <div className={styles.apy}>
              <img src="assets/golden_bar.png" />
              <span>555.55%</span>
            </div>
          </div>

        <div className={styles.main_area}>
          <div className={styles.earned}>
            <div className={styles.title}>
              <b>ZOO</b> EARNED
            </div>
            <div className={styles.harvest_wrapper}>
              <div className={styles.earned_amount}>
                0.0
              </div>
              <a className={styles.harvest} disabled> {/*Add disabled when non-connected */}
                HARVEST
              </a>
            </div>
          </div>

          <div className={styles.staked}>
            <div className={styles.title}>
              <b>WSLP</b> STAKED
            </div>
            <div className={styles.action_wrapper}>
              
              <a className={styles.connect_wallet}>
                Connect Wallet
              </a>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>

          <div className={styles.detail_wrapper}>
            <div className={styles.coin_info}>
              
              <div className={styles.coins}>
                  <img src="dummy/wanBTC.png"/>
                  <img src="dummy/wanUSDT.png"/>
              </div>
              
              <a className={styles.add_liquidity}>
                Add Liquidity on WanSwap
              </a>
              
            </div>

            <div className={styles.liq_detail}>
              <div className={styles.liq_row}>
                <div>Deposit</div>
                <div>wanBTC-wanUSDT <a href=""><FontAwesomeIcon icon={faExternalLinkSquareAlt} /></a></div>
              </div>
              <div className={styles.liq_row}>
                <div>Total Liquidity</div>
                <div>$1,154,244</div>
              </div>
              <div className={styles.liq_row}>
                <div><a href="">View on WanSwap.com <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></a></div>
                
              </div>
            </div>
          </div>

        </div>

      </div>
      
      
      
      
    </div>
  );
}
