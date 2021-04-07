import axios from "axios"
import sleep from "ko-sleep";

let cache = {};

export const axioGet = async (url) => {
  if (cache[url]) {
    return cache[url];
  }
  if (!url) {
    console.error('url is undefined', url);
    throw new Error('url is undefined');
  }

  let time = 300;
  while(time-- > 0) {
    try {
      let ret = await axios.get(url);
      cache[url] = ret;
      return ret;
    } catch (err) {
      console.error('axioGet', err);
      await sleep(1000);
    }
  }
}
