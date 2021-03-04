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
          <div className={styles.filter_panel}>
            
                <div className={styles.title}>
                    Sort by
                </div>
                <div className={styles.sort_btn}>
                    <a className={styles.is_acitve}>
                    <div className={styles.icon}>
                        <div>A</div><div>Z</div>
                    </div>
                     Boost Reward
                    </a>
                    <a>
                    <div className={styles.icon}>
                        <div>A</div><div>Z</div>
                    </div>
                    Time reducer
                    </a>
                    
                </div>

            
          </div>
          <div className={styles.booster_panel}>
            <div className={styles.booster_table}>


              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>



              <div className={styles.booster_row}>
                <div className={`${styles.booster_col} ${styles.star}`}>
                   <div className={styles.booster_subcol}>
                  <img src="assets/star18x18.png"/><img src="assets/star18x18.png"/><img src="assets/star18x18.png"/>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.title}`}>
                  <div className={styles.booster_subcol}>
                    <img src="assets/apple24x24.png"/> <div>Sugarspinned Strawberry Pie</div>
                  </div>
                </div>
                <div className={`${styles.booster_col} ${styles.stat_action}`}>
                  <div className={styles.booster_subcol}>
                    <div className={styles.stat}><span><img src="assets/rocket24x24.png"/>+5.15%</span></div>
                    <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{width:20}}/>-25.12%</span></div>
                    <a>Attach</a>
                  </div>
                </div>
               
              </div>

              

              


        
              </div>
          </div>
        </section>
      </div>



    </div>
    </React.Fragment>
  )
}
