import styles from './expedition.less';
import React, { useContext } from 'react';
import { useState } from 'react';
import ChestboxBuyModal from '../components/expedition/ChestboxBuyModal';
import { StorageContext } from '../hooks';
import { commafy } from '../utils';
import { WalletContext } from '../wallet/Wallet';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import Loader from '../components/loader'
import BigNumber from 'bignumber.js';
import { useCountDown } from 'ahooks';
import { stakeClaim, stakeZoo } from '../wallet/send';


export default function (props) {
  const [txWaiting, setTxWaiting] = useState(false);


  const [showGoldenModal, setShowGoldenModal] = useState(0);
  const [showSilverModal, setShowSilverModal] = useState(0);

  const storage = useContext(StorageContext);
  const goldenPrice = storage.goldenPrice;
  const expeditions = storage.expeditions;
  // console.debug('expeditions1', expeditions);

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  const [countdown0, setTargetDate0, formattedRes0] = useCountDown({
    targetDate: new Date((expeditions[0].startTime + expeditions[0].lockTime) * 1000),
  });

  const [countdown1, setTargetDate1, formattedRes1] = useCountDown({
    targetDate: new Date((expeditions[1].startTime + expeditions[1].lockTime) * 1000),
  });

  const [countdown2, setTargetDate2, formattedRes2] = useCountDown({
    targetDate: new Date((expeditions[2].startTime + expeditions[2].lockTime) * 1000),
  });

  // console.debug('countdown0', countdown0, countdown1, countdown2);

  return (
    <React.Fragment>
      {
        txWaiting && <Loader />
      }
      {/* For Instant Chest - NFT / Artifact */}
      <ChestboxBuyModal isActived={showGoldenModal} setModal={setShowGoldenModal} title={'GOLD CHEST INSTANT BUY'} price={goldenPrice}
        rules={'Burn your Zoo and has a 100% chance of getting a random NFT collectible.'}
        type={'golden'}
        setTxWaiting={setTxWaiting}
        zooBalance={storage.zooBalance}
      ></ChestboxBuyModal>
      <ChestboxBuyModal isActived={showSilverModal} setModal={setShowSilverModal} title={'SILVER CHEST INSTANT BUY'} price={(new BigNumber(goldenPrice)).div(10)}
        rules={'Burn your Zoo and has a 10% chance of getting a non-rare random NFT collectible. If you miss 10 shots in a row, the next time‘s chance is 100%.'}
        type={'silver'}
        setTxWaiting={setTxWaiting}
        zooBalance={storage.zooBalance}
      ></ChestboxBuyModal>

      <div className={styles.row} style={{ paddingBottom: 0 }}>
        <div className={styles.pool} id="golden_pool"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desert.png" className={styles.cover} />

          </div>
          <div className={styles.title}>
            THE GOLDEN CHEST
          </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {commafy(storage.goldenPrice).split('.')[0]}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>INSTANT</span>

            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/goldenbox48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>
              <div>SPEND ZOO AND GET</div>
              <div>1 GOLDEN CHEST</div>
            </div>
          </div>

          <div className={styles.action_wrapper}>
            <a className={styles.action_btn} onClick={() => { setShowGoldenModal(1) }}>
              BUY GOLDEN CHEST
            </a>
          </div>

          <div className={styles.action_wrapper}> 
            <a className={styles.action_btn} disabled>
              Approve
            </a>
            <a className={styles.action_btn}>
              Validate
            </a>
          </div>

        </div>

        <div className={styles.pool} id="silver_pool">
          <div className={styles.cover_wrapper} >
            <img src="dummy/desert.png" className={styles.cover} />

          </div>
          <div className={styles.title}>
            THE SILVER CHEST
                    </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {commafy(storage.goldenPrice / 10).split('.')[0]}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>INSTANT</span>

            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/silverbox48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>

              <div>SPEND ZOO AND GET</div>
              <div>1 SILVER CHEST</div>

            </div>
          </div>
          <div className={styles.action_wrapper}>
            <a className={styles.action_btn} onClick={() => { setShowSilverModal(1) }}>
              BUY SILVER CHEST
                    </a>
          </div>
        </div>

      </div>

      <div className={styles.row} style={{ paddingTop: 0 }}>
        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desert.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                {commafy(expeditions[0] && expeditions[0].stakedAmount)}
              </div>
                ZOO LOCKED
            </div>
          </div>
          <div className={styles.title}>
            THE LOST ARK
          </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {commafy(goldenPrice * 10).split('.')[0]}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>48 Hours</span>

            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/artifact48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>
              <div>STAKE AND LOCK</div>
              <div>ZOO AND GET</div>
              <div>1 GOLDEN CHEST</div>

            </div>
          </div>
          <div className={styles.action_wrapper}>
            {
              expeditions[0] && expeditions[0].startTime === 0 && <a className={styles.action_btn} onClick={() => {
                setTxWaiting(true);
                stakeZoo(0, web3, chainId, address).then(ret => {
                  setTxWaiting(false);
                  console.log(ret);
                }).catch(err => {
                  console.log(err);
                  setTxWaiting(false);
                })
              }}>
                Stake ZOO
              </a>
            }
            {
              expeditions[0] && expeditions[0].startTime !== 0 && countdown0 <= 0 && <a className={styles.action_btn} onClick={() => {
                setTxWaiting(true);
                stakeClaim(0, web3, chainId, address).then(ret => {
                  setTxWaiting(false);
                  console.log(ret);
                }).catch(err => {
                  console.log(err);
                  setTxWaiting(false);
                })
              }}>
                Claim 1 Artifact
              </a>
            }
            {
              expeditions[0] && expeditions[0].startTime !== 0 && countdown0 > 0 && <a className={styles.action_btn}>
                {formattedRes0.days}:{formattedRes0.hours}:{formattedRes0.minutes}:{formattedRes0.seconds} Left
              </a>
            }
          </div>
        </div>

        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/cave.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                {commafy(expeditions[1] && expeditions[1].stakedAmount)}
              </div>
                ZOO LOCKED
            </div>
          </div>
          <div className={styles.title}>
            THE MIGHTY CAVE
          </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {commafy(goldenPrice).split('.')[0]}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>15 Days</span>
            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/goldenbox48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>
              <div>STAKE AND LOCK</div>
              <div>ZOO AND GET</div>
              <div>1 GOLDEN CHEST</div>

            </div>
          </div>
          <div className={styles.action_wrapper}>
            {
              expeditions[1] && expeditions[1].startTime === 0 && <a className={styles.action_btn} onClick={() => {
                setTxWaiting(true);
                stakeZoo(1, web3, chainId, address).then(ret => {
                  console.log(ret);
                  setTxWaiting(false);
                }).catch(err => {
                  console.log(err);
                  setTxWaiting(false);
                })
              }}>
                Stake ZOO
              </a>
            }
            {
              expeditions[1] && expeditions[1].startTime !== 0 && countdown1 <= 0 && <a className={styles.action_btn} onClick={() => {
                setTxWaiting(true);
                stakeClaim(1, web3, chainId, address).then(ret => {
                  setTxWaiting(false);
                  console.log(ret);
                }).catch(err => {
                  console.log(err);
                  setTxWaiting(false);
                })
              }}>
                Claim 1 Artifact
              </a>
            }
            {
              expeditions[1] && expeditions[1].startTime !== 0 && countdown1 > 0 && <a className={styles.action_btn}>
                {formattedRes1.days}:{formattedRes1.hours}:{formattedRes1.minutes}:{formattedRes1.seconds} Left
              </a>
            }
          </div>
        </div>

        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/jungle.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                {commafy(expeditions[2] && expeditions[2].stakedAmount)}
              </div>
              ZOO LOCKED
          </div>
          </div>
          <div className={styles.title}>
            THE SECRET JUNGLE
          </div>
          <div className={styles.condition}>
            <div className={styles.minimum}>
              <img src="assets/zoo32x32.png" />
              {commafy(goldenPrice / 2).split('.')[0]}
            </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>30 Days</span>
            </div>
          </div>

          <div className={styles.reward}>
            <div className={styles.type}>
              <img src="assets/goldenbox48x48.png" />
              <div className={styles.x}>×</div>
              <div className={styles.amount}>1</div>
            </div>
            <div className={styles.description}>
              <div>STAKE AND LOCK</div>
              <div>ZOO AND GET</div>
              <div>1 GOLDEN CHEST</div>

            </div>
          </div>
          <div className={styles.action_wrapper}>
          {
            expeditions[2] && expeditions[2].startTime === 0 && <a className={styles.action_btn} onClick={() => {
              setTxWaiting(true);
              stakeZoo(2, web3, chainId, address).then(ret => {
                console.log(ret);
                setTxWaiting(false);
              }).catch(err => {
                console.log(err);
                setTxWaiting(false);
              })
            }}>
              Stake ZOO
            </a>
          }
          {
            expeditions[2] && expeditions[2].startTime !== 0 && countdown2 <= 0 && <a className={styles.action_btn} onClick={() => {
              setTxWaiting(true);
              stakeClaim(2, web3, chainId, address).then(ret => {
                setTxWaiting(false);
                console.log(ret);
              }).catch(err => {
                console.log(err);
                setTxWaiting(false);
              })
            }}>
              Claim 1 Artifact
            </a>
          }
          {
            expeditions[2] && expeditions[2].startTime !== 0 && countdown2 > 0 && <a className={styles.action_btn}>
              {formattedRes2.days}:{formattedRes2.hours}:{formattedRes2.minutes}:{formattedRes2.seconds} Left
            </a>
          }
          </div>
        </div>

      </div>

    </React.Fragment>
  );
}
