import BigNumber from 'bignumber.js';
import { useInterval, useLockFn, useReactive } from 'ahooks';
import { MULTICALL_ADDRESS, RPC_URL, ZOO_TOKEN_ADDRESS } from '../config';
import React, { useCallback, useMemo } from 'react';
const { aggregate } = require('@makerdao/multicall');
const DataLoader = require('dataloader');


export const initialState = {
  zooBalance: new BigNumber(300),
  address: '',
  chainId: 1,
}

const differ = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return 0;
  } else {
    return 1;
  }
}

export const StorageContext = React.createContext(initialState, differ);

export const useLoader = (chainId) => {
  const loader = useMemo(() => {
    if (!chainId) {
      return undefined;
    }

    const getBatchData = async (calls) => {
      try {
        const conf = {
          rpcUrl: RPC_URL[chainId],
          multicallAddress: MULTICALL_ADDRESS[chainId],
        };

        let ret = await aggregate(calls, conf);
        return calls.map(v => {
          return {
            ...v,
            returnValue: ret.results.transformed[v.returns[0][0]]
          };
        });
      } catch (error) {
        console.error('getBatchData error', error);
        return calls.map(v => (undefined));
      }
    }

    const chainDataLoader = new DataLoader(keys => getBatchData(keys), { cache: false, maxBatchSize: 100 });
    return chainDataLoader;
  }, [chainId]);
  return loader;
}

export const useDataPump = (storage, setStorage, chainId, address, connected) => {
  const loader = useLoader(chainId);

  const updater = () => {
    console.debug('timer ~');
    if (!loader || !address || !chainId || !connected) {
      return;
    }

    loader.load({
      target: ZOO_TOKEN_ADDRESS[chainId],
      call: ['balanceOf(address)(uint256)', address],
      returns: [['zooBalance', val => (new BigNumber(val.toString())).div(1e18)]]
    }).then(ret => {
      console.debug('ret', ret);
      setStorage({...storage, zooBalance: ret.returnValue});
    }).catch(err => {
      console.error('err 1', err);
    })
  };


  useInterval(updater, 10000, { immediate: true });
}

