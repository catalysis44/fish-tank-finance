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

export const insertHistory = (type, time, tokenId, name, price, symbol, txHash) => {
  db.get(type).push(
    { time, tokenId, name, price, symbol, txHash, key: time }
  ).write();
}
