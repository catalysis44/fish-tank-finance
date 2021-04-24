import styles from './insight.less';
import React, { useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Tooltip, Progress } from 'antd';
import { StorageContext } from '../hooks';
import { commafy } from '../utils';
import { getPrices } from '../hooks/price';
import BigNumber from 'bignumber.js';
import { useLanguage } from '../hooks/language';
import axios from 'axios';
import { WalletContext } from '../wallet/Wallet';
import { history } from 'umi';


export default function (props) {
  const t = useLanguage();
  const storage = useContext(StorageContext);
  const prices = getPrices();
  const expeditions = storage.expeditions;
  const zooPrice = prices['ZOO'];
  const blockNumber = storage.blockNumber;
  const endBlockNumber = 14174838 + 3600 / 5 * 24 * 365 * 2;
  const startBlockNumber = 14174838;
  let leftDays = endBlockNumber > blockNumber ? (endBlockNumber - blockNumber) * 5 / 3600 / 24 : 0;
  let startDays = (blockNumber - startBlockNumber) * 5 / 3600 / 24;

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;

  const expTvl = useMemo(() => {
    if (!zooPrice || !expeditions || expeditions.length === 0) {
      return new BigNumber(0);
    }
    let expeditionAmount = expeditions[0].stakedAmount.plus(expeditions[1].stakedAmount).plus(expeditions[2].stakedAmount);
    return expeditionAmount.multipliedBy(zooPrice);
  }, [zooPrice, expeditions]);

  const zooTvl = window.tvl && window.tvl.length > 0 ? window.tvl.reduce((pre, v, i) => {
    return Number(pre) + Number(v);
  }) : 0;

  useEffect(()=>{
    console.log('chainId', chainId);
    if (Number(expTvl) > 0 && Number(zooTvl) > 0 && Number(zooPrice) > 0 && Number(chainId) === 888) {
      axios.get('https://rpc.zookeeper.finance/api/v1/setTvl?tvl=' + (Number(expTvl) + Number(zooTvl))).then(ret=>{
        // console.debug(ret);
      }).catch(console.error);
    } else {
      history.push('/');
    }
  }, [expTvl, zooTvl, zooPrice, chainId])

  return (
    <React.Fragment>
      <div className={styles.row}>
        <div className={styles.panel_full} style={{ marginBottom: 20, padding: '10px 20px', marginTop: 0 }}>
          <div className={styles.price_mc_wrapper}>
            <div className={styles.price_wrapper}>
              <img src="assets/zoo_panel.png" />
              <div className={styles.details}>
                <div className={styles.title}>
                  {t("ZOO Price")}
                </div>
                <div className={styles.amount}>
                  ${commafy(zooPrice)}
                </div>
                <div className={styles.title}>
                  {t("Curculating supply")}: <span>{commafy(storage.zooTotalSupply).split('.')[0]} ZOO</span>
                </div>
              </div>
            </div>
            <div className={styles.mc_wrapper}>
              <img src="assets/MC.png" />
              <div className={styles.details}>
                <div className={styles.title}>
                  {t("Market Cap")}
                </div>
                <div className={styles.amount}>
                  ${commafy(storage && storage.zooTotalSupply * zooPrice).split('.')[0]}
                </div>
                <div className={styles.title}>
                  {t("Fully Diluted MC")}: <span>${commafy(storage.zooTotalSupply / startDays * 365 * 2 * zooPrice).split('.')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.panel}>
          <div className={styles.tvl_header}>
            <img src="assets/tvl.png" />
            <div className={styles.tvl_value}>
              ${commafy(Number(zooTvl) + Number(expTvl)).split('.')[0]}
              <div>Total value locked</div>
            </div>
          </div>
          <table className={styles.tvl_table}>
            <tr>
              <td>The Zoo</td>
              <td>${commafy(zooTvl).split('.')[0]}</td>
            </tr>
            <tr>
              <td>The Expedition</td>
              <td>${commafy(expTvl).split('.')[0]}</td>
            </tr>
            <tr>
              <td>The Safari</td>
              <td>${commafy()}</td>
            </tr>
            <tr>
              <td>The ZooRena</td>
              <td>${commafy()}</td>
            </tr>
            <tr>
              <td>NFT Value</td>
              <td>${commafy()}</td>
            </tr>
          </table>
        </div>
        <div className={`${styles.panel} ${styles.zoo_stat}`}>
          <div>
            <div className={styles.title} >
              Zoo Distribution End-in
            </div>
            <Progress status="active" percent={((365 * 2 - leftDays) * 100 / (365 * 2))} format={percent => `${leftDays.toFixed(0)} Days`} />
          </div>

          <div>
            <div className={styles.title}>
              Zoo Burning Rate
            </div>
            <div id="burning_bar">
              <Progress percent={(storage.zooBurned * 100 / (Number(storage.zooTotalSupply) + Number(storage.zooBurned))).toFixed(1)} />
            </div>
          </div>

          <div>
            <div className={styles.title}>
              Estimated Zoo Supply
            </div>

            <div className={styles.estimated_supply}>
              {commafy(storage.zooTotalSupply / startDays * 365 * 2).split('.')[0]} <span>~{commafy(storage.zooTotalSupply / startDays / 1000).split('.')[0]}K per days</span>
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
            <img src="assets/glasshour.png" />
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
          
               {/* Each Class of Item*/}
               <div className={styles.item_list}>
              <div className={styles.grade}>
                <img src="assets/grade/SR.png" /> SUPER RARE CLASS
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

             {/* Each Class of Item*/}
             <div className={styles.item_list}>
              <div className={styles.grade}>
                <img src="assets/grade/SSR.png" /> SUPER SUPER RARE CLASS
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
         

            {/* Each Class of Item*/}
            <div className={styles.item_list}>
              <div className={styles.grade}>
                <img src="assets/grade/UR.png" /> ULTRA RARE CLASS
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