import { ZOO_FARMING_ADDRESS } from '../config';
const farmingAbi = require('../assets/abi/farming.json');

export const withdraw = async (pid, amount, chainId, web3, address) => {
  console.debug('withdraw', pid, amount, chainId, web3, address);
  const sc = new web3.eth.Contract(farmingAbi, ZOO_FARMING_ADDRESS[chainId]);
  let ret = await sc.methods.withdraw(pid, amount).send({from: address});
  console.log('withdraw ret', ret);
  return ret.status;
}
