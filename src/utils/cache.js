import axios from "axios"

let cache = {};

export const axioGet = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  let ret = await axios.get(url);
  cache[url] = ret;
  return ret;
}