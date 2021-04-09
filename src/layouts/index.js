import styles from './index.less';
import "../styles/bulma.scss"
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCopy, faCaretUp } from '@fortawesome/free-solid-svg-icons'

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
import ConfirmResetCache from '../components/resetcache/ConfirmResetCache';
import { useEventMonitor } from '../utils/events';
import { message} from 'antd';

function toggleSidebar()
{
  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    document.getElementById('wrapper').classList.toggle("toggled");
  }
  
}




function BasicLayout(props) {

  /* Language Switcher */
  const [showLangswitcherDropdown, setShowLangswitcherDropdown] = useState(false);
  const [lang, setLang] = useLocalStorageState('user-language', 'English');
  const [langIcon, setLangIcon] = useLocalStorageState('user-language-icon', 'assets/lang/us.png');
  /* Contract Dropdown */
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  
  const [wallet, setWallet] = useState({});
  const web3 = wallet.web3;
  const chainId = wallet.networkId && wallet.networkId.toString();
  const address = wallet.address;
  const connected = wallet.connected;
  const provider = wallet.provider;
  const [loading, setLoading] = useState(false);
  
  const t = useLanguage();

  const [storage, setStorage] = useLocalStorageState('zoo-keeper-' + address + '-' + chainId, initialState);

  useDataPump(storage, setStorage, chainId, address, connected);

  useEventMonitor(wallet.web3, chainId, t);

  const prices = getPrices();
  // console.debug('chainId', chainId);

  const zooPrice = prices['ZOO'];

  const [showConfirmResetCacheModal, setConfirmResetCacheModal] = useState(0);


    window.Clipboard = (function(window, document, navigator) {
      var textArea,
          copy;

      function isOS() {
          return navigator.userAgent.match(/ipad|iphone/i);
      }

      function createTextArea(text) {
          textArea = document.createElement('textArea');
          textArea.value = text;
          document.body.appendChild(textArea);
      }

      function selectText() {
          var range,
              selection;

          if (isOS()) {
              range = document.createRange();
              range.selectNodeContents(textArea);
              selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              textArea.setSelectionRange(0, 999999);
          } else {
              textArea.select();
          }
      }

      function copyToClipboard() {        
          document.execCommand('copy');
          document.body.removeChild(textArea);
      }

      copy = function(text) {
          createTextArea(text);
          selectText();
          copyToClipboard();
      };

      return {
          copy: copy
      };
  })(window, document, navigator);
  const copyAddress = (address) =>
  {
    window.Clipboard.copy(address);
    message.success('Copied address: '+address);
  }

  return (
    
    <div id="wrapper">
      <ConfirmResetCache  isActived={showConfirmResetCacheModal} setModal={setConfirmResetCacheModal} />
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
          <div class="address"><img src="assets/wallet32x32.png"/><span>{address ? address.slice(0, 6) + '...' + address.slice(-6) : t('NO WALLET')}</span> <a onClick={() => copyAddress(address)} className="has-tooltip-top  has-tooltip-active"><FontAwesomeIcon icon={faCopy}/></a></div>
          {chainId && chainId.toString() !== '1' && chainId.toString() !== '888' && chainId !== "" && <div class="testnet"><span>!! {t('TESTNET')} !!</span></div>}
          <div class="balance"><img src="assets/zoo32x32.png"/><span>{commafy(storage.zooBalance)}</span></div>
        </div>
        

        <div class="horizontal_line">
          
        </div>

        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><NavLink onClick={toggleSidebar}  to="/" activeClassName="is_active"  exact={true}><img src="assets/sidebar/zoo.png"/> <div>{t("The Zoo")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar}  to="/expedition" activeClassName="is_active"><img src="assets/sidebar/expedition.png"/> <div>{t("The Expedition")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar}  to="/market" activeClassName="is_active"><img src="assets/sidebar/market.png"/> <div>{t("The Market")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar} to="/safe" activeClassName="is_active"><img src="assets/sidebar/safe.png"/> <div>{t("My Safe")}</div></NavLink></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/stake.png"/> <div>{t("Stake Zoo")}</div></a></li>
              <li style={{display:'none'}}><a><img src="assets/sidebar/lotto.png"/> <div>{t("Lotto")}</div></a></li>
            </ul>
            
          </aside>
        </div>

        <div className={styles.footer}>

            <div className={styles.ext_link}>
              
              <a href="https://docs.zookeeper.finance/" target="_blank">
                <img src="assets/docs.png"/>
                <span>{t("Documentation")}</span>
              </a>
            
             
            </div>

            <div id="zoo_info_burned">
              <div className={styles.box}>
                  <img src="assets/zoo_panel.png" class={styles.zoo_icon}/>
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
           
            <div className={styles.lang_social_wrapper} >
              <div className={"dropdown is-up is-active"}  tabindex="-1" onBlur={() => setShowLangswitcherDropdown(false)}> {/*add class .is-active to open dropdown*/}
                <a className={styles.select_lang} aria-haspopup="true" aria-controls="dropdown-menu"  onClick={() => {
                  setShowLangswitcherDropdown(!showLangswitcherDropdown);
                }}>
                  <img src={langIcon} />
                  <span>{lang}</span>
                </a>
                {
                  showLangswitcherDropdown && <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content"  >
                      <a class="dropdown-item" onClick={() => {
                        setLocale('en-US', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/us.png');
                        setLang('English');
                        }}>
                        <img src="assets/lang/us.png"/>
                        <span>English</span>
                      </a>

                      <a class="dropdown-item" onClick={() => {
                        setLocale('zh-CN', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/cn.png');
                        setLang('中文');
                      }}>
                        <img src="assets/lang/cn.png"/>
                        <span>中文</span>
                      </a>

                      <a class="dropdown-item" onClick={() => {
                        setLocale('fr-FR', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/fr.png');
                        setLang('Français');
                        }}>
                        <img src="assets/lang/fr.png"/>
                        <span>Français</span> 
                      </a>

                      <a class="dropdown-item" onClick={() => {
                        setLocale('ru-RU', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/ru.png');
                        setLang('Pусский');
                        }}>
                        <img src="assets/lang/ru.png"/>
                        <span>Pусский</span> 
                      </a>

                      <a class="dropdown-item" onClick={() => {
                        setLocale('es-ES', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/es.png');
                        setLang('Español');
                        }}>
                        <img src="assets/lang/es.png"/>
                        <span>Español</span> 
                      </a>

                      <a class="dropdown-item" onClick={() => {
                        setLocale('tr-TR', false);
                        setShowLangswitcherDropdown(false);
                        setLangIcon('assets/lang/tr.png');
                        setLang('Türkçe');
                        }}>
                        <img src="assets/lang/tr.png"/>
                        <span>Türkçe</span> 
                      </a>

                  </div>
                </div>
                }
              </div>

              <div className={"dropdown is-up is-active"}  tabindex="-1"  onBlur={() => setShowContactDropdown(false)}> {/*add class .is-active to open dropdown*/}
                <a className={styles.select_lang} aria-haspopup="true" aria-controls="dropdown-menu"  onClick={() => {
                  setShowContactDropdown(!showLangswitcherDropdown);
                }}>
                  <span>Contact <FontAwesomeIcon icon={faCaretUp}/></span>
                </a>
                {
                   showContactDropdown && <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content"  >
                        <a href="https://t.me/ZooFarming" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Telegram</span>
                        </a>
                        <a href="https://twitter.com/ZooFarming" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Twitter</span>
                        </a>
                        <a href="https://medium.com/@ZooFarming" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Medium</span>
                        </a>  
                        <a href="https://www.youtube.com/c/ZooFarming" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Youtube</span>
                        </a>
                        <a href="https://www.reddit.com/user/ZooFarming" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Reddit</span>
                        </a>
                        <a href="https://github.com/zooFarming/" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Github</span>
                        </a>
                        <a href="https://bbs.zookeeper.finance" target="_blank" class="dropdown-item" onClick={() => {setShowContactDropdown(false);}}>
                          <span>Forum</span>
                        </a>
                        
                      </div>
                    </div>
                }
              </div>

            </div>
           <div>
              
              <div className={styles.credit}>
                Powered by <a href="https://www.wanchain.org" target="_blank">WANCHAIN</a> - <a onClick={() => { setConfirmResetCacheModal(1) }}>Reset Cache</a>
              </div>
            </div>
      </div>


      </div>

      <StorageContext.Provider value={storage} >
        <WalletContext.Provider value={wallet} >
          <div id="page_content_wrapper">
            <div id={getLocale()} style={{height:'100%'}}>
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

