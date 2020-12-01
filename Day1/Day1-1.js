const expenses = require('./Day1Data.js');

const findTwoValuesAndMultiply = function (arr) {
  const sumTo = 2020;
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (cur + arr[j] === sumTo) return cur * arr[j];
    }
  }
};

console.log(findTwoValuesAndMultiply(expenses));

const findThreeValuesAndMultiply = function (arr) {
  const sumTo = 2020;

  for (let i = 0; i < arr.length; i++) {
    const firstVal = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const secondVal = arr[j];
      // console.log(`Sum First Two: ${firstVal + secondVal}`);
      if (firstVal + secondVal >= sumTo) continue;
      for (let k = j + 1; k < arr.length; k++) {
        // console.log(`Sum Three: ${firstVal + secondVal + arr[k]}`);
        if (firstVal + secondVal + arr[k] === sumTo)
          return firstVal * secondVal * arr[k];
      }
    }
  }
};

console.log(findThreeValuesAndMultiply(expenses));
