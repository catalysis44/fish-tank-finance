import { useState, useEffect } from 'react';
import styles from './OpenChestboxModal.less';
import '../../../node_modules/animate.css/animate.min.css';
import { history } from 'umi';
import {categorys, categoryIcons} from '../../config';

export default function OpenChestboxModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  // console.debug('category:', props);


  return (
    <div id="OpenChestBoxModal" className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 246 }} className="modal-card animate__animated  animate__jackInTheBox animate__fast">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.header}>
            <div className={styles.star}>
              {
                Number(props.level) < 4 && Array.from({length: props.level}).map(v=>{
                  return <img src="assets/star18x18.png" />
                })
              }
              {
                Number(props.level) === 4 && <img src="assets/max.png" />
              }
            </div>
            <div className={styles.title}>
              {props.name}
            </div>
            <div className={styles.supply}>
              <img src="assets/grade/N.png" /> total supply: {props.itemSupply}
            </div>
          </div>

          <div className={styles.item_wrapper}>
            <div className={styles.item}>
              <img src={props.icon} className={styles.float_item}/>
              <img src="assets/openedGoldenBox80x80.png" className={styles.openedBox}/>
            </div>
            <div  className={styles.item_description}>
              <div className={styles.description}>
                <span>Card #</span>
                {props.tokenId}
              </div>
              <div className={styles.description}>
                <span><img src={categoryIcons[props.category-1]}/>{categorys[props.category-1]}</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/rocket24x24.png"/> +{(props.boost * 100).toFixed(2)}%</span>
              </div>
              <div className={styles.description} style={{background:'#e1e5da'}}>
                <span><img src="assets/hourglass24x24.png" style={{height:20}}/> -{(props.reduce * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className={styles.horizontal_line}></div>
          <div className={styles.rule}>
            <div>{props.type.toUpperCase()} CHEST HAS BEEN OPENED</div>
            <span>You got "<a>{props.name}</a>",
          your boost card has been transfered
          to you wallet</span>
          </div>

          <div className={styles.action}>
            <a className={styles.action_btn} onClick={()=>{
              history.push('/safe');
            }}>
              Check your Safe
              </a>
          </div>
        </section>
      </div>
    </div>
  )
}
