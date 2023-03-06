const checkLengthString = (str, len) => str.length <= len;

const isPalindrome = (str) => {
  const normStr = str.toLowerCase().trim().replaceAll(' ', '');
  const reversStr = normStr.split('').reverse().join('');
  return normStr === reversStr;
};

const getNambersFromString = (str) => {
  let result = '';
  const normStr = str.toString().replaceAll(' ', '');
  for (let i = 0; i < normStr.length; i++) {
    if (!isNaN(normStr[i])) {
      result += normStr[i];
    }
  }
  if (result.length === 0) {
    return NaN;
  } else {
    return parseInt(result, 10);
  }
};

const getString = (str, len, addStr) => {
  let subStr = '';
  const subStrLength = len - str.length;
  if (subStrLength <= 0) {
    return str;
  }
  const itter = Math.floor(subStrLength / addStr.length);
  for (let i = 1; i <= itter; i++) {
    subStr = subStr + addStr;
  }
  const restStrLength = subStrLength - itter * addStr.length;
  const restStr = addStr.slice(0, restStrLength);
  subStr = restStr + subStr;
  return subStr + str;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {getNambersFromString, getRandomInt};
