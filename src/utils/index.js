import { notification, Switch } from 'antd';


export function commafy(num, fixed=null) {
  if (!num) {
    return '0';
  }

  num = num.toString();

  if (!num.includes('.')) {
    num += '.0';
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

const openNotificationExclamation = () => {
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
    icon: <img src="assets/notification/exclamation.png" />,
  };
  notification.open(args);
};

export const openNotificationBottle = (title, item, description) => {
  const args = {
    // message: 'GOLDEN CHEST HAS BEEN OPENED',
    message: title,
    description:
      <div>
        {"You got \" "}
        <b>{item}</b>
        {"\", "}
        <br />
        {/* {"your boost card has been transfered to your wallet "} */}
        {description}
        <a href="" className="button">Check your collection</a>
      </div>,
    duration: 0,
    placement: 'bottomRight',
    icon: <img src="assets/notification/bottle.png" />,
    className: 'open-chestbox-notification',

  };
  notification.open(args);
};
