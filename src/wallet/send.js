import BigNumber from 'bignumber.js';
import { ZOO_FARMING_ADDRESS, ZOO_BOOSTING_ADDRESS, ZOO_NFT_ADDRESS, ZOO_TOKEN_ADDRESS } from '../config';
const farmingAbi = require('../assets/abi/farming.json');
const erc20Abi = require('../assets/abi/erc20.json');
const erc721Abi = require('../assets/abi/erc721.json');

export const withdraw = async (pid, amount, chainId, web3, address) => {
  console.debug('withdraw', pid, amount, chainId, web3, address);
  const sc = new web3.eth.Contract(farmingAbi, ZOO_FARMING_ADDRESS[chainId]);
  let ret = await sc.methods.withdraw(pid, amount).send({ from: address });
  console.debug('withdraw ret', ret);
  return ret.status;
}

export const deposit = async (pid, amount, lockTime, nftId, chainId, web3, address) => {
  console.debug('deposit', pid, amount, lockTime, nftId, chainId, web3, address);
  const sc = new web3.eth.Contract(farmingAbi, ZOO_FARMING_ADDRESS[chainId]);
  let ret = await sc.methods.deposit(pid, amount, lockTime, nftId).send({ from: address });
  console.debug('deposit ret', ret);
  return ret.status;
}

export const approve = async (lpToken, chainId, web3, address) => {
  console.debug('approve', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, lpToken);
  let allowance = await erc20.methods.allowance(address, ZOO_FARMING_ADDRESS[chainId]).call();
  let ret;
  if (allowance.toString() !== '0') {
    ret = await erc20.methods.approve(ZOO_FARMING_ADDRESS[chainId], '0x0').send({ from: address });
    if(!ret || !ret.status) {
      throw new Error("approve failed");
    }
  }
  
  ret = await erc20.methods.approve(ZOO_FARMING_ADDRESS[chainId], '0xf000000000000000000000000000000000000000').send({ from: address });
  console.debug('approve lp ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
  
  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  ret = await erc721.methods.setApprovalForAll(ZOO_BOOSTING_ADDRESS[chainId], true).send({ from: address });
  console.debug('approve nft ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
}

export const checkApprove = async (lpToken, amount, chainId, web3, address) => {
  console.debug('checkApprove', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, lpToken);
  let allowance = await erc20.methods.allowance(address, ZOO_FARMING_ADDRESS[chainId]).call();
  console.debug('allowance', allowance.toString(), amount.toString(), (new BigNumber(allowance)).gte(new BigNumber(amount)))
  if (!(new BigNumber(allowance)).gte(new BigNumber(amount))) {
    return false;
  }

  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  let approved = await erc721.methods.isApprovedForAll(address, ZOO_BOOSTING_ADDRESS[chainId]).call();
  
  return approved;
}