import styles from './expedition.less';
import React from 'react';
export default function () {
    return (
        <React.Fragment>
            {/* For Instant Chest - NFT / Artifact */}
            <div className={styles.row}>

            </div>
            <div className={styles.row}>
                <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
                    <div className={styles.cover_wrapper} >
                        <img src="dummy/desert.png" className={styles.cover} />
                        <div  className={styles.tvl}>
                            <div  className={styles.amount}>
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
                            <div>1 GOLDENCHEST</div>
                            
                        </div>
                    </div>
                    <a className={styles.action_btn}>
                        Stake ZOO
                    </a>
                    <a className={styles.action_btn} style={{display:'none'}}>
                        Claim 1 Artifact
                    </a>
                    <a className={styles.pending_btn} style={{display:'none'}}>
                        35:45:15 Left
                    </a>
                </div>

                <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
                    <div className={styles.cover_wrapper} >
                        <img src="dummy/cave.png" className={styles.cover} />
                        <div  className={styles.tvl}>
                            <div  className={styles.amount}>
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
                            <div>1 GOLDENCHEST</div>
                            
                        </div>
                    </div>
                    <a className={styles.action_btn} style={{display:'none'}}>
                        Stake ZOO
                    </a>
                    <a className={styles.action_btn}>
                        Claim 1 Golden Chest
                    </a>
                    <a className={styles.pending_btn} style={{display:'none'}}>
                        35:45:15 Left
                    </a>
                </div>

                <div className={styles.pool} data-active="true"> {/*active true for on staking pool */}
                    <div className={styles.cover_wrapper} >
                        <img src="dummy/jungle.png" className={styles.cover} />
                        <div  className={styles.tvl}>
                            <div  className={styles.amount}>
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
                            <div>1 GOLDENCHEST</div>
                            
                        </div>
                    </div>
                    <a className={styles.action_btn} style={{display:'none'}}>
                        Stake ZOO
                    </a>
                    <a className={styles.action_btn} style={{display:'none'}}>
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
