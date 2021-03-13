import styles from './index.less';

import { notification, Switch } from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';

import Pool from '../components/zoo/Pool';
export default function () {


  const openNotification = () => {
    const args = {
      message: 'Notification Title',
      description:
        <div>
          {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
          <br />
          {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
          <br />
          {"xxxxxx xxxxxxxx xxxxxxxxx "}
          <a href="" className="button">TX hash on Wanscan</a>
        </div>,
      duration: 0,
      placement: 'bottomRight',
      icon: <img src="assets/notification/bell.png" />,
    };
    notification.open(args);
  };
  const openNotification2 = () => {
    const args = {
      message: 'Notification Title',
      description:
        <div>
          {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
          <br />
          {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
          <br />
          {"xxxxxx xxxxxxxx xxxxxxxxx "}
          <a href="" className="button">TX hash on Wanscan</a>
        </div>,
      duration: 0,
      placement: 'bottomRight',
      icon: <img src="assets/notification/trophy.png" />,
    };
    notification.open(args);
  };
  const openNotification3 = () => {
    const args = {
      message: 'Notification Title',
      description:
        <div>
          {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
          <br />
          {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
          <br />
          {"xxxxxx xxxxxxxx xxxxxxxxx "}
          <a href="" className="button">TX hash on Wanscan</a>
        </div>,

      duration: 0,
      placement: 'bottomRight',
      icon: <img src="assets/notification/exclamation.png" />,
    };
    notification.open(args);
  };
  const openNotification4 = () => {
    const args = {
      message: 'GOLDEN CHEST HAS BEEN OPENED',
      description:
        <div>
          {"You got \" "}
          <b>Wasabi Ginger Sake</b>
          {"\", "}
          <br />
          {"your boost card has been transfered to your wallet "}
          <a href="" className="button">Check your collection</a>
        </div>,
      duration: 0,
      placement: 'bottomRight',
      icon: <img src="assets/notification/bottle.png" />,
      className: 'open-chestbox-notification',

    };
    notification.open(args);
  };
  //openNotification();
  //openNotification2();
  // openNotification3();
  //openNotification4();

  function toggleFilter()
    {
        document.getElementById('toggle_filter').classList.toggle("toggled");
        document.getElementById('filter1').classList.toggle("toggled");
        //document.getElementById('filter2').classList.toggle("toggled");
        document.getElementById('filterbar_backdrop').classList.toggle("toggled");
        
    }
    useEffect(()=>{
        toggleFilter();
    },[])

  return (
    <React.Fragment>
      <div id="filterbar_backdrop"  onClick={toggleFilter}></div>
      <a id="toggle_filter" className={styles.toggle_filter} onClick={toggleFilter}><span><img src="assets/magnify24x24.png"/> FILTER</span></a>
      <div className={styles.filter_row}>

        <div id="filter1" className={styles.box}>

          <div className={styles.sorting}>
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
              APY
            </a>
              <a>
                <div className={styles.icon}>
                  <div>A</div><div>Z</div>
                </div>
              Liquidity
            </a>
              <a>
                <div className={styles.icon}>
                  <div>A</div><div>Z</div>
                </div>
              Multtiplier
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
        <Pool />

      </div>
    </React.Fragment>
  );
}
