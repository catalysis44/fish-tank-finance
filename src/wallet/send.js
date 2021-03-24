import BigNumber from 'bignumber.js';
import { ZOO_FARMING_ADDRESS, ZOO_BOOSTING_ADDRESS, ZOO_NFT_ADDRESS, ZOO_TOKEN_ADDRESS, NFT_FACTORY_ADDRESS, NFT_MARKETPLACE_ADDRESS, trade_tokens } from '../config';
const farmingAbi = require('../assets/abi/farming.json');
const erc20Abi = require('../assets/abi/erc20.json');
const erc721Abi = require('../assets/abi/erc721.json');
const nftFactoryAbi = require('../assets/abi/nftFactory.json');
const marketAbi = require('../assets/abi/market.json');

export const withdraw = async (pid, amount, chainId, web3, address) => {
  // console.debug('withdraw', pid, amount, chainId, web3, address);
  const sc = new web3.eth.Contract(farmingAbi, ZOO_FARMING_ADDRESS[chainId]);
  let ret = await sc.methods.withdraw(pid, amount).send({ from: address });
  // console.debug('withdraw ret', ret);
  return ret.status;
}

export const deposit = async (pid, amount, lockTime, nftId, chainId, web3, address) => {
  // console.debug('deposit', pid, amount, lockTime, nftId, chainId, web3, address);
  const sc = new web3.eth.Contract(farmingAbi, ZOO_FARMING_ADDRESS[chainId]);
  let ret = await sc.methods.deposit(pid, amount, lockTime, nftId).send({ from: address });
  // console.debug('deposit ret', ret);
  return ret.status;
}

export const approve = async (lpToken, chainId, web3, address) => {
  // console.debug('approve', lpToken, chainId, web3, address);
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
  // console.debug('approve lp ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
  
  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  ret = await erc721.methods.setApprovalForAll(ZOO_BOOSTING_ADDRESS[chainId], true).send({ from: address });
  // console.debug('approve nft ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
}

export const checkApprove = async (lpToken, amount, chainId, web3, address) => {
  // console.debug('checkApprove', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, lpToken);
  let allowance = await erc20.methods.allowance(address, ZOO_FARMING_ADDRESS[chainId]).call();
  // console.debug('allowance', allowance.toString(), amount.toString(), (new BigNumber(allowance)).gte(new BigNumber(amount)))
  if (!(new BigNumber(allowance)).gte(new BigNumber(amount))) {
    return false;
  }

  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  let approved = await erc721.methods.isApprovedForAll(address, ZOO_BOOSTING_ADDRESS[chainId]).call();
  
  return approved;
}

export const checkApproveExpedition = async (lpToken, amount, chainId, web3, address) => {
  // console.debug('checkApproveExpedition', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, lpToken);
  let allowance = await erc20.methods.allowance(address, NFT_FACTORY_ADDRESS[chainId]).call();
  // console.debug('checkApproveExpedition allowance', allowance.toString(), amount.toString(), (new BigNumber(allowance)).gte(new BigNumber(amount)))
  if (!(new BigNumber(allowance)).gte(new BigNumber(amount))) {
    return false;
  }

  return true;
}

export const approveExpedition = async (lpToken, chainId, web3, address) => {
  // console.debug('approveExpedition', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, lpToken);
  let allowance = await erc20.methods.allowance(address, NFT_FACTORY_ADDRESS[chainId]).call();
  let ret;
  if (allowance.toString() !== '0') {
    ret = await erc20.methods.approve(NFT_FACTORY_ADDRESS[chainId], '0x0').send({ from: address });
    if(!ret || !ret.status) {
      throw new Error("approve failed");
    }
  }

  ret = await erc20.methods.approve(NFT_FACTORY_ADDRESS[chainId], '0xf000000000000000000000000000000000000000').send({ from: address });
  // console.debug('approve lp ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
}

export const buyGoldenChest = async (web3, chainId, address) => {
  // console.debug('buyGoldenChest', chainId, web3, address);
  const sc = new web3.eth.Contract(nftFactoryAbi, NFT_FACTORY_ADDRESS[chainId]);
  let ret = await sc.methods.buyGoldenChest().send({ from: address, gas: 1500000 });
  // console.debug('buyGoldenChest ret', ret);
  return ret;
}

export const buySilverChest = async (web3, chainId, address) => {
  // console.debug('buySilverChest', chainId, web3, address);
  const sc = new web3.eth.Contract(nftFactoryAbi, NFT_FACTORY_ADDRESS[chainId]);
  let ret = await sc.methods.buySilverChest().send({ from: address, gas: 1500000 });
  // console.debug('buySilverChest ret', ret);
  return ret;
}

export const stakeZoo = async (type, web3, chainId, address) => {
  // console.debug('stakeZoo', type, chainId, web3, address);
  const sc = new web3.eth.Contract(nftFactoryAbi, NFT_FACTORY_ADDRESS[chainId]);
  let ret = await sc.methods.stakeZoo(type).send({ from: address });
  // console.debug('stakeZoo ret', ret);
  return ret;
}

export const stakeClaim = async (type, web3, chainId, address) => {
  // console.debug('stakeZoo', type, chainId, web3, address);
  const sc = new web3.eth.Contract(nftFactoryAbi, NFT_FACTORY_ADDRESS[chainId]);
  let ret = await sc.methods.stakeClaim(type).send({ from: address });
  // console.debug('stakeZoo ret', ret);
  return ret;
}

export const checkMarketSellApprove = async (chainId, web3, address) => {
  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  let approved = await erc721.methods.isApprovedForAll(address, NFT_MARKETPLACE_ADDRESS[chainId]).call();
  return approved;
}

export const approveMarket = async (chainId, web3, address) => {
  const erc721 = new web3.eth.Contract(erc721Abi, ZOO_NFT_ADDRESS[chainId]);
  let ret = await erc721.methods.setApprovalForAll(NFT_MARKETPLACE_ADDRESS[chainId], true).send({ from: address });
  // console.debug('approve nft ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
  return ret.status;
}

export const createOrder = async (tokenId, symbol, price, chainId, web3, address) => {
  const market = new web3.eth.Contract(marketAbi, NFT_MARKETPLACE_ADDRESS[chainId]);
  let ret = await market.methods.createOrder(ZOO_NFT_ADDRESS[chainId], tokenId, trade_tokens[chainId][symbol].address, 
    '0x' + (new BigNumber(price)).multipliedBy(10**trade_tokens[chainId][symbol].decimals).toString(16), 
    14*24*3600).send({ from: address });
  return ret;
}

export const cancelOrder = async (tokenId, symbol, chainId, web3, address) => {
  const market = new web3.eth.Contract(marketAbi, NFT_MARKETPLACE_ADDRESS[chainId]);
  let ret = await market.methods.cancelOrder(ZOO_NFT_ADDRESS[chainId], tokenId, trade_tokens[chainId][symbol].address).send({ from: address });
  return ret;
}

export const buyOrder = async (orderId, chainId, web3, address) => {
  console.log('buyOrder', orderId, chainId, address)
  const market = new web3.eth.Contract(marketAbi, NFT_MARKETPLACE_ADDRESS[chainId]);
  let ret = await market.methods.buyOrder(orderId).send({ from: address });
  return ret;
}

export const checkMarketBuyApprove = async (token, amount, chainId, web3, address) => {
  console.log('checkMarketBuyApprove', token, amount, chainId);
  if (!token || !amount || !chainId || !web3 || !address) {
    return false;
  }
  
  const erc20 = new web3.eth.Contract(erc20Abi, token);
  let allowance = await erc20.methods.allowance(address, NFT_MARKETPLACE_ADDRESS[chainId]).call();
  console.log('allowance', allowance.toString(), amount.toString());
  if (!(new BigNumber(allowance)).gte(new BigNumber(amount))) {
    return false;
  }
  return true;
}

export const approveForMarketBuy = async (token, chainId, web3, address) => {
  // console.debug('approve', lpToken, chainId, web3, address);
  const erc20 = new web3.eth.Contract(erc20Abi, token);
  let allowance = await erc20.methods.allowance(address, NFT_MARKETPLACE_ADDRESS[chainId]).call();
  let ret;
  if (allowance.toString() !== '0') {
    ret = await erc20.methods.approve(NFT_MARKETPLACE_ADDRESS[chainId], '0x0').send({ from: address });
    if(!ret || !ret.status) {
      throw new Error("approve failed");
    }
  }

  ret = await erc20.methods.approve(NFT_MARKETPLACE_ADDRESS[chainId], '0xf000000000000000000000000000000000000000').send({ from: address });
  // console.debug('approve lp ret', ret);
  if(!ret || !ret.status) {
    throw new Error("approve failed");
  }
  return ret.status;
}

