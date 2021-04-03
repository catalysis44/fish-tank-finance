import { useState, useEffect, useContext, useRef } from 'react';
import styles from './ListView.less';
import React from 'react';
import { commafy, getSupplyLevel, getSymbolFromTokenAddress } from '../../utils';
import { categorys, categoryIcons } from '../../config';
import { StorageContext } from '../../hooks';
import { WalletContext } from '../../wallet/Wallet';
import { axioGet } from '../../utils/cache';
import ConfirmActionModal from './ConfirmAction';
import { currencyList } from '../../config';
import BigNumber from 'bignumber.js';
import { useLanguage } from '../../hooks/language';

function Row(props) {
  const t = useLanguage();
  const category = Number(props.attributes[0].value);
  const level = Number(props.attributes[1].value);
  const item = Number(props.attributes[2].value);
  const rare = item;
  const price = props.price;
  const token = props.token;
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;
  const ret = getSymbolFromTokenAddress(token, chainId);
  const symbol = ret.symbol;
  const decimals = ret.decimals;
  const currencyIcon = symbol && currencyList.find(v => v.symbol === symbol).icon;


  return <div className={styles.listview_row}>

    <div className={`${styles.listview_col} ${styles.star}`}>
      {
        level < 4 && Array.from({ length: level }).map(v => {
          return <img src="assets/star18x18.png" />
        })
      }
      {
        level === 4 && <img src="assets/max.png" />
      }
    </div>

    <div className={`${styles.listview_col} ${styles.title}`}>
      <div className={styles.listview_subcol}>
        <img src={props.image} /> <div>{props.name}</div>
      </div>
    </div>
    <div className={`${styles.listview_col} ${styles.class}`}>
      <div className={styles.listview_subcol}>
        {
          rare === 1 && <img src="assets/grade/N.png" />
        }
        {
          rare === 2 && <img src="assets/grade/R.png" />
        }
        {
          rare === 3 && <img src="assets/grade/SR.png" />
        }
        {
          rare === 4 && <img src="assets/grade/SSR.png" />
        }
        {
          rare === 5 && <img src="assets/grade/UR.png" />
        }
      </div>
    </div>

    <div className={styles.block_responsive}>

      <div className={`${styles.listview_col} ${styles.stat_action}`}>
        <div className={styles.listview_subcol}>
          <div className={styles.stat}><span><img src="assets/rocket24x24.png" />+{(props.boost * 100).toFixed(2)}%</span></div>
          <div className={styles.stat}><span><img src="assets/hourglass24x24.png" style={{ width: 20 }} />-{(props.reduce * 100).toFixed(2)}%</span></div>
        </div>
      </div>

      <div className={`${styles.listview_col} ${styles.item_description}`}>
        <div className={styles.listview_subcol}>
          <div className={styles.description}>
          <span><img src={categoryIcons[category - 1]} /> {t(categorys[category - 1])}</span>
          </div>
          <div className={styles.description}>
            <span>{t('Card')} #</span>
            {props.tokenId}
        </div>
          <div className={styles.description_supply}>
            <div className={styles.gauge} data-level={getSupplyLevel(props.itemSupply)}> {/*LV 1-5*/}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <span>{t('Total Supply')}</span>
            {props.itemSupply}
          </div>
        </div>
      </div>


      <div className={`${styles.listview_col} ${styles.buy_action}`}>
        <div className={styles.listview_subcol}>
          <a className={styles.buy_btn} onClick={() => {
          props.setCurrentOrder({
            icon: props.image,
            name: props.name,
            amount: price && (new BigNumber(price)).div(10 ** decimals),
            level,
            rare,
            token,
            decimals,
            orderId: props.orderId,
            categoryName: categorys[category - 1],
            categoryIcon: categoryIcons[category - 1],
            tokenId: props.tokenId,
            itemSupply: props.itemSupply,
            boost: props.boost,
            reduce: props.reduce,
            currency: symbol,
            currencyIcon: currencyIcon,
          });

          props.setShowConfirmActionModal(1);
        }}>
            {t('Buy for')} {price && decimals && commafy(price / 10 ** decimals)} {symbol}
          </a>
        </div>
      </div>

    </div>


  </div>
}

export default function ListView(props) {
  const t = useLanguage();
  const storage = useContext(StorageContext);
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  const marketOrderCount = storage.marketOrderCount;
  const markets = storage.markets;
  const nftCards = storage.nftCards;
  // console.debug('markets', markets);

  const sortFunc = props.sortFunc;
  const filterFunc = props.filterFunc;

  const [cards, setCards] = useState([]);

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    const func = async () => {
      if (!markets) {
        return;
      }

      // console.log('markets', markets);
      const arr = markets.map(v => {
        return axioGet(v.uri);
      });

      let rets;
      try {
        rets = await Promise.all(arr);
      } catch (error) {
        console.error('axio error', error);
        return;
      }

      if (!rets) {
        return;
      }

      let objs = rets.map(v => v.data);

      objs = objs.map((v, i) => {
        return { ...v, ...markets[i] };
      });
      // console.log('objs', objs);
      setCards(objs);
    }

    func();
  }, [marketOrderCount, markets]);

  return (
    <React.Fragment >
      <ConfirmActionModal isActived={showConfirmActionModal} setModal={setShowConfirmActionModal}
        icon={currentOrder.icon}
        name={currentOrder.name}
        amount={currentOrder.amount}
        decimals={currentOrder.decimals}
        level={currentOrder.level}
        rare={currentOrder.rare}
        orderId={currentOrder.orderId}
        categoryName={currentOrder.categoryName}
        categoryIcon={currentOrder.categoryIcon}
        tokenId={currentOrder.tokenId}
        token={currentOrder.token}
        itemSupply={currentOrder.itemSupply}
        boost={currentOrder.boost}
        reduce={currentOrder.reduce}
        currency={currentOrder.currency}
        currencyIcon={currentOrder.currencyIcon}
        setTxWaiting={props.setTxWaiting}
      ></ConfirmActionModal>
      <div className={styles.total_items}>
          {t('Total Items')}: {commafy(cards.length,null,false)}
      </div>
      <div className={styles.listview_panel}>
        <div className={styles.listview_table}>
          {
            cards.filter(filterFunc).sort(sortFunc).map(v => {
              return <Row key={v.tokenId}
                orderId={v.orderId}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId} attributes={v.attributes} boost={v.boost}
                reduce={v.reduce} itemSupply={v.itemSupply} price={v.price}
                setTxWaiting={props.setTxWaiting}
                token={v.token}
                setCurrentOrder={setCurrentOrder}
                setShowConfirmActionModal={setShowConfirmActionModal}
              />
            })
          }

        </div>
      </div>
    </React.Fragment>
  )
}
