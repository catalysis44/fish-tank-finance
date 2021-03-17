import { useState, useEffect } from 'react';
import styles from './ChestboxBuyModal.less';
import OpenChestboxModal from './OpenChestboxModal';
import '../../../node_modules/animate.css/animate.min.css';
import React, { useContext } from 'react';
import { WalletContext } from '../../wallet/Wallet';
import { NFT_FACTORY_ADDRESS, ZOO_TOKEN_ADDRESS } from '../../config';
import { approveExpedition, checkApproveExpedition, deposit, withdraw } from '../../wallet/send';
import BigNumber from 'bignumber.js';
import { commafy } from '../../utils';



export default function ChestboxBuyModal(props) {
  // Open Confirm Modal //
  const closeModal = () => {
    props.setModal(0);
  }
  const [modal, setModal] = useState(0);

  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;
  const [approved, setApproved] = useState(false);
  const [updateApprove, setUpdateApprove] = useState(0);
  const setTxWaiting = props.setTxWaiting;
  const type = props.type;
  const price = props.price;
  console.debug('price:', price);
  useEffect(()=>{
    if (!chainId || !address || !connected || !web3) {
      return;
    }
    console.debug('checkApproveExpedition begin', updateApprove);
    checkApproveExpedition(ZOO_TOKEN_ADDRESS[chainId], '0x'+(new BigNumber(price)).multipliedBy(1e18).toString(16), chainId, web3, address).then(ret=>{
      console.debug('checkApproveExpedition', ret);
      setApproved(ret);
    }).catch(err=>{
      console.error('checkApproveExpedition err', err);
    });
  }, [chainId, address, connected, price, web3, updateApprove]);


  return (
    <React.Fragment>
    <OpenChestboxModal isActived={modal} setModal={setModal} type={type}></OpenChestboxModal>
    <div className={`modal  ${props.isActived === 0 ? "" : "is-active"}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div style={{ maxWidth: 400 }} className="modal-card animate__animated  animate__fadeInUp animate__faster">
        <section className="modal-card-body">
          <a onClick={closeModal} className="close"><img src="assets/remove16x16.png" /></a>
          <div className={styles.description}>
            {
              props.type === 'golden' && <img src="assets/goldenbox48x48.png" /> 
            }
            {
              props.type === 'silver' && <img src="assets/silverbox48x48.png" /> 
            }
            
            <div>
              <div>{props.title}</div>
              <div>ZOO TO BURN : <span>{commafy(price)}</span></div>
            </div>
          </div>
          <div className={styles.rule}>
            <div>RULES</div>
            <span>{props.rules}</span>
            <a>MORE DETAILS ABOUT THE CHEST</a>
          </div>
          <div className={styles.action}>
            <a className={styles.action_btn} disabled={approved} onClick={()=>{
              setTxWaiting(true);
              approveExpedition(ZOO_TOKEN_ADDRESS[chainId], chainId, web3, address).then(ret=>{
                setTxWaiting(false);
                setUpdateApprove(updateApprove + 1);
                console.debug('approve bt ret', ret);
              }).catch(err=>{
                setTxWaiting(false);
                console.error('approve failed', err);
              });
            }} > {/* Can remove 1 button and it will expand 100% automatically*/}
              Approve
            </a>
            <a className={styles.action_btn} style={{display:'none'}}>
                  Validate
            </a>
          </div>
          <div className={styles.action}>
          <a className={styles.action_btn} disabled={!approved}  onClick={()=>{
              closeModal();
              setModal(1);
          }}>
                Buy & Open Chest
          </a>
          </div>
        </section>
      </div>



    </div>
    </React.Fragment>
  )
}
