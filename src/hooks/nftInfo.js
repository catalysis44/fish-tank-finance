import { ZOO_NFT_ADDRESS } from '../config';
import axios from 'axios';

const erc721Abi = require('../assets/abi/erc721.json');
const zooNFTAbi = require('../assets/abi/zooNFT.json');


export const getNftInfo = async (tokenId, web3, chainId) => {
  console.debug('getNftInfo', chainId, web3);
  const sc = new web3.eth.Contract(zooNFTAbi, ZOO_NFT_ADDRESS[chainId]);
  let ret = await sc.methods.tokenURI(tokenId).call();
  let boost = await sc.methods.getBoosting(tokenId).call();
  let timeReduce = await sc.methods.getLockTimeReduce(tokenId).call();

  console.debug('tokenURI ret', ret);
  ret = await axios.get(ret);
  console.debug('tokenURI info', ret.data);
  let obj = JSON.parse(ret.data);
  return {
    name: obj.name,
    image: obj.image,
    meta: obj,
    boost: boost / 1e12,
    timeReduce: timeReduce / 1e12,
  };
}
