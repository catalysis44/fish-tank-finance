import { useState, useEffect, useContext, useRef } from 'react';
import styles from './Pool.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExternalLinkSquareAlt,faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd';
import BoosterSelectionModal from './BoosterSelectionModal';
import { commafy } from '../../utils';
import BigNumber from 'bignumber.js';
import { useCountDown, useClickAway } from 'ahooks';
import { WalletContext } from '../../wallet/Wallet';
import { withdraw } from '../../wallet/send';
import { WWAN_ADDRESS } from '../../config';



export default function Pool(props) {
  const [modal, setModal] = useState(0);

  const [showDeposit, setShowDeposit] = useState(false);
  
  const poolInfo = props.poolInfo;
  const pid = props.pid;
  console.debug('poolInfo 1', poolInfo);
  console.debug('symbol!!', poolInfo.symbol0, poolInfo.symbol1);
  const deposited = poolInfo.lpAmount && (new BigNumber(poolInfo.lpAmount)).gt(0);
  const expirated = poolInfo.expirationTime * 1000 < Date.now();
  
  const [countdown, setTargetDate, formattedRes] = useCountDown({
    targetDate: poolInfo.expirationTime * 1000,
  });

  const { days, hours, minutes, seconds } = formattedRes;

  const wallet = useContext(WalletContext);

  return (
    <React.Fragment >
      <BoosterSelectionModal isActived={modal} setModal={setModal}></BoosterSelectionModal>
      <div id={'pool_'+pid} className={styles.pool} data-active="true"> {/*active true for on staking pool */}
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

        <div className={styles.wrapper_area} data-show-subarea={showDeposit}> {/*data-show-subarea="true" when want to show LP providing panel */}
          <div className={styles.main_area}>
            <div className={styles.earned}>
              <div className={styles.title}>
                ZOO+WASP EARNED
              </div>
              <div className={styles.harvest_wrapper}>
                <div className={styles.earned_amount} data-double-farming="true"> {/*Add "disabled" when non-connected  and data-double-farming="true" when duofarming */}
                  <div>{commafy(poolInfo.pendingZoo)} ZOO</div>
                  <div>{commafy(poolInfo.pendingWasp)} WASP</div>
                </div>
                <a className={styles.harvest} onClick={()=>{
                  if (!wallet.connected) {
                    return;
                  }

                  withdraw(pid, 0, wallet.networkId, wallet.web3, wallet.address).then(ret=>{

                  }).catch(err=>{
                    console.error(err);
                  })
                }} > {/*Add disabled when non-connected */}
                  HARVEST
                </a>
              </div>
            </div>

            <div className={styles.staked}>
              <div className={styles.title}>
                WSLP STAKED: {poolInfo.lpAmount.toString()}
              </div>
              <div className={styles.action_wrapper}>

                <a className={styles.connect_wallet} style={{ display: 'none' }}>
                  Connect Wallet
                </a>
                {
                  !deposited && <a className={styles.deposit_lp} onClick={()=>{setShowDeposit(true)}}>
                    Deposit WSLP Token
                  </a>
                }
                {
                  deposited && expirated && <a className={styles.withdraw_lp}>
                    Withdraw
                  </a>
                }
                {
                  !expirated && <a className={styles.locked_lp}>
                    <div>UNLOCKED in</div>
                    <div>{days}:{hours}:{minutes}:{seconds}</div>
                  </a>
                }
                {
                  deposited && <a className={styles.topup_lp} onClick={()=>{setShowDeposit(true)}}>
                    Top-up
                  </a>
                }
                
              </div>
            </div>

            <div className={styles.horizontal_line}></div>

            <div className={styles.detail_wrapper}>
              <div className={styles.coin_info}>

                <div className={styles.coins}>
                  {poolInfo.symbol0 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+poolInfo.symbol0+'.png'} />}
                  {poolInfo.symbol1 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+poolInfo.symbol1+'.png'} />}
                </div>

                <a className={styles.add_liquidity} onClick={()=>{
                  window.open('https://wanswap.finance/#/add/'+(poolInfo.token0.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token0) +'/'+ (poolInfo.token1.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token1));
                }}>
                  Add Liquidity on WanSwap
                </a>

              </div>

              <div className={styles.liq_detail}>
                <div className={styles.liq_row}>
                  <div>Deposit</div>
                  <div>{poolInfo.symbol0}-{poolInfo.symbol1} <a href=""><FontAwesomeIcon icon={faExternalLinkSquareAlt} /></a></div>
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

                <a className={styles.select_booster} onClick={() => { setModal(1) }}> {/*Hided it after selected*/}
                  <img src="assets/plus.svg" />
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

                    <a className={styles.back}>
                        <FontAwesomeIcon icon={faUndoAlt} />
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
