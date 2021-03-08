import styles from './market.less';
import React from 'react';
import '../../node_modules/animate.css/animate.min.css';
export default function () {
    return (
        <React.Fragment>

            <div className={styles.content_wrapper}>
                <div className={styles.filter_panel}>
                    <div className={styles.title}>
                        Filter (0)
                </div>
                </div>
                <div className={styles.main_panel}>
                    <div className={styles.filter_row}>

                        <div className={styles.box}>
                            <div className={styles.title}>
                                Sort by
                </div>
                            <div className={styles.sort_btn}>
                                <a className={styles.is_acitve}>
                                    <div className={styles.icon}>
                                        <div>A</div><div>Z</div>
                                    </div>
                    Name
                    </a>
                                <a>
                                    <div className={styles.icon}>
                                        <div>A</div><div>Z</div>
                                    </div>
                    Total supply
                    </a>
                                <a>
                                    <div className={styles.icon}>
                                        <div>A</div><div>Z</div>
                                    </div>
                    Price
                    </a>
                                <a>
                                    <div className={styles.icon}>
                                        <div>A</div><div>Z</div>
                                    </div>
                    Boost reward
                    </a>
                                <a>
                                    <div className={styles.icon}>
                                        <div>A</div><div>Z</div>
                                    </div>
                    Time reducer
                    </a>
                            </div>

                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.flip_card}>
                            <div className={styles.flip_card_inner}>
                                <div className={styles.flip_card_front} data-is-max="true"> {/* data-is-max="true" if this is max item */}
                                    <div className={styles.item_title}>
                                        <img src="assets/lemon64x64.png" />
                                        <div className={styles.title}>
                                            Lemon of Bunbury
                                        <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.total_supply}>
                                        <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.description}>
                                            <span><img src="assets/apple24x24.png" /> Potions</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span>Card #</span>
                                        555,555,555
                                    </div>
                                        <div className={styles.price}>
                                            <img src="assets/currency/zoo.png" />
                                            <div>
                                                1,535,350
                                            <span>ZOO</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.flip_card_back}>
                                    <div className={styles.title}>
                                        <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <a className={styles.buy_btn}>
                                        Buy for 1,535,350 ZOO
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flip_card}>
                            <div className={styles.flip_card_inner}>
                                <div className={styles.flip_card_front} data-is-max="true"> {/* data-is-max="true" if this is max item */}
                                    <div className={styles.item_title}>
                                        <img src="assets/lemon64x64.png" />
                                        <div className={styles.title}>
                                            Lemon of Bunbury
                                        <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.total_supply}>
                                        <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.description}>
                                            <span><img src="assets/apple24x24.png" /> Potions</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span>Card #</span>
                                        555,555,555
                                    </div>
                                        <div className={styles.price}>
                                            <img src="assets/currency/zoo.png" />
                                            <div>
                                                1,535,350
                                            <span>ZOO</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.flip_card_back}>
                                    <div className={styles.title}>
                                        <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <a className={styles.buy_btn}>
                                        Buy for 1,535,350 ZOO
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flip_card}>
                            <div className={styles.flip_card_inner}>
                                <div className={styles.flip_card_front} data-is-max="true"> {/* data-is-max="true" if this is max item */}
                                    <div className={styles.item_title}>
                                        <img src="assets/lemon64x64.png" />
                                        <div className={styles.title}>
                                            Lemon of Bunbury
                                        <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.total_supply}>
                                        <img src="assets/gem/common18x18.png" /> Total Supply : 100
                                </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.description}>
                                            <span><img src="assets/apple24x24.png" /> Potions</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span>Card #</span>
                                        555,555,555
                                    </div>
                                        <div className={styles.price}>
                                            <img src="assets/currency/zoo.png" />
                                            <div>
                                                1,535,350
                                            <span>ZOO</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.flip_card_back}>
                                    <div className={styles.title}>
                                        <img src="assets/lemon64x64.png" />
                                        Lemon of Bunbury
                                    </div>
                                    <div className={styles.item_description}>
                                        <div className={styles.description}>
                                            <div>
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                                <img src="assets/star18x18.png" />
                                            </div>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
                                        </div>
                                        <div className={styles.description}>
                                            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
                                        </div>
                                    </div>
                                    <a className={styles.buy_btn}>
                                        Buy for 1,535,350 ZOO
                                    </a>
                                </div>
                            </div>
                        </div>




                    </div>

                    


                </div>
            </div>


        </React.Fragment>
    );
}
