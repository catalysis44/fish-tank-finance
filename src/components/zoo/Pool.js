import { useState, useEffect } from 'react';
import styles from './Pool.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd';
import BoosterSelectionModal from './BoosterSelectionModal';
export default function Pool(props) {
    const [modal, setModal] = useState(0);
    function showSubArea() { 
        document.getElementById('sub_area').setAttribute("data-show-subarea", "true");
      }
    return (
        <React.Fragment>
            <BoosterSelectionModal isActived={modal} setModal={setModal}></BoosterSelectionModal>
            <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
                <div className={styles.bubble} data-equipped-nft="true"> {/*true if equipped an NFT*/}
                    <a href="" className={styles.reload}><img src="assets/reload24x24.png" /></a>
                    <img src="dummy/equip_item.png" />
                    <div className={styles.bubble_text}>
                        <div className={styles.name}>Very Red Strawberry</div>
                        <div className={styles.boost_amount}>+150.33%</div>
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
                    <img src="dummy/giraffe.png" className={styles.lv1} />
                    <img src="assets/sunglass.png" className={styles.lv2} />
                </div>
                <div className={styles.mul_apy}>
                    <div className={styles.multiplier}>
                        <img src="assets/zoo32x32.png" />
                        <span>×2</span>
                    </div>
                    <div className={styles.apy} >
                        <img src="assets/apy36x36.png" />
                        <span>555.55%</span>

                    </div>
                </div>


                <div id="sub_area" className={styles.wrapper_area} data-show-subarea="false"> {/*data-show-subarea="true" when want to show LP providing panel */}
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
                                <a className={styles.deposit_lp} onClick={showSubArea}>
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
                                <span className={styles.boost}>BOOST X5</span>
                            </div>
                            <div className={styles.lock_wrapper}>

                                <div className={styles.lock_period}>
                                    180 days
      </div>
                                <div className={styles.lock_action}>
                                    <Slider defaultValue={30} min={8} max={180} tooltipVisible={false} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.horizontal_line}></div>
                        <div className={styles.boosting}>
                            <div className={styles.title}>
                                <span>EXTRA BOOST</span>
                            </div>

                            <div className={styles.action_wrapper}>

                                <a className={styles.select_booster}  onClick={()=>{setModal(1)}}> {/*Hided it after selected*/}
                                    <span>+</span>
                                </a>

                                <a className={styles.selected_booster} style={{ display: 'none' }}>
                                    <img src="dummy/booster.png" />
                                    <div className={styles.booster}>
                                        <img src="assets/rocket24x24.png" />
                                    +5.55%
                                    </div>
                                    <div className={styles.locked_time}>
                                        <img src="assets/hourglass24x24.png" />
          -524.50
        </div>
                                    <a className={styles.remove}><img src="assets/remove16x16.png" /></a>
                                    <a className={styles.reload}><img src="assets/reload24x24.png" style={{ display: 'none' }} /></a>
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

        </React.Fragment>
    )
}
