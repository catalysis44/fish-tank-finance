import styles from './index.less';
import "../styles/bulma.scss"
import '../../node_modules/animate.css/animate.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';
import { NavLink } from 'umi';
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
        
        <div id="sidebar_heading"><img src="assets/zoo_logo.png"/></div>
        
        <div id="wallet_connection" data-connected="true"> {/*data-connected="true" when connected*/}
          <a class="connect_disconnect_btn">DISCONNECT</a> 
          <div class="address"><img src="assets/wallet32x32.png"/><span>0x0000...0000</span></div>
          <div class="balance"><img src="assets/zoo32x32.png"/><span>555,324,652.55</span></div>
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
      </div>

      <div id="page_content_wrapper">
        <Header/>
        {props.children}
        
      </div>

    </div>
  );
}

export default BasicLayout;

