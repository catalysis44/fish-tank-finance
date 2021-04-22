import { useState, useEffect } from 'react';
import styles from './Blackhole.less';
import '../../node_modules/animate.css/animate.min.css';
import React, { useContext } from 'react';
import { useLanguage } from '../hooks/language';
import { sendNft } from '../wallet/send';



export default function Blackhole(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const [modal, setModal] = useState(0);
  const t = useLanguage();
  const cards = props.cards;
  const wallet = props.wallet;
  const web3 = wallet.web3;
  const chainId = wallet.networkId && wallet.networkId.toString();
  const address = wallet.address;

  return (
    <React.Fragment>
      <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div style={{ maxWidth: 800 }} className="modal-card animate__animated  animate__fadeInUp animate__faster">
          <section className="modal-card-body">
            <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
            <div className={styles.blackhole}>
              <div className={styles.row}>
                <div style={{ fontSize: 22 }}>{t("Those items has been marked as FRAUDULENT and cannot be placed to the marketplace. To keep your Wallet clean, please burn those NFT with our Burn Machine, Thank you")} </div>
                <table>
                  <thead>
                    <th>{t("ITEM NAME")}</th>
                    <th>{t("ACTION")}</th>
                    <th></th>
                  </thead>
                  {
                    cards && cards.map(v => {
                      return <tr>
                        <td>#{v.tokenId} - {v.uri.replace('https://zoo-factory.vercel.app/zoo_keeper_metadata_v1/', '').replace('.json', '')}</td>
                        <td style={{ textAlign: 'right' }}><a onClick={() => {
                          sendNft(v.tokenId, chainId, web3, address, '0xF000000000000000000000000000000000000000').then(ret=>{
                            console.log('success');
                          }).catch(err=>{
                            console.error(err);
                          })
                        }}>{t("Burn")}!</a></td>
                      </tr>
                    })
                  }

                </table>
              </div>
              <div style={{ marginTop: 20, fontSize: 18 }}>
                {t("After burned these items. Please contact us directly on Telegram")}:<br />
                <a href="https://t.me/genshimaro">@genshimaro</a><br />
                <a href="https://t.me/cryptofennec">@cryptofennec</a><br />

              </div>
            </div>

          </section>
        </div>



      </div>
    </React.Fragment>
  )
}
