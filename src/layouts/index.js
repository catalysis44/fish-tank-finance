import styles from './index.less';
import "../styles/bulma.scss"
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';
import { NavLink, setLocale, getLocale } from 'umi';
import Wallet, { WalletContext } from '../wallet/Wallet';
import { useState } from 'react';
import { useDataPump, initialState, StorageContext } from '../hooks';
import { commafy } from '../utils';
import { useLocalStorageState } from 'ahooks';
import BigNumber from 'bignumber.js';
import { getPrices } from '../hooks/price';
import { useLanguage } from '../hooks/language';


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
  const [loading, setLoading] = useState(false);
  
  const [storage, setStorage] = useLocalStorageState('zoo-keeper-' + address + '-' + chainId, initialState);

  useDataPump(storage, setStorage, chainId, address, connected);

  const prices = getPrices();
  // console.debug('chainId', chainId);

  const t = useLanguage();

  const zooPrice = prices['ZOO'];
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
          }}>{connected ? t("DISCONNECT") : t("CONNECT WALLET")}</a> 
          <div class="address"><img src="assets/wallet32x32.png"/><span>{address ? address.slice(0, 6) + '...' + address.slice(-6) : t('NO WALLET')}</span></div>
          {chainId && chainId.toString() !== '1' && chainId.toString() !== '888' && chainId !== "" && <div class="testnet"><span>!! {t('TESTNET')} !!</span></div>}
          <div class="balance"><img src="assets/zoo32x32.png"/><span>{commafy(storage.zooBalance)}</span></div>
        </div>
        

        <div class="horizontal_line">
          
        </div>

        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><NavLink  to="/" activeClassName="is_active"  exact={true}><img src="assets/sidebar/zoo.png"/> <div>{t("The Zoo")}</div></NavLink></li>
              <li><NavLink  to="/expedition" activeClassName="is_active"><img src="assets/sidebar/expedition.png"/> <div>{t("The Expedition")}</div></NavLink></li>
              <li><NavLink  to="/market" activeClassName="is_active"><img src="assets/sidebar/market.png"/> <div>{t("The Market")}</div></NavLink></li>
              <li><NavLink  to="/safe" activeClassName="is_active"><img src="assets/sidebar/safe.png"/> <div>{t("My Safe")}</div></NavLink></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/stake.png"/> <div>{t("Stake Zoo")}</div></a></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/lotto.png"/> <div>{t("Lotto")}</div></a></li>
            </ul>
            
          </aside>
        </div>

        <div className={styles.footer}>
            <div id="zoo_info_burned">
              <div className={styles.box}>
                  <img src="assets/zoo32x32.png" class={styles.zoo_icon}/>
                  <div class={styles.detail}>
                      <div>1 ZOO = <span>${commafy(zooPrice)}</span></div>
                      <div>{t("MC")} <span>${commafy((new BigNumber(storage.zooTotalSupply)).minus(storage.zooBurned).multipliedBy(zooPrice))}</span></div>
                      <div>{t("Current supply")}</div>
                      <div><span>{commafy(storage.zooTotalSupply)} ZOO</span></div>
                  </div>
                
              </div>
              
              <div className={styles.box}>
                  <img src="assets/burn.png" class={styles.burn_icon}/>
                  <div class={styles.detail}>
                      <div>{t("TOTAL BURNED")}</div>
                      <div><span className={styles.burned}>{commafy(storage.zooBurned)} ZOO</span></div>
                  </div>
              </div>
            </div>
            <div className={styles.ext_link}>
              <a href="#" target="_blank">{t("FAQ")}</a>
              <a href="#" target="_blank">{t("Documentation")}</a>
              <a target="_blank" onClick={()=>{
                window.localStorage.clear();
                window.location.reload();
              }}>{t("Reset Cache")}</a>
              <a onClick={()=>{
                
                if (getLocale() === 'zh-CN') {
                  setLocale('fr-FR', false);
                }
                else if(getLocale() === 'en-US')
                {
                  setLocale('zh-CN', false);
                }
                else
                {
                  setLocale('en-US', false);
                }
                
                
                
              }}>{t("ENG/中文/FRA")}</a>
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
            <div id={getLocale()}>
            {props.children}
            <div id="blockCount">{commafy(storage.blockNumber).split('.')[0]} <div class="circle animate__animated animate__heartBeat animate__infinite"><FontAwesomeIcon icon={faCircle} /></div></div>
            </div>
          </div>
        </WalletContext.Provider>
      </StorageContext.Provider>
    </div>
  );
}

export default BasicLayout;

