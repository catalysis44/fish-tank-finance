import BigNumber from "bignumber.js";

const prices = {
  'wanUSDT': 1,
  'wanUSDC': 1,
  'WWAN': 1.82663,
  'WAN': 1.82663,
  'WASP': 0.379799,
  'ZOO': 0,
};


export const getPrices = ()=>{
  if (prices['WBTC']) {
    prices['wanBTC'] = prices['WBTC'];
  }
  return prices;
}

export const updatePrice = (symbol0, symbol1, decimals0, decimals1, reserve0, reserve1) => {
  // console.debug('updatePrice', symbol0, symbol1, decimals0, decimals1, reserve0, reserve1)
  let d0 = Number(decimals0);
  let d1 = Number(decimals1);
  if (d0 === 0 || d1 === 0) {
    return;
  }
  let r0 = new BigNumber(reserve0.toString());
  let r1 = new BigNumber(reserve1.toString());
  if (symbol0 === 'wanUSDT' || symbol0 === 'wanUSDC') {
    prices[symbol1] = r0.div(10**d0) / r1.div(10**d1);
  } else if (symbol1 === 'wanUSDT' || symbol1 === 'wanUSDC') {
    prices[symbol0] = r1.div(10**d1) / r0.div(10**d0);
  } else if (prices[symbol0] && !prices[symbol1]) {
    prices[symbol1] = r0.div(10**d0) / r1.div(10**d1) * prices[symbol0];
  } else if (prices[symbol1] && !prices[symbol0]) {
    prices[symbol0] = r1.div(10**d1) / r0.div(10**d0) * prices[symbol1];
  }

  // console.debug('prices', prices);
}
