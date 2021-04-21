import styles from './insight.less';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Tooltip, Progress } from 'antd';


export default function (props) {
    return (
        <React.Fragment>
            <div className={styles.row}>
                <div className={styles.panel}>
                    <div className={styles.tvl_header}>
                        <img src="assets/locked.png" />
                        <div className={styles.tvl_value}>
                            $550,000,000
                            <div>Total value locked</div>
                        </div>
                    </div>
                    <table className={styles.tvl_table}>
                        <tr>
                            <td>The Zoo TVL</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>The Expedition</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>The Safari</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>The ZooRena</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>NFT Value</td>
                            <td>$100,000,000.00</td>
                        </tr>
                    </table>
                </div>
                <div className={`${styles.panel} ${styles.zoo_stat}`}>
                    <div>
                        <div className={styles.title} >
                            Zoo Distribution End-in
                        </div>
                        <Progress percent={50} status="active" percent={2} format={percent => `750 Days`} />
                    </div>

                    <div>
                        <div className={styles.title}>
                            Zoo Burning Rate
                        </div>
                    
                        <div id="burning_bar">
                            <Progress percent={25} />
                        </div>
                    </div>

                    <div>
                        <div className={styles.title}>
                            Estimated Zoo Supply
                        </div>
                    
                        <div className={styles.estimated_supply}>
                            184,214,541.55 <span>~100K per days</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.panel}>
                    <div className={styles.chest_opened}>
                        <img src="assets/goldenbox42x42.png" />
                        <div className={styles.chest_opened_value}>
                            15,522
                            <div>Golden Chest opened</div>
                        </div>
                    </div>
                    <div className={styles.chest_opened}>
                        <img src="assets/silverbox42x42.png" />
                        <div className={styles.chest_opened_value}>
                            152,522
                            <div>Silver Chest opened</div>
                        </div>
                        <div className={styles.silver_daily}>
                            24.5%
                            <div>24 hrs Rate</div>
                        </div>
                    </div>
                    <div className={styles.price_title}>
                        Golden Chest Price
                    </div>
                    <div className={styles.chest_price_wrapper}>
                        <div className={styles.chest_price}>
                             +10.5%
                            <div>24 hrs</div>
                        </div>
                        <div className={styles.chest_price}>
                             -5.5%
                            <div>1 Week</div>
                        </div>
                       
                    </div>
                </div>

                <div className={styles.panel}>
                    <div className={styles.booster}>
                        <img src="assets/rocket.png" />
                        <div className={styles.booster_value}>
                            +30.55%
                            <div>Avarage Boosting Attached</div>
                        </div>
                    </div>
                    <div className={styles.booster}>
                        <img src="assets/glasshour.png"/>
                        <div className={styles.booster_value}>
                            -23.55%
                            <div>Avarage Time Reducing Attached</div>
                        </div>
                    </div>
                    <div className={styles.booster_sub_wrapper}>
                        <div className={styles.booster_sub}>
                            Total Booster
                            <div>222,555</div>
                        </div>
                        <div className={styles.booster_sub}>
                            Booster Holders
                            <div>2,555</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.panel_full}>
                    <div className={styles.item_category_tab}>
                        <a className={`${styles.category} ${styles.is_active}`}>
                            <img src="assets/category/fruits.png" />
                                Fruits
                            </a>
                        <a className={styles.category}>
                            <img src="assets/category/dishes.png" />
                                Foods
                            </a>
                        <a className={styles.category}>
                            <img src="assets/category/sweets.png" />
                                Sweets
                            </a>
                        <a className={styles.category}>
                            <img src="assets/category/potions.png" />
                                Potions
                            </a>
                        <a className={styles.category}>
                            <img src="assets/category/spices.png" />
                                Spices
                            </a>
                        <a className={styles.category}>
                            <img src="assets/category/magic.png" />
                                Magic
                            </a>
                    </div>

                    {/* Each Class of Item*/}
                    <div className={styles.item_list_wrapper}>
                        <div className={styles.item_list}>
                            <div className={styles.grade}>
                                <img src="assets/grade/N.png" /> NORMAL CLASS
                                </div>
                            <div className={styles.listview_table}>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.header}`}>

                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        BOOSTER NAME
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        LEVEL
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        SUPPLY
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        INIT. ABILITIES
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}  ${styles.centered}`}>
                                        LASTEST SOLD
                                    </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Ancient_Apple_of_Lore.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Ancient Apple of Lore
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price} ${styles.centered}`}>
                                        5,555.55$
                                    </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="assets/locked.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Unidentified Object
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        --
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> --%</div>
                                        <div><img src="assets/hourglass24x24.png" /> --%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        --$
                                    </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Honeysuckle_Apple_Sauce.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Honeysuckle Apple Sauce
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        5,555.55$
                                    </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Golden Apple of Destiny
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/max.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        5,555.55$
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Each Class of Item*/}
                        <div className={styles.item_list}>
                            <div className={styles.grade}>
                                <img src="assets/grade/R.png" /> RARE CLASS
                            </div>
                            <div className={styles.listview_table}>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.header}`}>

                                    </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        BOOSTER NAME
                                </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        LEVEL
                                </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        SUPPLY
                                </div>
                                    <div className={`${styles.listview_col} ${styles.header}`}>
                                        INIT. ABILITIES
                                </div>
                                    <div className={`${styles.listview_col} ${styles.header}  ${styles.centered}`}>
                                        LASTEST SOLD
                                </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Ancient_Apple_of_Lore.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Ancient Apple of Lore
                                </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price} ${styles.centered}`}>
                                        5,555.55$
                                </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Tea-Smoked_Apple_Juice.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Tea-Smoked Apple Juice
                                </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        5,555.55$
                                </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Honeysuckle_Apple_Sauce.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Honeysuckle Apple Sauce
                                </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/star18x18.png" /><img src="assets/star18x18.png" /><img src="assets/star18x18.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        5,555.55$
                                </div>
                                </div>
                                <div className={styles.listview_row}>
                                    <div className={`${styles.listview_col} ${styles.item_image}`}>
                                        <img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_name}`}>
                                        Golden Apple of Destiny
                                </div>

                                    <div className={`${styles.listview_col} ${styles.item_stars}`}>
                                        <img src="assets/max.png" />
                                    </div>

                                    <div className={`${styles.listview_col} ${styles.item_supply}`}>
                                        5,555
                                </div>
                                    <div className={`${styles.listview_col} ${styles.item_abilities}`}>
                                        <div><img src="assets/rocket24x24.png" /> +55.55%</div>
                                        <div><img src="assets/hourglass24x24.png" /> -5.55%</div>
                                    </div>
                                    <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                        5,555.55$
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}