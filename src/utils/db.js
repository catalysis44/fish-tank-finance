import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('zoo-keeper-history');
let db;
if (typeof localStorage === 'undefined') {
  db = {};
} else {
  db = low(adapter);
  db.defaults({
    purchase: [],
    sale: [],
    chest: [],
  }).write();
}

//------order----------
export const getHistory = (type) => {
  return db.get(type).sortBy('time').value().reverse();
}

export const getPendingSellHistory = (type) => {
  return db.get(type).filter(v => {
    if (v.status === 'pending' && ((Date.now() - v.time) / 1000 < 3600*24*15) ) {
      return true;
    }
    return false;
  }).value();
}

export const updateHistory = (type, time, status) => {
  db.get(type).find({ time }).assign({ status }).write();
}

export const insertHistory = (type, time, tokenId, name, image, level, price, symbol, txHash, status, blockNumber, orderId) => {
  db.get(type).push(
    { time, tokenId, name, image, level, price, symbol, txHash, status, blockNumber, orderId, key: time }
  ).write();
}
