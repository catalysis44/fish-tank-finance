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
