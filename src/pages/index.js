import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
export default function () {
  return (

    <div className={styles.row}>
      <div className={styles.pool} data-active="false"> {/*active true for on staking pool */}
        <div className={styles.bubble} data-equipped-nft="true"> {/*true if equipped an NFT*/}


          <img src="dummy/equip_item.png" />
          <div className={styles.bubble_text} data-three-line="true"> {/*true if show 3 lines*/}
            <div>NFT NAME</div>
            <div>REWARD +5%</div>
            <div>LOCK TIME -23 HOURS</div>
          </div>

        </div>
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
          <img src="dummy/lama.png" />
        </div>
        <div className={styles.mul_apy}>
          <div className={styles.multiplier}>
            <img src="assets/zoo32x32.png" />
            <span>x2</span>
          </div>
          <div className={styles.apy}>
            <img src="assets/apy36x36.png" />
            <span>555.55%</span>
          </div>
        </div>


        <div className={styles.wrapper_area} data-show-subarea="true"> {/*data-show-subarea="true" when want to show LP providing panel */}
          <div className={styles.main_area}>

            <div className={styles.earned}>
              <div className={styles.title}>
                ZOO+WASP EARNED
            </div>
              <div className={styles.harvest_wrapper}>
                <div className={styles.earned_amount} data-double-farming="true"> {/*Add "disabled" when non-connected  and data-double-farming="true" when duofarming */}
                  <div>125.5410 ZOO</div>
                  <div>158.86 WASP</div>
                </div>
                <a className={styles.harvest} > {/*Add disabled when non-connected */}
                HARVEST
              </a>
              </div>
            </div>

            <div className={styles.staked}>
              <div className={styles.title}>
                WSLP STAKED
            </div>
              <div className={styles.action_wrapper}>

                <a className={styles.connect_wallet} style={{ display: 'none' }}>
                  Connect Wallet
              </a>
                <a className={styles.deposit_lp} >
                  Deposit WSLP Token
              </a>
                <a className={styles.withdraw_lp} style={{ display: 'none' }}>
                  Withdraw
              </a>
                <a className={styles.locked_lp} style={{ display: 'none' }}>
                  <div>UNLOCKED in</div>
                  <div>254:24:23</div>
                </a>
                <a className={styles.topup_lp} style={{ display: 'none' }}>
                  Top-up
              </a>
              </div>
            </div>

            <div className={styles.horizontal_line}></div>

            <div className={styles.detail_wrapper}>
              <div className={styles.coin_info}>

                <div className={styles.coins}>
                  <img src="dummy/wanBTC.png" />
                  <img src="dummy/wanUSDT.png" />
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

          <div className={styles.sub_area}>
            <div className={styles.deposit}>
              <div className={styles.title}>
                <span>DEPOSIT WSLP</span>
                <span>1.51454115 AVAILABLE</span>
              </div>
              <div className={styles.deposit_wrapper}>

                <input value="125.5410" className={styles.deposit_amount} />

                <div class={styles.coin_wrapper}>
                  <a className={styles.max} > {/*Add disabled when non-connected */}
                    MAX
                  </a>
                  <div className={styles.coins}>
                    <img src="dummy/wanBTC.png" />
                    <img src="dummy/wanUSDT.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.locking}>
              <div className={styles.title}>
                <span>LOCK PERIOD</span>
                <span>BOOST X5</span>
              </div>
              <div className={styles.lock_wrapper}>

                <div className={styles.lock_period}>
                  180 days
                </div>
                <div className={styles.lock_action}>
                  <img src="dummy/slider.png" />
                </div>


              </div>
            </div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.boosting}>
              <div className={styles.title}>
                <span>EXTRA BOOST</span>
              </div>

              <div className={styles.action_wrapper}>

                <a className={styles.select_booster}>
                  +
                </a>

                <div className={styles.lp_management}>
                  <a className={styles.approve}>
                    Approve
                  </a>

                  <a className={styles.validate}>
                    Validate
                  </a>
                </div>
              </div>



            </div>
          </div>
        </div>


      </div>







    </div>
  );
}
