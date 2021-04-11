import BigNumber from "bignumber.js";

const prices = {
  'wanUSDT': 1,
  'wanUSDC': 1,
  'WWAN': 1.82663,
  'WAN': 1.82663,
  'WASP': 0,
  'ZOO': 0,
  'wanBTC': 0,
  'wanETH': 0,
  'FNX': 0,
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
    console.debug('updatePrice', symbol1, prices[symbol1]);
  } else if (symbol1 === 'wanUSDT' || symbol1 === 'wanUSDC') {
    prices[symbol0] = r1.div(10**d1) / r0.div(10**d0);
    console.debug('updatePrice', symbol0, prices[symbol0]);
  } else if (prices[symbol0] && !prices[symbol1]) {
    prices[symbol1] = r0.div(10**d0) / r1.div(10**d1) * prices[symbol0];
    console.debug('updatePrice', symbol1, prices[symbol1]);
  } else if (prices[symbol1] && !prices[symbol0]) {
    prices[symbol0] = r1.div(10**d1) / r0.div(10**d0) * prices[symbol1];
    console.debug('updatePrice', symbol0, prices[symbol0]);
  }

  // console.debug('prices', prices);
}

export const setPrice = (symbol, price) => {
  if (symbol === 'WAN') {
    prices['WWAN'] = price;
  }
  prices[symbol] = price;
}

export function toByte32(str) {
  return '0x' + paddingRight(toHexString(stringToBytes(str)), 64);
}

function stringToBytes(str) {
  var ch, st, re = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);  // get char
    st = [];                 // set up "stack"
    do {
      st.push(ch & 0xFF);  // push byte to stack
      ch = ch >> 8;          // shift value down by 1 byte
    }
    while (ch);
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat(st.reverse());
  }
  // return an array of bytes
  return re;
}

function toHexString(bytes) {
  return bytes.map(function(byte) {
    return (byte & 0xFF).toString(16)
  }).join('')
}

function padding4(num, length) {
  return (Array(length).join("0") + num).slice(-length);
}

function paddingRight(num, length) {
  return (num + Array(length).join("0")).slice(0, length);
}
