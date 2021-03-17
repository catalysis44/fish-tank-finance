import styles from './expedition.less';
import React, { useContext } from 'react';
import { useState } from 'react';
import ChestboxBuyModal from '../components/expedition/ChestboxBuyModal';
import { StorageContext } from '../hooks';
import { commafy } from '../utils';
import { WalletContext } from '../wallet/Wallet';


export default function () {
  const [modal, setModal] = useState(0);

  const [showGoldenModal, setShowGoldenModal] = useState(0);
  const [showSilverModal, setShowSilverModal] = useState(0);

  const storage = useContext(StorageContext);

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  return (
    <React.Fragment>

      {/* For Instant Chest - NFT / Artifact */}
      <ChestboxBuyModal isActived={showGoldenModal} setModal={setShowGoldenModal} title={'GOLD CHEST INSTANT BUY'} price={commafy(storage.goldenPrice)}
        rules={'Burn your Zoo and has a 100% chance of getting a random NFT collectible.'}
        type={'golden'}
        ></ChestboxBuyModal>
      <ChestboxBuyModal isActived={showSilverModal} setModal={setShowSilverModal} title={'SILVER CHEST INSTANT BUY'} price={commafy(storage.goldenPrice / 10)}
        rules={'Burn your Zoo and has a 10% chance of getting a non-rare random NFT collectible. If you miss 10 shots in a row, the next time‘s chance is 100%.'}
        type={'silver'}
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
              {commafy(storage.goldenPrice)}
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
          
          <a className={styles.action_btn} onClick={() => { setShowGoldenModal(1) }}>
            BUY GOLDEN CHEST
          </a>

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
              {commafy(storage.goldenPrice / 10)}
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
          <a className={styles.action_btn} onClick={() => { setShowSilverModal(1) }}>
            BUY SILVER CHEST
                    </a>

        </div>

      </div>

      <div className={styles.row} style={{ paddingTop: 0 }}>
        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/desert.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555,555.00
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
                            25,000
                        </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>72 Hours</span>

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
          <a className={styles.action_btn}>
            Stake ZOO
                    </a>
          <a className={styles.action_btn} style={{ display: 'none' }}>
            Claim 1 Artifact
                    </a>
          <a className={styles.pending_btn} style={{ display: 'none' }}>
            35:45:15 Left
                    </a>
        </div>

        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/cave.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555,555.00
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
                            25,000
                        </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>72 Hours</span>

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
          <a className={styles.action_btn} style={{ display: 'none' }}>
            Stake ZOO
                    </a>
          <a className={styles.action_btn}>
            Claim 1 Golden Chest
                    </a>
          <a className={styles.pending_btn} style={{ display: 'none' }}>
            35:45:15 Left
                    </a>
        </div>

        <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
          <div className={styles.cover_wrapper} >
            <img src="dummy/jungle.png" className={styles.cover} />
            <div className={styles.tvl}>
              <div className={styles.amount}>
                555,555,555.00
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
                            25,000
                        </div>
            <div className={styles.hour}>
              <img src="assets/hourglass24x24.png" />
              <span>72 Hours</span>

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
          <a className={styles.action_btn} style={{ display: 'none' }}>
            Stake ZOO
                    </a>
          <a className={styles.action_btn} style={{ display: 'none' }}>
            Claim 1 Golden Chest
                    </a>
          <a className={styles.pending_btn}>
            35:45:15 Left
                    </a>
        </div>

      </div>

    </React.Fragment>
  );
}
