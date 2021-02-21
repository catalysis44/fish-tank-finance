import styles from './index.less';
import "../styles/bulma.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';
function toggleSidebar()
{
  document.getElementById('wrapper').classList.toggle("toggled");
}

function BasicLayout(props) {
  return (
    <div id="wrapper">
      <div id="sidebar_backdrop" onClick={toggleSidebar}></div>
      <a id="menu_toggle" onClick={toggleSidebar}>›</a>
      <div id="sidebar_wrapper">
        
        <div id="sidebar_heading"><img src="dummy/logo.png"/></div>
        
        <div id="wallet_connection" data-connected="true"> {/*data-connected="true" when connected*/}
          <a class="connect_disconnect_btn">DISCONNECT</a> 
          <div class="address"><FontAwesomeIcon icon={faWallet} /> <span>0x0000...0000</span></div>
          <div class="balance"><img src="dummy/zoo_mini_icon.png"/> <span>555,324,652.55</span></div>
        </div>

        <div class="horizontal_line">
          
        </div>

        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><a><img src="dummy/menu_pond.png"/> The Ponds</a></li>
              <li><a><img src="dummy/menu_expedition.png"/> The Expedition</a></li>
              <li><a><img src="dummy/menu_market.png"/> The Market</a></li>
            </ul>
            
          </aside>
        </div>
      </div>

      <div id="page_content_wrapper">
        <Header/>
        {props.children}
      </div>

    </div>
  );
}

export default BasicLayout;

