import { notification } from 'antd';
import {history} from 'umi';
import { trade_tokens } from '../config';

export function commafy(num, fixed=null, is_decimal=true) {
  if (!num) {
    return '--';
  }

  num = num.toString();

  if (!num.includes('.')) {
    if (is_decimal)
    {
      num += '.0';
    }
  } else {
    if (fixed!=null)
    {
      num = Number(num).toFixed(fixed);
    }
    else
    {
      if (num.indexOf('.') > 3) {
        num = Number(num).toFixed(1);
      } else if (num.length > 5) {
        num = Number(num).toFixed(4);
      }
    }
  }

  return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + ",";
  });
}

export const checkNumber = e => {
  let value = e.target.value;
  value = value.replace(',', '');
  const reg = /^[+]?\d*(\.\d*)?$/;
  if ((!isNaN(value) && reg.test(value) && Number(value) >= 0) || value === '') {
    return true;
  }

  return false;
}

export const calcLockTimeBoost = (lockDays) => {
  let boosting = 0;
  let minLockDays = 8;
  let baseBoost = 0.002;
  let increaseBoost = 0.004;
  if (lockDays >= minLockDays) {
      boosting = boosting + baseBoost + (lockDays-minLockDays) * increaseBoost;
  }
  return boosting;
}

const openNotificationBell = () => {
  const args = {
    message: 'Notification Title',
    description:
      <div>
        {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
        <br />
        {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
        <br />
        {"xxxxxx xxxxxxxx xxxxxxxxx "}
        <a href="" className="button">TX hash on Wanscan</a>
      </div>,
    duration: 0,
    placement: 'bottomRight',
    icon: <img src="assets/notification/bell.png" />,
  };
  notification.open(args);
};

const openNotificationTrophy = () => {
  const args = {
    message: 'Notification Title',
    description:
      <div>
        {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
        <br />
        {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
        <br />
        {"xxxxxx xxxxxxxx xxxxxxxxx "}
        <a href="" className="button">TX hash on Wanscan</a>
      </div>,
    duration: 0,
    placement: 'bottomRight',
    icon: <img src="assets/notification/trophy.png" />,
  };
  notification.open(args);
};

export const openNotificationExclamation = (title) => {
  const args = {
    message: title,
    // description:
    //   <div>
    //     {"xxxxxxxxxxxxxxxxxx xxxxx xxxxx"}
    //     <br />
    //     {"xxxxxxxxxxxxxxxxxx xx   xxxxxxxxxx"}
    //     <br />
    //     {"xxxxxx xxxxxxxx xxxxxxxxx "}
    //     <a href="" className="button">TX hash on Wanscan</a>
    //   </div>,

    duration: 0,
    placement: 'bottomRight',
    icon: <img src="assets/notification/exclamation.png" />,
  };
  notification.open(args);
};

export const openNotificationOpenedBox = (title, item, description, icon, nothing, golden) => {
  const args = {
    // message: 'GOLDEN CHEST HAS BEEN OPENED',
    message: title,
    description:
      <div>
        {"You got \" "}
        <b>{item}</b>
        {"\", "}
        <br />
        
        {description}
        {
          !nothing && <a onClick={()=>{
            history.push('/safe');
          }} className="button">Check your Safe</a>
        }
      </div>,
    duration: 0,
    placement: 'bottomRight',
    icon: <img src={icon} />,
    className: nothing ? `open-chestbox-notification-nothing silverbox` : (golden ? `open-chestbox-notification` : `open-chestbox-notification silverbox`),

  };
  notification.open(args);
};

export const getSymbolFromTokenAddress = (address, chainId) => {
  if (!address) {
    return;
  }
  const tokens = trade_tokens[chainId];
  let symbol;
  let decimals;
  Object.keys(tokens).map(v=>{
    if (tokens[v].address.toLowerCase() === address.toLowerCase()) {
      symbol = v;
      decimals = tokens[v].decimals;
    }
  });

  return {
    symbol,
    decimals
  };
}

export const getSupplyLevel = (supply) => {
  if (supply === 1) {
    return 1;
  }

  const base = 5;

  if (parseInt(supply/base) + 1 <= 5) {
    return parseInt(supply/base) + 1;
  }

  return 5;
}