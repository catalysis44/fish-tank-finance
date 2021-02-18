import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
export default function () {
  return (
    <div className={styles.row}>

      <div className={styles.pool}>
        <div className={styles.header}>
          <div className={styles.title}>
            TITLE OF THE POOL
          </div>
          {/*is-success for KEEPER CHOICE and is-dark for COMMUNITY CHOICE*/ }
          <div className="choice button is-success is-outlined">
            <span class="icon is-small">
              <FontAwesomeIcon icon={faCheckSquare} />
            </span>
            <span>KEEPER CHOICE</span>
          </div>
        </div>


        <div className={styles.avatar}>
          <img src="dummy/bear.png" />
        </div>
      </div>



    </div>
  );
}
