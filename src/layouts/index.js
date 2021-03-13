import styles from './index.less';
import "../styles/bulma.scss"
import '../../node_modules/animate.css/animate.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';
import { NavLink } from 'umi';
import Wallet, { WalletContext } from '../wallet/Wallet';
import { useState } from 'react';
import { useDataPump, initialState, StorageContext } from '../hooks';
import { commafy } from '../utils';
import { useLocalStorageState } from 'ahooks';



function toggleSidebar()
{
  document.getElementById('wrapper').classList.toggle("toggled");
}

function BasicLayout(props) {
  const [wallet, setWallet] = useState({});
  const web3 = wallet.web3;
  const chainId = wallet.networkId && wallet.networkId.toString();
  const address = wallet.address;
  const connected = wallet.connected;
  const provider = wallet.provider;
  
  const [storage, setStorage] = useLocalStorageState('zoo-keeper-v0.1', initialState);

  useDataPump(storage, setStorage, chainId, address, connected);

  return (
    <div id="wrapper">
      <Wallet wallet={wallet} setWallet={setWallet} />
      <div id="sidebar_backdrop" onClick={toggleSidebar}></div>
      <a id="menu_toggle" onClick={toggleSidebar}>›</a>
      <div id="sidebar_wrapper">
        
        <div id="sidebar_heading"><img src="assets/zoo_logo.png"/></div>
        
        <div id="wallet_connection" data-connected={connected ? "true" : "false"}> {/*data-connected="true" when connected*/}
          <a class="connect_disconnect_btn" onClick={()=>{
            if (!connected) {
              wallet.connect();
            } else {
              wallet.resetApp();
            }
          }}>{connected ? "DISCONNECT" : "CONNECT WALLET"}</a> 
          <div class="address"><img src="assets/wallet32x32.png"/><span>{address ? address.slice(0, 6) + '...' + address.slice(-6) : 'NO WALLET'}</span></div>
          {chainId !== 1 && chainId !== 888 && chainId !== "" && <div class="testnet"><span>!! TESTNET !!</span></div>}
          <div class="balance"><img src="assets/zoo32x32.png"/><span>{commafy(storage.zooBalance)}</span></div>
        </div>
        

        <div class="horizontal_line">
          
        </div>

        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><NavLink  to="/" activeClassName="is_active"  exact={true}><img src="assets/sidebar/zoo.png"/> <div>The Zoo</div></NavLink></li>
              <li><NavLink  to="/expedition" activeClassName="is_active"><img src="assets/sidebar/expedition.png"/> <div>The Expedition</div></NavLink></li>
              <li><NavLink  to="/market" activeClassName="is_active"><img src="assets/sidebar/market.png"/> <div>The Market</div></NavLink></li>
              <li><NavLink  to="/safe" activeClassName="is_active"><img src="assets/sidebar/safe.png"/> <div>My Safe</div></NavLink></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/stake.png"/> <div>Stake Zoo</div></a></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/lotto.png"/> <div>Lotto</div></a></li>
            </ul>
            
          </aside>
        </div>

        <div className={styles.footer}>
            <div id="zoo_info_burned">
              <div className={styles.box}>
                  <img src="assets/zoo32x32.png" class={styles.zoo_icon}/>
                  <div class={styles.detail}>
                      <div>1 ZOO = <span>$10.32</span></div>
                      <div>MC <span>$41,548,555.22</span></div>
                      <div>Current supply</div>
                      <div><span>154,456,25 ZOO</span></div>
                  </div>
                
              </div>
              
              <div className={styles.box}>
                  <img src="assets/burned42x42.png" class={styles.burn_icon}/>
                  <div class={styles.detail}>
                      <div>TOTAL BURNED</div>
                      <div><span className={styles.burned}>55,012,345.56 ZOO</span></div>
                  </div>
              </div>
            </div>
            <div className={styles.ext_link}>
              <a href="#" target="_blank">FAQ</a>
              <a href="#" target="_blank">Documentation</a>
            </div>
            <div>
              <div className={styles.social}>
                <a href="#" target="_blank"><img src="assets/social/twitter.svg"/></a>
                <a href="#" target="_blank"><img src="assets/social/telegram.svg"/></a>
                <a href="#" target="_blank"><img src="assets/social/medium.svg"/></a>
                <a href="https://github.com/zooFarming/" target="_blank"><img src="assets/social/github.svg"/></a>
              </div>
              <div className={styles.credit}>
                ©The Wanilla {new Date().getFullYear()} / Powered by <a href="https://www.wanchain.org" target="_blank">WANCHAIN</a>
              </div>
            </div>
      </div>


      </div>

      <StorageContext.Provider value={storage} >
        <WalletContext.Provider value={wallet} >
          <div id="page_content_wrapper">
            {props.children}
          </div>
        </WalletContext.Provider>
      </StorageContext.Provider>
    </div>
  );
}

export default BasicLayout;

