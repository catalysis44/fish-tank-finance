import styles from './index.less';

import { notification, Switch } from 'antd';
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown,faSortAmountUp,faSortNumericDown,faSortNumericUp } from '@fortawesome/free-solid-svg-icons';

import Pool from '../components/zoo/Pool';
import Loader from '../components/loader'
import { StorageContext } from '../hooks';

export default function () {
  const [txWaiting, setTxWaiting] = useState(false);

  // openNotification();
  // openNotification2();
  // openNotification3();
  // openNotification4();

  function toggleFilter() {
    document.getElementById('toggle_filter').classList.toggle("toggled");
    document.getElementById('filter1').classList.toggle("toggled");
    //document.getElementById('filter2').classList.toggle("toggled");
    document.getElementById('filterbar_backdrop').classList.toggle("toggled");

  }

  const storage = useContext(StorageContext);


  return (
    <React.Fragment>
      {
        txWaiting && <Loader/>
      }
      <div id="filterbar_backdrop" onClick={toggleFilter}></div>
      <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png" /> FILTER</span></a>
      <div className={styles.filter_row}>

        <div id="filter1" className={styles.box}>

          <div className={styles.sorting}>
            <div className={styles.title}>
              Sort by
            </div>
            <div className={styles.sort_btn}>
              <a className={styles.is_acitve}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faSortAlphaDown} />
                </div>
              Name
            </a>
              <a>
                <div className={styles.icon}>
                <FontAwesomeIcon icon={faSortNumericDown} />
                </div>
              APY
            </a>
              <a>
                <div className={styles.icon}>
                <FontAwesomeIcon icon={faSortNumericDown} />
                </div>
              Liquidity
            </a>
              <a>
                <div className={styles.icon}>
                <FontAwesomeIcon icon={faSortNumericDown} />
                </div>
              Multiplier
              </a>
            </div>
          </div>
          <div className={styles.view_selection}>
            <div className={styles.title}>
              View only
              </div>
            <div className={styles.view_btn}>
              <a>Staked</a>
              <a className={styles.is_acitve}>Active</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        {
          // storage.poolInfo.length === 0 && <div>Loading...</div>
        }
        {
          storage.poolInfo.map((v, i)=>{
            return <Pool poolInfo={v} pid={i} key={i} setTxWaiting={setTxWaiting} farmingInfo={storage.farmingInfo}/>
          })
        }

      </div>
    </React.Fragment>
  );
}
