const { aggregate } = require('@makerdao/multicall');

const config = {
  rpcUrl: 'https://gwan-ssl.wandevs.org:56891',
  multicallAddress: '0xBa5934Ab3056fcA1Fa458D30FBB3810c3eb5145f',
}

const calls = [
  {
    target: '0x29239a9b93a78decec6e0dd58ddbb854b7ffb0af',
    call: ['getReserves()(uint112,uint112,uint32)'],
    returns: [
      ['wasp_reserve0', val => val / 1e18],
      ['wasp_reserve1', val => val / 1e18],
      ['wasp_time', val => val],
    ]
  },
  {
    target: '0x0a886dc4d584d55e9a1fa7eb0821762296b4ec0e',
    call: ['getReserves()(uint112,uint112,uint32)'],
    returns: [
      ['wan_reserve0', val => val / 1e6],
      ['wan_reserve1', val => val / 1e18],
      ['wan_time', val => val],
    ]
  }
]

export const getWaspPrice = async () => {
  let ret = await aggregate(calls, config);
  let waspR0 = ret.results.transformed.wasp_reserve0;
  let waspR1 = ret.results.transformed.wasp_reserve1;
  let wanR0 = ret.results.transformed.wan_reserve0;
  let wanR1 = ret.results.transformed.wan_reserve1;
  const waspPrice = waspR1/waspR0 * (wanR0/wanR1);
  return waspPrice;
}

