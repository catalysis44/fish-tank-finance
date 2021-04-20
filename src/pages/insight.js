import styles from './insight.less';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';



export default function (props) {
    return (
        <React.Fragment>
            <div className={styles.row}>
                <div className={styles.panel}>

                </div>
                <div className={styles.panel}>

                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.panel}>

                </div>
                <div className={styles.panel}>

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
                                    <div><img src="assets/rocket24x24.png"/> +55.55%</div>
                                    <div><img src="assets/hourglass24x24.png"/> -5.55%</div>
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
                                    <div><img src="assets/rocket24x24.png"/> +55.55%</div>
                                    <div><img src="assets/hourglass24x24.png"/> -5.55%</div>
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
                                    <div><img src="assets/rocket24x24.png"/> +55.55%</div>
                                    <div><img src="assets/hourglass24x24.png"/> -5.55%</div>
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
                                    <div><img src="assets/rocket24x24.png"/> +55.55%</div>
                                    <div><img src="assets/hourglass24x24.png"/> -5.55%</div>
                                </div>
                                <div className={`${styles.listview_col} ${styles.item_price}  ${styles.centered}`}>
                                    5,555.55$
                                </div>
                            </div>
                       
                        </div>
                    </div>


                </div>
            </div>
        </React.Fragment>
    );
}