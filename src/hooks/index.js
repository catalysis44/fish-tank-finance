import BigNumber from 'bignumber.js';
import { useInterval, useLockFn, useReactive } from 'ahooks';
import { MULTICALL_ADDRESS, RPC_URL, ZOO_TOKEN_ADDRESS } from '../config';
import { useCallback } from 'react';
const { aggregate } = require('@makerdao/multicall');


export const initialState = {
  zooBalance: new BigNumber(0),
}

export const useStorage = () => {
  const state = useReactive(initialState);
  console.debug('state', JSON.stringify(state, null, 2));



  return state;
}

export const useDataPump = (state, setStorage, chainId, address) => {
  chainId = chainId ? chainId.toString() : '3';
  const update = useLockFn(async ()=>{
    console.debug('timer arrive');
    const conf = {
      rpcUrl: RPC_URL[chainId],
      multicallAddress: MULTICALL_ADDRESS[chainId],
    }

    if (!address) {
      address = '0xF000000000000000000000000000000000000000';
    }

    const calls = [
      {
        target: ZOO_TOKEN_ADDRESS[chainId],
        call: ['balanceOf(address)(uint256)', address],
        returns: [['zooBalance', val => (new BigNumber(val.toString())).div(1e18)]]
      },
    ]
    console.debug('calls', calls, conf, chainId);
    
    try {
      let ret = await aggregate(calls, conf);

      if (ret.results.transformed.zooBalance) {
        setStorage({zooBalance: ret.results.transformed.zooBalance});
      }
    } catch (error) {
      console.error('error 1', error);
    }
    
  }, [chainId, address]);

  useInterval(update, 10000, { immediate: true });
}

