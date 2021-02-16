import styles from './index.less';
import "../styles/bulma.scss"

function toggleSidebar()
{
  document.getElementById('wrapper').classList.toggle("toggled");
}

function BasicLayout(props) {
  return (
    <div id="wrapper">
      <div id="sidebar_wrapper">
        <a id="menu_toggle" onClick={toggleSidebar}>›</a>
        <div id="sidebar_heading">ZOOKEEPER!</div>
        <div class="list_group">
          <aside class="menu">
            
            <ul class="menu-list">
              <li><a>농장</a></li>
              <li><a>ファーム</a></li>
              <li><a>投票</a></li>
              <li><a>常见问题</a></li>
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

