import { useState, useEffect } from 'react';
import styles from './AdsModal.less';

import '../../../node_modules/animate.css/animate.min.css';
import React, { useContext } from 'react';


export default function ChestboxBuyModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const [modal, setModal] = useState(0);
  
  return (
    <React.Fragment>
   <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 800 }} className="modal-card animate__animated  animate__fadeInUp animate__faster">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <img src="ads/dual_farming_starts.jpg"/>
        </section>
      </div>
    </div>
    </React.Fragment>
  )
}
