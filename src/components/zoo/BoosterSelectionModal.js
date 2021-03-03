import { useState, useEffect } from 'react';
import styles from './BoosterSelectionModal.less';
import '../../../node_modules/animate.css/animate.min.css';
import React from 'react';

export default function BoosterSelectionModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const [modal, setModal] = useState(0);

  return (
    <React.Fragment>
   
    <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 600 }} className="modal-card animate__animated  animate__fadeInUp animate__faster">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          
        </section>
      </div>



    </div>
    </React.Fragment>
  )
}
