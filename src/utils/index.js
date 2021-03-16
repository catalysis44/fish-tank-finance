export function commafy(num) {
  if (!num) {
    return '0';
  }

  num = num.toString();

  if (!num.includes('.')) {
    num += '.0';
  } else {
    if (num.indexOf('.') > 3) {
      num = Number(num).toFixed(1);
    } else if (num.length > 5) {
      num = Number(num).toFixed(4);
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