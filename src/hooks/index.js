import BigNumber from 'bignumber.js';
import { useReactive } from 'ahooks';

const initialState = {
  zooBalance: new BigNumber(0),
}

export const useStorage = () => {
  const state = useReactive(initialState);
  console.debug('state', JSON.stringify(state, null, 2));
  return state;
}
