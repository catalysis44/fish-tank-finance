import { useState, useEffect, useContext, useRef } from 'react';
import styles from './CardView.less';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExternalLinkSquareAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd';
import { StorageContext } from '../../hooks';
import { WalletContext } from '../../wallet/Wallet';
import { axioGet } from '../../utils/cache';
import {categorys, categoryIcons} from '../../config';


function Card(props) {
  const category = Number(props.attributes[0].value);
  const level = Number(props.attributes[1].value);
  const item = Number(props.attributes[2].value);

  return <div className={styles.flip_card}>
    <div className={styles.flip_card_inner}>
      <div className={styles.flip_card_front} data-is-max={level === 4 || item === 5 ? "true": "false"}> {/* data-is-max="true" if this is max item */}
        <div className={styles.item_title}>
          <img src={props.image} />
          <div className={styles.title}>
            {props.name}
              <div>
              {
                level < 4 && Array.from({length: level}).map(v=>{
                  return <img src="assets/star18x18.png"/>
                })
              }
              {
                level === 4 && <img src="assets/max.png" />
              }
            </div>
          </div>
        </div>
        <div className={styles.total_supply}>
          <img src="assets/gem/common18x18.png" /> Total Supply: {props.itemSupply}
                          </div>
        <div className={styles.item_description}>
          <div className={styles.description}>
            <span><img src="assets/rocket24x24.png" /> +{(props.boost*100).toFixed(2)}%</span>
          </div>
          <div className={styles.description}>
            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -{(props.reduce*100).toFixed(2)}%</span>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.description}>
            <span><img src={categoryIcons[category - 1]} /> {categorys[category-1]}</span>
          </div>
          <div className={styles.description}>
            <span>Card #</span>
            {props.tokenId}
            </div>
          <div className={styles.price}>
            <img src="assets/currency/zoo.png" />
            <div>
              1,535,350
            <span>ZOO</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flip_card_back}>
        <div className={styles.title}>
          <img src="assets/lemon64x64.png" />
                                  Lemon of Bunbury
                              </div>
        <div className={styles.item_description}>
          <div className={styles.description}>
            <div>
              <img src="assets/star18x18.png" />
              <img src="assets/star18x18.png" />
              <img src="assets/star18x18.png" />
            </div>
          </div>
          <div className={styles.description}>
            <span><img src="assets/rocket24x24.png" /> +5.15%</span>
          </div>
          <div className={styles.description}>
            <span><img src="assets/hourglass24x24.png" style={{ height: 20 }} /> -15.25%</span>
          </div>
        </div>
        <a className={styles.buy_btn}>
          Buy for 1,535,350 ZOO
                              </a>
      </div>
    </div>
  </div>
}

export default function CardView(props) {

  const storage = useContext(StorageContext);
  const wallet = useContext(WalletContext);
  const chainId = wallet.networkId;
  const connected = wallet.connected;
  const address = wallet.address;
  const web3 = wallet.web3;

  const marketOrderCount = storage.marketOrderCount;
  const markets = storage.markets;
  console.debug('markets', markets);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (!markets) {
        return;
      }
      const arr = markets.map(v => {
        return axioGet(v.uri);
      });

      let rets;
      try {
        rets = await Promise.all(arr);
      } catch (error) {
        console.error('axio error', error);
      }

      if (!rets) {
        return;
      }

      let objs = rets.map(v => v.data);

      objs = objs.map((v, i) => {
        return { ...v, ...markets[i] };
      });
      console.log('objs', objs);
      setCards(objs);
    }

    func();
  }, [marketOrderCount, markets]);


  return (
    <React.Fragment >
      {
        cards.map(v => {
          return <Card key={v.tokenId} image={v.image} name={v.name} tokenId={v.tokenId} attributes={v.attributes} boost={v.boost} reduce={v.reduce} itemSupply={v.itemSupply} price={v.price} token={v.token} />
        })
      }
    </React.Fragment>
  )
}
