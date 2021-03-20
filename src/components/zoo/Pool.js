import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import styles from './Pool.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExternalLinkSquareAlt,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd';
import BoosterSelectionModal from './BoosterSelectionModal';
import { commafy, checkNumber, calcLockTimeBoost } from '../../utils';
import BigNumber from 'bignumber.js';
import { useCountDown } from 'ahooks';
import { WalletContext } from '../../wallet/Wallet';
import { approve, checkApprove, deposit, withdraw } from '../../wallet/send';
import { WANSWAP_URL, WWAN_ADDRESS, ZOO_FARMING_ADDRESS } from '../../config';
import { getNftInfo } from '../../hooks/nftInfo';
import { getPrices } from '../../hooks/price';

const poolAnimals = [
  '/zoo_keeper_pools/BEAR.png',
  '/zoo_keeper_pools/CROCODILE.png',
  '/zoo_keeper_pools/ELEPHANT.png',
  '/zoo_keeper_pools/GIRAFE.png',
  '/zoo_keeper_pools/HIPPO.png',
  '/zoo_keeper_pools/KANGAROO.png',
  '/zoo_keeper_pools/KOALA.png',
  '/zoo_keeper_pools/LAMA.png',
  '/zoo_keeper_pools/LION.png',
  '/zoo_keeper_pools/MONKEY.png',
  '/zoo_keeper_pools/PANDA.png',
  '/zoo_keeper_pools/PENGUIN.png',
  '/zoo_keeper_pools/POLAR_BEAR.png',
  '/zoo_keeper_pools/RHINO.png',
  '/zoo_keeper_pools/TIGER.png',
  '/zoo_keeper_pools/TOUKAN.png',
  '/zoo_keeper_pools/TURTOISE.png',
  '/zoo_keeper_pools/WHALE.png',
  '/zoo_keeper_pools/WOLF.png',
  '/zoo_keeper_pools/ZEBRA.png',
];

const poolTitles = [
  'BO HONEYFIEND', // BEAR
  'CARL CROC-SNAP', // CROCODILE
  'PHANTA CEE TUSK', // ELEPHANT
  'RAFFERTY G. MONAY', // GIRAFFE
  'HIP HIPPO RAY', // HIPPO
  'HOPPY K. BOUNCER', // KANGAROO
  'KRIS TREELEAFER', // KOALA
  'FELEECE ALPACA', // LLAMA
  'RAGING MANE LEWIS', // LION
  'MEL GIBBON', // MONKEY
  'PAULIE BAMBOOZLE', // PANDA
  'SALLY SLICKFEET', // PENGUIN
  'PHIL T. ICEBARDGE', // POLAR BEAR
  'HARRY HORNDHAM', // RHINO
  'STRIPEY TONAY', // TIGER
  'CANDY TWO CANS', // TOUKAN
  'SHELLEY C. SNAPPER', // TORTOISE 
  'BLUBBER BOB', // WHALE 
  'WANDA MOONHOWL', // WOLF 
  'ZOE HOOFMEISTER', // ZEBRA
]


export default function Pool(props) {
  const [modal, setModal] = useState(0);

  const [showDeposit, setShowDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [lockDays, setLockDays] = useState(0);
  const [approved, setApproved] = useState(false);
  const [nftId, setNftId] = useState(0);
  const [updateApprove, setUpdateApprove] = useState(0);
  const [icon, setIcon] = useState(0);
  const [boost, setBoost] = useState(0);
  const [reduce, setReduce] = useState(0);
  const [nftName, setNftName] = useState('');

  
  const setTxWaiting = props.setTxWaiting;
  const poolInfo = props.poolInfo;
  const pid = props.pid;
  // console.debug('poolInfo 1', poolInfo);
  // console.debug('symbol!!', poolInfo.symbol0, poolInfo.symbol1);
  const lpAmount = poolInfo.lpAmount;
  const deposited = lpAmount && (new BigNumber(lpAmount)).gt(0);
  const expirated = poolInfo.expirationTime * 1000 < Date.now();
  const baseAllocPoint = 100;
  const currentTokenId = poolInfo.tokenId; 
  const dualFarmingEnable = poolInfo.dualFarmingEnable;
  const farmingInfo = props.farmingInfo;
  const totalAllocPoint = farmingInfo.totalAllocPoint;
  const totalDeposited = poolInfo.totalDeposited;
  const allocPoint = poolInfo.allocPoint;
  const zooPerBlock = Number(farmingInfo.zooPerBlock.toString());
  const blockPerWeek = 120960; //3600/5*24*7
  const waspAllocPoint = poolInfo.waspAllocPoint;
  const waspTotalAllocPoint = poolInfo.waspTotalAllocPoint;
  const waspTotalLP = poolInfo.waspTotalLP;
  let symbol0 = poolInfo.symbol0;
  let symbol1 = poolInfo.symbol1;
  const decimals0 = poolInfo.decimals0;
  const decimals1 = poolInfo.decimals1
  const reserve0 = poolInfo.reserve0;
  const reserve1 = poolInfo.reserve1;

  const prices = getPrices();

  const multiplier = poolInfo.getMultiplier;

  const zooPerWeek = useMemo(()=>{
    return lpAmount && (new BigNumber(lpAmount)).gt(0) && (new BigNumber(lpAmount)).multipliedBy(zooPerBlock * multiplier * blockPerWeek * allocPoint / totalAllocPoint).div(totalDeposited);
  }, [totalAllocPoint, allocPoint, zooPerBlock, blockPerWeek, totalDeposited, lpAmount]);

  const waspPerWeek = useMemo(()=>{
    if (!dualFarmingEnable) {
      return 0;
    }
    const waspPerBlock = 12;
    return lpAmount && (new BigNumber(lpAmount)).gt(0) && (new BigNumber(lpAmount)).multipliedBy(waspPerBlock * blockPerWeek * waspAllocPoint / waspTotalAllocPoint).div(waspTotalLP);
  }, [waspAllocPoint, waspTotalAllocPoint, waspTotalLP, blockPerWeek, lpAmount, dualFarmingEnable]);

  const apy = useMemo(()=>{
    if (decimals0 === 0 || decimals1 === 0 || !prices[symbol0] || !prices[symbol1] || !prices['ZOO'] || !prices['WASP']) {
      return;
    }

    // get wslp price
    const r0 = Number(reserve0.toString());
    const r1 = Number(reserve1.toString());
    const d0 = Number(decimals0);
    const d1 = Number(decimals1);

    const lpPrice = (r0 / 10**d0 * prices[symbol0] + r1 / 10**d1 * prices[symbol1]) / (Math.sqrt(r0 * r1) / 1e18);
    // console.debug('lpPrice', lpPrice, symbol0, symbol1);
    
    const yearReward = zooPerWeek * prices['ZOO'] / 7 * 365 + waspPerWeek * prices['WASP'] / 7 * 365;
    let apy = Number(lpAmount.toString()) > 0 ? (yearReward / (Number(lpAmount.toString()) * lpPrice)) : 0;
    // console.debug('apy 1', (apy * 100));

    if (apy === 0) {
      const zooPerYear = zooPerBlock * (3600/5*24*365) * allocPoint / totalAllocPoint;
      const waspPerBlock = 12;
      const waspPerYear = waspPerBlock * blockPerWeek * waspAllocPoint / waspTotalAllocPoint;
      let apyZoo = zooPerYear * prices['ZOO'] / (totalDeposited * lpPrice);
      let apyWasp = waspPerYear * prices['WASP'] / (waspTotalLP * lpPrice);
      if (totalDeposited.toString() !== '0') {
        apy += apyZoo;
      }
      if (waspTotalLP.toString() !== '0') {
        apy += apyWasp;
      }
    }

    // console.debug('apy 3', (apy * 100));
    return apy * 100;
  }, [symbol0, symbol1, decimals0, decimals1, reserve0, reserve1, lpAmount, prices, waspPerWeek, zooPerWeek, allocPoint, totalAllocPoint, waspAllocPoint, waspTotalAllocPoint, totalDeposited, waspTotalLP]);

  
  const [countdown, setTargetDate, formattedRes] = useCountDown({
    targetDate: new Date(poolInfo.expirationTime * 1000),
  });

  const { days, hours, minutes, seconds } = formattedRes;

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;
  const lpToken = poolInfo.lpToken;

  useEffect(()=>{
    if (!chainId || !address || !connected || !web3) {
      return;
    }
    // console.debug('checkApprove begin', updateApprove);
    checkApprove(lpToken, '0x'+(new BigNumber(depositAmount)).multipliedBy(1e18).toString(16), chainId, web3, address).then(ret=>{
      // console.debug('checkApprove', ret);
      setApproved(ret);
    }).catch(err=>{
      console.error('checkApprove err', err);
    });
  }, [chainId, address, connected, lpToken, depositAmount, web3, updateApprove]);

  useEffect(() => {
    if (currentTokenId === 0 || !connected || !web3) {
      return;
    }

    getNftInfo(currentTokenId, web3, chainId).then(ret => {
      // console.debug('nftmeta333', ret);
      setIcon(ret.image);
      setBoost(ret.boost);
      setReduce(ret.timeReduce);
      setNftId(ret.tokenId);
      setNftName(ret.name);
    }).catch(err=>{
      console.error('getNftInfo 2', err);
    })

  }, [currentTokenId, web3, chainId, connected]);

  if (poolInfo.symbol0 === 'WBTC') {
    symbol0 = 'wanBTC';
  }

  if (poolInfo.symbol1 === 'WBTC') {
    symbol1 = 'wanBTC';
  }

  if (poolInfo.symbol0 === 'WWAN') {
    symbol0 = 'WAN';
  }

  if (poolInfo.symbol1 === 'WWAN') {
    symbol1 = 'WAN';
  }

  // console.debug('currentInfo', icon, nftId, boost, reduce);
  return (
    <React.Fragment >
      <BoosterSelectionModal isActived={modal} setModal={setModal} 
        setNftId={setNftId}
        setIcon={setIcon}
        setBoost={setBoost}
        setReduce={setReduce}
        ></BoosterSelectionModal>
      <div id={'pool_'+pid} className={styles.pool} data-active={poolInfo.lpAmount.toString() > 0}> {/*active true for on staking pool */}
        <div className={styles.bubble} data-equipped-nft={currentTokenId !== 0 ? "true" : "false"} style={{display: !deposited && !dualFarmingEnable?'none':'flex'}}> {/*true if equipped an NFT*/}
          {
            currentTokenId !== 0 && <a href="" className={styles.reload}><img src="assets/reload24x24.png" /></a>
          }
          
          {
            currentTokenId !== 0 && icon && <img src={icon} />
          }
          {
            deposited && currentTokenId === 0 && <img src="/assets/equip28x28.png" />
          }
          {
            !deposited && dualFarmingEnable && <img src="/assets/dualfarm28x28.png" />
          }
          
          <div className={styles.bubble_text}>
            {
              currentTokenId !== 0 && <div className={styles.name}>{nftName}</div>
            }
            {
              currentTokenId !== 0 && <div className={styles.boost_amount}>REWARD +{(boost*100).toFixed(2)}%</div>
            }
            {
              currentTokenId !== 0 && <div className={styles.boost_amount}>LOCKTIME -{(reduce*100).toFixed(2)}%</div>
            }
            {
              deposited && currentTokenId === 0 && <div className={styles.boost_amount}>ATTACH A BOOST CARD TO OPTIMIZE YOUR FARMING</div>
            }
            {
              !deposited && dualFarmingEnable && <div className={styles.boost_amount}>DUAL FARMING <div>ZOO+WASP</div></div>
            }
            {
              !deposited && !dualFarmingEnable && <div className={styles.boost_amount}>WELCOME FARMING ZOO</div>
            }
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.title}>
            {poolTitles[pid]}
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
          <img src={poolAnimals[pid % poolAnimals.length]} className={styles.lv1} />
          {
          poolInfo.lpAmount.toString() > 0 && <img src="assets/sunglass.png" className={styles.lv2} />
          }
        </div>
        <div className={styles.mul_apy}>
          <div className={styles.multiplier}>
            <img src="assets/zoo32x32.png" />
            <span>×{poolInfo.allocPoint && (poolInfo.allocPoint / baseAllocPoint).toFixed(0)}</span>
          </div>
          <div className={styles.apy} >
            <img src="assets/apy36x36.png" />
            <span>{commafy(apy).split('.')[0]}%</span>

          </div>
        </div>

        <div className={styles.wrapper_area} data-show-subarea={showDeposit}> {/*data-show-subarea="true" when want to show LP providing panel */}
          <div className={styles.main_area}>
            <div className={styles.earned}>
              <div className={styles.title}>
                {
                  dualFarmingEnable && "ZOO+WASP EARNED"
                }
                {
                  !dualFarmingEnable && "ZOO EARNED"
                }
                
                <span className={styles.tipbox_btn}>
                  ?
                  <div className={styles.tipbox}>
                    <div className={styles.per_week}>
                      <img src="assets/currency/zoo.png"/>
                      <div>
                        {commafy(zooPerWeek)}
                        <span>per week</span>
                      </div>
                    </div>

                    {
                      dualFarmingEnable && <div className={styles.per_week}> {/*display:none if not dualfarm*/}
                        <img src="assets/currency/wasp.png"/>
                        <div>
                          {commafy(waspPerWeek)}
                          <span>per week</span>
                        </div>
                      </div>
                    }
                    
                  </div>
                </span>
              </div>
              <div className={styles.harvest_wrapper}>
                <div className={styles.earned_amount} data-double-farming={dualFarmingEnable ?true: false}> {/*Add "disabled" when non-connected  and data-double-farming="true" when duofarming */}
                  <div>{commafy(poolInfo.pendingZoo)} ZOO</div>
                  {
                    dualFarmingEnable && <div>{commafy(poolInfo.pendingWasp)} WASP</div>
                  }
                </div>
                <a className={styles.harvest} onClick={()=>{
                  if (!wallet.connected) {
                    return;
                  }
                  setTxWaiting(true);
                  withdraw(pid, 0, wallet.networkId, wallet.web3, wallet.address).then(ret=>{
                    setTxWaiting(false);
                  }).catch(err=>{
                    console.error(err);
                    setTxWaiting(false);
                  })
                }} disabled={poolInfo.pendingZoo == 0}> {/*Add disabled when non-connected */}
                  HARVEST
                </a>
              </div>
            </div>

            <div className={styles.staked}>
              <div className={styles.title}>
                WSLP STAKED: {poolInfo.lpAmount.toString()}
              </div>
              <div className={styles.action_wrapper}>

                {
                  !connected && <a className={styles.connect_wallet} onClick={()=>{
                    wallet.connect();
                  }}>
                    Connect Wallet
                  </a>
                }
                
                {
                  connected && !deposited && <a className={styles.deposit_lp} onClick={()=>{setShowDeposit(true)}}>
                    
                    Deposit WSLP Token
                  </a>
                }
                {
                  connected && deposited && expirated && <a className={styles.withdraw_lp} onClick={()=>{
                    setTxWaiting(true);
                    withdraw(pid, '0x' + (new BigNumber(poolInfo.lpAmount.toString())).multipliedBy(1e18).toString(16), chainId, web3, address).then(ret=>{
                      setTxWaiting(false);
                      // console.debug('withdraw bt ret', ret);
                    }).catch(err=>{
                      setTxWaiting(false);
                      console.error('withdraw failed', err);
                    });
                  }}>
                    Withdraw
                  </a>
                }
                {
                  connected && !expirated && <a className={styles.locked_lp}>
                    <div className={styles.tipbox_btn}>
                      ?
                      <div className={styles.tipbox}>
                        <div className={styles.boosting}>
                          <img src="assets/hourglass24x24.png"/>
                          <div>
                            +{commafy(calcLockTimeBoost((poolInfo.expirationTime - Date.now()/1000) / (3600 * 24))*100,2) + '%'}
                            <span>boost</span>
                          </div>
                        </div>
                        <div className={styles.horizontal_line}></div>
                        <div className={styles.locktime}>
                          {((poolInfo.expirationTime - Date.now()/1000) / (3600 * 24)).toFixed(0)} Days
                          <span>lock time</span>
                        </div>
                      </div>
                    </div>
                    <div>UNLOCKED in</div>
                    <div>{days}:{hours}:{minutes}:{seconds}</div>
                  </a>
                }
                {
                  connected && deposited && <a className={styles.topup_lp} onClick={()=>{setShowDeposit(true)}}>
                    Top-up
                  </a>
                }
                
              </div>
            </div>

            <div className={styles.horizontal_line}></div>

            <div className={styles.detail_wrapper}>
              <div className={styles.coin_info}>

                <div className={styles.coins}>
                  {symbol0 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+symbol0+'.png'} />}
                  {symbol1 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+symbol1+'.png'} />}
                </div>

                <a className={styles.add_liquidity}
                  target="view_window"
                  href={ WANSWAP_URL + '/#/add/'+(poolInfo.token0 && poolInfo.token0.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token0) +'/'+ (poolInfo.token1 && poolInfo.token1.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token1) }>
                  Add Liquidity on WanSwap
                </a>

              </div>

              <div className={styles.liq_detail}>
                <div className={styles.liq_row}>
                  <div>Deposit</div>
                  <div>{symbol0}-{symbol1} <a 
                   target="view_window"
                   href={ WANSWAP_URL + '/#/add/'+(poolInfo.token0 && poolInfo.token0.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token0) +'/'+ (poolInfo.token1 && poolInfo.token1.toLowerCase() === WWAN_ADDRESS[wallet.networkId] ? 'WAN' : poolInfo.token1) }
                  ><FontAwesomeIcon icon={faExternalLinkSquareAlt} /></a></div>
                </div>
                <div className={styles.liq_row}>
                  <div>Total Liquidity</div>
                  <div>{commafy(totalDeposited) + " WSLP"}</div>
                </div>
                <div className={styles.liq_row}>
                  <div><a target="view_window" href={"https://info.wanswap.finance/pair/" + lpToken}>View on info.WanSwap.finance <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></a></div>

                </div>
              </div>
            </div>

          </div>

          <div className={styles.sub_area}>
            <div className={styles.deposit}>
              <div className={styles.title}>
                <span>DEPOSIT WSLP</span>
                <span>{poolInfo.lpBalance && poolInfo.lpBalance.toString()} AVAILABLE</span>
              </div>
              <div className={styles.deposit_wrapper}>

                <input value={depositAmount} className={styles.deposit_amount} onChange={(e)=>{
                  if (checkNumber(e)) {
                    setDepositAmount(e.target.value);
                  }
                }}/>

                <div class={styles.coin_wrapper}>
                  <a className={styles.max} onClick={()=>{
                    setDepositAmount(poolInfo.lpBalance && poolInfo.lpBalance.toString());
                  }} disabled={!connected}> {/*Add disabled when non-connected */}
                    MAX
                  </a>
                  <div className={styles.coins}>
                    {symbol0 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+symbol0+'.png'} />}
                    {symbol1 && <img src={'https://token-icons.vercel.app/icon/wanswap/'+symbol1+'.png'} />}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.locking}>
              <div className={styles.title}>
                <span>LOCK PERIOD</span>
                <span className={styles.boost}>BOOST +{commafy(calcLockTimeBoost(lockDays)*100) + '%'}</span>
              </div>
              <div className={styles.lock_wrapper}>

                <div className={styles.lock_period}>
                  {lockDays} days
                </div>
                <div className={styles.lock_action}>
                  <Slider value={lockDays} min={0} max={180} tooltipVisible={false} onChange={(e)=>{
                    setLockDays(e);
                  }} />
                </div>
              </div>
            </div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.boosting}>
              <div className={styles.title}>
                <span>EXTRA BOOST</span>
              </div>

              <div className={styles.action_wrapper}>

                {
                  nftId === 0 && currentTokenId === 0 && <a className={styles.select_booster} onClick={() => { setModal(1) }} > {/*Hided it after selected*/}
                    <img src="assets/plus.svg" />
                  </a>
                }
                {
                  nftId !== 0 && <a className={styles.selected_booster}>
                    <img src={icon} />
                    <div className={styles.booster}>
                      <img src="assets/rocket24x24.png" />
                      +{(boost*100).toFixed(2)}%
                      </div>
                    <div className={styles.locked_time}>
                      <img src="assets/hourglass24x24.png" />
                      -{(reduce*100).toFixed(2)}%
                    </div>
                    {
                      currentTokenId === 0 && <a className={styles.remove} onClick={()=>{ setNftId(0) }}><img src="assets/remove16x16.png" /></a>
                    }
                    {
                      currentTokenId !== 0 && <a className={styles.reload} onClick={() => { setModal(1) }}><img src="assets/reload24x24.png" /></a>
                    }
                  </a>
                }

                <div className={styles.lp_management}>

                <a className={styles.back} onClick={()=>{setShowDeposit(false)}}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </a>

                  <a className={styles.approve} disabled={approved} onClick={()=>{
                    setTxWaiting(true);
                    approve(poolInfo.lpToken, chainId, web3, address).then(ret=>{
                      setTxWaiting(false);
                      setUpdateApprove(updateApprove + 1);
                      // console.debug('approve bt ret', ret);
                    }).catch(err=>{
                      setTxWaiting(false);
                      console.error('approve failed', err);
                    });
                  }}>
                    Approve
                    </a>

                  <a className={styles.validate} disabled={!approved} onClick={()=>{
                    setTxWaiting(true);
                    deposit(pid, '0x' + (new BigNumber(depositAmount)).multipliedBy(1e18).toString(16), lockDays*3600*24, nftId, chainId, web3, address).then(ret=>{
                      setTxWaiting(false);
                      // console.debug('deposit bt ret', ret);
                      setShowDeposit(false)
                    }).catch(err=>{
                      setTxWaiting(false);
                      console.error('deposit failed', err);
                    });
                  }}>
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
