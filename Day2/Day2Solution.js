const passwords = require('./Day2Data.js');

const parsedPasswords = passwords.reduce((acc, el) => {
  const [reps, char, pw] = el.split(' ');
  const [minReps, maxReps] = reps.split('-').map(Number);
  const pwObj = {
    minReps,
    maxReps,
    char: char[0],
    pw,
  };
  acc.push(pwObj);
  return acc;
}, []);

const checkIfValidPasswordOld = function (pwObj) {
  const charCount = Array.from(pwObj.pw).reduce((acc, letter) => {
    letter == pwObj.char && acc++;
    return acc;
  }, 0);

  if (charCount >= pwObj.minReps && charCount <= pwObj.maxReps) return true;
  return false;
};

const validPasswordsOld = parsedPasswords.filter(pwObj =>
  checkIfValidPasswordOld(pwObj)
).length;

const checkIfValidPasswordNew = function (pwObj) {
  const { minReps: loc1, maxReps: loc2, char, pw } = pwObj;
  const charsOfInterest = [pw[loc1 - 1], pw[loc2 - 1]];
  const numMatches = charsOfInterest.reduce((acc, el) => {
    if (el === char) acc++;
    return acc;
  }, 0);
  return numMatches === 1;
};

const validPasswordsNew = parsedPasswords.filter(pwObj =>
  checkIfValidPasswordNew(pwObj)
).length;

console.log(validPasswordsOld);
console.log(validPasswordsNew);
