import { useInterval } from "ahooks";
import { useCallback } from "react";
import { openNotificationBell } from ".";
import { NFT_MARKETPLACE_ADDRESS } from "../config";
import { getPendingSellHistory, updateHistory } from "./db";
import { useLanguage } from '../hooks/language';
const marketAbi = require('../assets/abi/market.json');


export const useEventMonitor = (web3, chainId, t) => {
  const checkEvent = useCallback(async () => {
    if (!web3 || !chainId) {
      return;
    }

    const hisotrys = getPendingSellHistory('sale');
    // console.debug('pending history', hisotrys);
    if (hisotrys.length === 0) {
      return;
    }

    const sc = new web3.eth.Contract(marketAbi, NFT_MARKETPLACE_ADDRESS[chainId]);

    let rets = await Promise.all(hisotrys.map(v => {
      return sc.getPastEvents('BuyOrder', {
        filter: { _orderId: v.orderId },
        fromBlock: v.blockNumber,
        toBlock: 'latest'
      });
    }))

    // console.debug('monitor events:', rets);
    hisotrys.map((v, i) => {
      if (rets[i].length > 0) {
        updateHistory('sale', v.time, 'success');
        openNotificationBell(t('Your sell order')+' [#' + v.tokenId + ' ' + v.name + ', ' + v.price + ' ' + v.symbol + '] '+t('has been concluded')+'.', v.image);
      }
    });
  }, [web3, chainId, t]);
  useInterval(checkEvent, 20 * 1000, { immediate: true });
}
