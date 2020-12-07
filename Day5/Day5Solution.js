const boardingPasses = require('./Day5Data.js');

const generateArray = function (maxVal) {
  arr = [];
  for (let i = 0; i < maxVal; i++) {
    arr.push(i);
  }
  return arr;
};

let rows = generateArray(128);
let cols = generateArray(8);

/////////////////////////////////////
//////// Part 1 Solution ////////////
/////////////////////////////////////

class BoardingPass {
  constructor(boardingPass) {
    this.boardingPass = boardingPass;
    this.row = this._deduceLocation('row');
    this.col = this._deduceLocation('col');
    this.seatId = this._calcSeatId(this.row, this.col);
  }

  _deduceLocation(type) {
    const sliceWrongHalf = function (arr, halfToKeep) {
      if ('FL'.includes(halfToKeep)) return arr.slice(0, arr.length / 2);
      return arr.slice(arr.length / 2);
    };

    if (type === 'row') {
      const searchTerm = Array.from(this.boardingPass.slice(0, -3));
      const [row] = searchTerm.reduce((acc, char) => {
        acc = sliceWrongHalf(acc, char);
        return acc;
      }, rows);
      return row;
    }

    if (type === 'col') {
      const searchTerm = Array.from(this.boardingPass.slice(-3));
      const [col] = searchTerm.reduce((acc, char) => {
        acc = sliceWrongHalf(acc, char);
        return acc;
      }, cols);
      return col;
    }
  }

  _calcSeatId() {
    return this.row * 8 + this.col;
  }
}

const boardingPassObjects = boardingPasses.map(pass => new BoardingPass(pass));

const filledSeatIds = boardingPassObjects.map(pass => pass.seatId);

console.log(Math.max(...filledSeatIds));

/////////////////////////////////////
//////// Part 2 Solution ////////////
/////////////////////////////////////

const populateSeatIds = function () {
  let seatIds = [];
  for (let row = 0; row < 128; row++) {
    for (let col = 0; col < 8; col++) {
      seatIds.push(row * 8 + col);
    }
  }
  return seatIds;
};

const seatIds = populateSeatIds();

const emptySeats = seatIds.filter(seat => !filledSeatIds.includes(seat));

const [mySeat] = emptySeats.filter(
  (seat, i, arr) => arr[i - 1] !== seat - 1 && arr[i + 1] !== seat + 1
);

console.log(mySeat);
