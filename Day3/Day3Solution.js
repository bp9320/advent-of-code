const hillTreeMap = require('./Day3Data.js');

///////////////////////////////////////////////////////////
///  Self inflicted rule: no loops allowed ////////////////
///////////////////////////////////////////////////////////

// Problem 1
const xStep = 3;

const gridWidth = hillTreeMap[0].length;

const numTreesHit = hillTreeMap.reduce((acc, row, i) => {
  if (row[(i * xStep) % gridWidth] === '#') acc++;
  return acc;
}, 0);

console.log(numTreesHit);

// Problem 2

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

const iterations = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const findTreesHit = function (xStep, yStep, arr) {
  const gridWidth = arr[0].length;
  const numTreesHit = arr
    .filter((_, i) => (i + yStep) % yStep === 0)
    .reduce((acc, row, i) => {
      if (row[(i * xStep) % gridWidth] === '#') acc++;
      return acc;
    }, 0);
  return numTreesHit;
};

const treesHitPerIteration = iterations.map(iteration =>
  findTreesHit(iteration[0], iteration[1], hillTreeMap)
);

const treesHitMultiplied = treesHitPerIteration.reduce((acc, el) => {
  acc *= el;
  return acc;
});

console.log(treesHitMultiplied);

//////////////////////////////////////////////////////////////////
///////////// never let me banish loops again ////////////////////
//////////////////////////////////////////////////////////////////
