import styles from './EmptyPool.less';
import React from 'react';
import { useLanguage } from '../../hooks/language';


export default function Pool(props) {
  const t = useLanguage();
  return (
    <React.Fragment >
      <div className={styles.pool_empty}>
          <div className={styles.symbol}>
              ?
            </div>
            <div className={styles.caption}>
              <div>{t("NEW POOL")}</div>
              <div>ZOON!</div>
            </div>

      </div>

    </React.Fragment>
  )
}
