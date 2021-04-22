import { useState, useEffect } from 'react';
import styles from './Blackhole.less';
import '../../node_modules/animate.css/animate.min.css';
import React, { useContext } from 'react';



export default function Blackhole(props) {
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
        <div className={styles.blackhole}>
              <div className={styles.row}>
              <div style={{ fontSize: 22 }}>Those items has been marked as FRAUDULENT and cannot be placed to the marketplace. To keep your Wallet clean, please burn those NFT with our Burn Machine, Thank you </div>
              <table>
                <thead>
                  <th></th>
                  <th>ITEM NAME</th>
                  <th>ABILITIES</th>
                  <th>CATTEGORY</th>
                  <th></th>
                </thead>
                <tr>
                  <td><img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png" /></td>
                  <td>#24 - NFT Name</td>
                  <td>
                    <div>Boost: +24%</div>
                    <div>Time Reduce: -20%</div>
                  </td>
                  <td>
                    <img src="assets/category/fruits.png" /> Fruits
                            </td>
                  <td style={{ textAlign: 'right' }}><a>Burn!</a></td>
                </tr>
                <tr>
                  <td><img src="zoo_keeper_icons_v1/Golden_Apple_of_Destiny.png" /></td>
                  <td>#24 - NFT Name</td>
                  <td>
                    <div>Boost: +24%</div>
                    <div>Time Reduce: -20%</div>
                  </td>
                  <td>
                    <img src="assets/category/fruits.png" /> Fruits
                            </td>
                  <td style={{ textAlign: 'right' }}><a>Burn!</a></td>
                </tr>
              </table>
            </div>
            <div style={{marginTop:20,fontSize:18}}>
                After burned these items. Please contact us directly on Telegram:<br/>
                    <a href="https://t.me/genshimaro">@genshimaro</a><br/>
                    <a href="https://t.me/cryptofennec">@cryptofennec</a><br/>
                    
                </div>
            </div>

        </section>
      </div>



    </div>
    </React.Fragment>
  )
}
