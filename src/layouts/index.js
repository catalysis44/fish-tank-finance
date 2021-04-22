import styles from './index.less';
import "../styles/bulma.scss"
import '../../node_modules/animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCopy, faCaretUp, faExternalLinkSquareAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { ZOO_TOKEN_ADDRESS } from '../config';
import Header from '../components/Header';
import { NavLink, setLocale, getLocale } from 'umi';
import Wallet, { WalletContext } from '../wallet/Wallet';
import { useState, useEffect } from 'react';
import { useDataPump, initialState, StorageContext } from '../hooks';
import { commafy } from '../utils';
import { useLocalStorageState } from 'ahooks';
import BigNumber from 'bignumber.js';
import { getPrices } from '../hooks/price';
import { useLanguage } from '../hooks/language';
import ConfirmResetCache from '../components/resetcache/ConfirmResetCache';
import { useEventMonitor } from '../utils/events';
import { Modal, message } from 'antd';

import AdsModal from '../components/ads/AdsModal';
import BlackholeModal from '../components/Blackhole';

function toggleSidebar() {
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
  const [showAdsModal, setShowAdsModal] = useState(1);

  const [showBlackholeModal, setShowBlackholeModal] = useState(1);

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


  window.Clipboard = (function (window, document, navigator) {
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

    copy = function (text) {
      createTextArea(text);
      selectText();
      copyToClipboard();
    };

    return {
      copy: copy
    };
  })(window, document, navigator);
  const copyAddress = (address) => {
    window.Clipboard.copy(address);
    message.success('Copied address: ' + address);
  }
  // console.log('chainId', chainId);

  // For testnet //
  const [showTestnetMessage, setShowTestnetMessage] = useState(false);
  if (chainId && chainId.toString() !== '1' && chainId.toString() !== '888' && !showTestnetMessage) {
    setShowTestnetMessage(true);
    message.warning({
      content: 'THIS IS TESTNET, ALL CONTENTS ARE NOT RELATED TO THE MAINNET, THIS IS ONLY FOR TESTING PURPOSE.',
      duration: '10',
      icon: <img src="assets/!.png" style={{ width: 22, marginRight: 10, marginTop: -3 }} />,
      style: {
        marginTop: '15vh',
        fontSize: 22
      },
    });
  }

  // Toggle DarkMode //
  const [darkmode, sestDarkmode] = useLocalStorageState('darkmode', 0);
  const ToggleScheme = (toToggle) => {

    var html = document.getElementsByTagName('html')[0];
    if (toToggle == 1) {
      html.setAttribute('data-scheme', 'dark');
    }
    else {
      html.setAttribute('data-scheme', 'light');
    }

    sestDarkmode(toToggle);
  }
  useEffect(() => {
    ToggleScheme(darkmode);
  }, [])

  const [showBlackhole, setShowBlackhole] = useState(0);
  useEffect(() => {
    if (storage.invalidNftCards && storage.invalidNftCards.length > 0) {
      setShowBlackhole(true);
    }
  }, [storage]);

  return (

    <div id="wrapper">
      <BlackholeModal isActived={showBlackhole} setModal={setShowBlackhole} cards={storage.invalidNftCards} wallet={wallet} />
      {
        false && <AdsModal isActived={showAdsModal} setModal={setShowAdsModal}
        ></AdsModal>
      }
      <ConfirmResetCache isActived={showConfirmResetCacheModal} setModal={setConfirmResetCacheModal} />
      <Wallet wallet={wallet} setWallet={setWallet} />
      <div id="sidebar_backdrop" onClick={toggleSidebar}></div>
      <a id="menu_toggle" onClick={toggleSidebar}>›</a>
      <div id="sidebar_wrapper">

        <div id="sidebar_heading"><img src="assets/zoo_logo.png" /></div>

        <div id="wallet_connection" data-connected={connected ? "true" : "false"}> {/*data-connected="true" when connected*/}
          <a class="connect_disconnect_btn" onClick={() => {
            if (!connected) {
              wallet.connect();
            } else {
              wallet.resetApp();
            }
          }}>{connected ? t("DISCONNECT") : t("CONNECT WALLET")}</a>
          <div class="address"><img src="assets/wallet32x32.png" /><span>{address ? address.slice(0, 6) + '...' + address.slice(-6) : t('NO WALLET')}</span> <a onClick={() => copyAddress(address)} className="has-tooltip-top  has-tooltip-active"><FontAwesomeIcon icon={faCopy} /></a></div>
          {chainId && chainId.toString() !== '1' && chainId.toString() !== '888' && chainId !== "" && <div class="testnet"><span>!! {t('TESTNET')} !!</span></div>}
          <div class="balance"><img src="assets/zoo32x32.png" /><span>{commafy(storage.zooBalance)}</span></div>
          <div class="balance" style={{ marginTop: 5 }}><img src="assets/wasp32x32.png" /><span>{commafy(storage.waspBalance)}</span></div>
        </div>


        <div class="horizontal_line">

        </div>

        <div class="list_group">
          <aside class="menu">

            <ul class="menu-list">
              <li><NavLink onClick={toggleSidebar} to="/" activeClassName="is_active" exact={true}><img src="assets/sidebar/zoo.png" /> <div>{t("The Zoo")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar} to="/expedition" activeClassName="is_active"><img src="assets/sidebar/expedition.png" /> <div>{t("The Expedition")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar} to="/market" activeClassName="is_active"><img src="assets/sidebar/market.png" /> <div>{t("The Market")}</div></NavLink></li>
              <li><NavLink onClick={toggleSidebar} to="/safe" activeClassName="is_active"><img src="assets/sidebar/safe.png" /> <div>{t("My Safe")}</div></NavLink></li>
              <li style={{ display: 'none' }}><a><img src="assets/sidebar/stake.png" /> <div>{t("Stake Zoo")}</div></a></li>
              <li style={{ display: 'none' }}><a><img src="assets/sidebar/lotto.png" /> <div>{t("Lotto")}</div></a></li>
            </ul>

          </aside>
        </div>

        <div className={styles.footer}>

          <div className={styles.ext_link}>
            <a href="https://docs.zookeeper.finance/" target="_blank">
              <img src="assets/docs.png" />
              <span>{t("Documentation")}</span>
            </a>
            <a href="https://vote.wandevs.org/#/zookeeper" target="_blank">
              <img src="assets/vote.png" />
              <span>{t("Vote")}</span>
            </a>
          </div>

          <div id="zoo_info_burned">
            <div className={styles.box}>
              <img src="assets/zoo_panel.png" class={styles.zoo_icon}/>
              <div class={styles.detail}>
                <div>1 ZOO = <a target="_blank" href="https://info.wanswap.finance/token/0x6e11655d6ab3781c6613db8cb1bc3dee9a7e111f" >${commafy(zooPrice)}</a></div>
                <div>{t("MC")} <span>${commafy((new BigNumber(storage.zooTotalSupply)).multipliedBy(zooPrice)).split('.')[0]}</span></div>
                <div>{t("Current supply")} <a target="_blank" href={"https://www.wanscan.org/token/"+ZOO_TOKEN_ADDRESS[chainId]}><FontAwesomeIcon icon={faExternalLinkSquareAlt}/></a></div>
                <div><span>{commafy(new BigNumber(storage.zooTotalSupply)).split('.')[0]} ZOO</span></div>
              </div>
            </div>
            <div className={styles.box}>
              <img src="assets/burn.png" class={styles.burn_icon} />
              <div class={styles.detail}>
                <div>{t("TOTAL BURNED")}</div>
                <div><span className={styles.burned}>{commafy(storage.zooBurned).split('.')[0]} ZOO</span></div>
              </div>
            </div>
          </div>

          <div className={styles.lang_social_wrapper} >
            <div className={"dropdown is-up is-active"} tabindex="-1" onBlur={() => setShowLangswitcherDropdown(false)}> {/*add class .is-active to open dropdown*/}
              <a className={styles.select_lang} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => {
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
                      <img src="assets/lang/us.png" />
                      <span>English</span>
                    </a>

                    <a class="dropdown-item" onClick={() => {
                      setLocale('zh-CN', false);
                      setShowLangswitcherDropdown(false);
                      setLangIcon('assets/lang/cn.png');
                      setLang('中文');
                    }}>
                      <img src="assets/lang/cn.png" />
                      <span>中文</span>
                    </a>

                    <a class="dropdown-item" onClick={() => {
                      setLocale('fr-FR', false);
                      setShowLangswitcherDropdown(false);
                      setLangIcon('assets/lang/fr.png');
                      setLang('Français');
                    }}>
                      <img src="assets/lang/fr.png" />
                      <span>Français</span>
                    </a>

                    <a class="dropdown-item" onClick={() => {
                      setLocale('ru-RU', false);
                      setShowLangswitcherDropdown(false);
                      setLangIcon('assets/lang/ru.png');
                      setLang('Pусский');
                    }}>
                      <img src="assets/lang/ru.png" />
                      <span>Pусский</span>
                    </a>

                    <a class="dropdown-item" onClick={() => {
                      setLocale('es-ES', false);
                      setShowLangswitcherDropdown(false);
                      setLangIcon('assets/lang/es.png');
                      setLang('Español');
                    }}>
                      <img src="assets/lang/es.png" />
                      <span>Español</span>
                    </a>

                    <a class="dropdown-item" onClick={() => {
                      setLocale('tr-TR', false);
                      setShowLangswitcherDropdown(false);
                      setLangIcon('assets/lang/tr.png');
                      setLang('Türkçe');
                    }}>
                      <img src="assets/lang/tr.png" />
                      <span>Türkçe</span>
                    </a>

                  </div>
                </div>
              }
            </div>

            <div className={"dropdown is-up is-active"} tabindex="-1" onBlur={() =>
              setTimeout(function () { //Hack to delay
                setShowContactDropdown(false);
              }, 180)

            } > {/*add class .is-active to open dropdown*/}
              <a className={styles.select_lang} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => {
                setShowContactDropdown(!showContactDropdown);
              }}>
                <span>{t('info')} <FontAwesomeIcon icon={faCaretUp} /></span>
              </a>
              {
                showContactDropdown && <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content"  >
                    <a href="https://t.me/ZooFarming" target="_blank" class="dropdown-item">
                      <span>Telegram</span>
                    </a>
                    <a href="https://twitter.com/ZooFarming" target="_blank" class="dropdown-item">
                      <span>Twitter</span>
                    </a>
                    <a href="https://medium.com/@ZooFarming" target="_blank" class="dropdown-item">
                      <span>Medium</span>
                    </a>
                    <a href="https://www.youtube.com/c/ZooFarming" target="_blank" class="dropdown-item">
                      <span>Youtube</span>
                    </a>
                    <a href="https://www.reddit.com/user/ZooFarming" target="_blank" class="dropdown-item">
                      <span>Reddit</span>
                    </a>
                    <a href="https://github.com/zooFarming/" target="_blank" class="dropdown-item">
                      <span>Github</span>
                    </a>
                    <a href="http://bbs.zookeeper.finance" target="_blank" class="dropdown-item">
                      <span>Forum</span>
                    </a>

                  </div>
                </div>
              }
            </div>

          </div>
          <div>

            <div className={styles.credit}>
              <a onClick={() => { setConfirmResetCacheModal(1) }}>Reset Cache</a> - Built on <a href="https://www.wanchain.org" target="_blank">WANCHAIN</a> - <a onClick={() => {
                ToggleScheme(!darkmode);
              }}>{darkmode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</a>
            </div>
          </div>
        </div>


      </div>

      <StorageContext.Provider value={storage} >
        <WalletContext.Provider value={wallet} >
          <div id="page_content_wrapper">
            <div id={getLocale()} style={{ height: '100%' }}>
              {props.children}
              <div id="blockCount">{commafy(storage.blockNumber).split('.')[0]} <div class="circle animate__animated animate__heartBeat animate__infinite"><FontAwesomeIcon icon={faCircle} /></div></div>
            </div>
          </div>
        </WalletContext.Provider>
      </StorageContext.Provider>
    </div >
  );
}

export default BasicLayout;

