import styles from './index.less';
import "../styles/bulma.scss"
function BasicLayout(props) {
  return (
    <div id="wrapper">
      <div id="sidebar_wrapper">
        <div id="sidebar_heading">ZOOKEEPER!</div>
        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><a>FARM</a></li>
              <li><a>MARKET</a></li>
              <li><a>VOTES</a></li>
              <li><a>FAQ</a></li>
            </ul>
            
          </aside>
        </div>
      </div>

      <div id="page_content_wrapper">
        {props.children}
      </div>

    </div>
  );
}

export default BasicLayout;

