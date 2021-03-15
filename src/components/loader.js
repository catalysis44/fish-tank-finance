
import styles from './loader.less';
import '../../node_modules/animate.css/animate.min.css';
import React from 'react';

export default function loader() {

  return (
    <React.Fragment>
      <div className={styles.loader_wrapper}>
        <img src="assets/zoo_logo.png" class="animate__animated animate__pulse animate__infinite"/>
        <div className={styles.caption} > {/*Change you text here */}
          Waiting TX Confirmation
        </div>
        <div className={styles.spinner}>
          <div className={styles.bounce1}>.</div>
          <div className={styles.bounce2}>.</div>
          <div className={styles.bounce3}>.</div>
        </div>
      </div>
    </React.Fragment>
  )
}
