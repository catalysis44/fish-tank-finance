import styles from './blackhole.less';
import React, { useCallback, useState } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faSortAlphaDown, faSortAmountUp, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { Slider, Checkbox, Row, Col, Pagination } from 'antd';
import { useEffect, useContext } from 'react';


export default function () {

  return (
    <React.Fragment>
     

        <div className={styles.content_wrapper}>
          <div className={styles.main_panel} style={{marginTop:40}}>
     
            <div className={styles.row}>
              <div style={{fontSize:22}}>Those items has been marked as FRAUDULENT and cannot be placed to the marketplace. To keep your Wallet clean, please burn those NFT with our Burn Machine, Thank you </div>
              <table>
                  <thead>
                      <th></th>
                      <th>ITEM NAME</th>
                      <th>ABILITIES</th>
                      <th>CATTEGORY</th>
                      <th></th>
                  </thead>
                    <tr>
                      <td><img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png"/></td>
                      <td>#24 - NFT Name</td>
                      <td>
                          <div>Boost: +24%</div>
                          <div>Time Reduce: -20%</div>
                      </td>
                      <td>
                          <img src="assets/category/fruits.png"/> Fruits
                      </td>
                      <td style={{textAlign:'right'}}><a>Burn!</a></td>
                  </tr>
                  <tr>
                      <td><img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png"/></td>
                      <td>#24 - NFT Name</td>
                      <td>
                          <div>Boost: +24%</div>
                          <div>Time Reduce: -20%</div>
                      </td>
                      <td>
                          <img src="assets/category/fruits.png"/> Fruits
                      </td>
                      <td style={{textAlign:'right'}}><a>Burn!</a></td>
                  </tr>
              </table>
            </div>

          </div>
        </div>

      
    </React.Fragment>
  );
}
