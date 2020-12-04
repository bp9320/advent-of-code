const separatedPassports = require('./Day4Data.js');

///////////////////////
// Data Manipulation //
///////////////////////

const makePassportsDictionaries = function (list) {
  const passportObj = {};
  const fields = list.split(' ');
  for (let field of fields) {
    const [key, value] = field.split(':');
    passportObj[key] = value;
  }
  return passportObj;
};

const passports = separatedPassports.map(el => makePassportsDictionaries(el));

////////////////////////
// Solution to Part 1 //
////////////////////////

const checkIsValidPassport = function (passport) {
  const numKeys = Object.keys(passport).length;
  if (numKeys === 8 || (numKeys === 7 && !passport.hasOwnProperty('cid')))
    return true;
  return false;
};

const numValidPassports = passports.filter(el => checkIsValidPassport(el))
  .length;

console.log(numValidPassports);

////////////////////////
// Solution to Part 2 //
////////////////////////

const checkNumberIsBetween = function (value, lowerLimit, upperLimit) {
  return value >= lowerLimit && value <= upperLimit;
};

const checkIsValidEyeColor = function (
  ecl,
  colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
) {
  return colors.includes(ecl);
};

const checkIsValidPassportId = function (pid) {
  return /^[0-9]{9}$/.test(pid);
};

const checkIsValidHeight = function (hgt) {
  const value = Number(hgt.slice(0, -2));
  const units = hgt.slice(-2);
  if (!['in', 'cm'].includes(units)) return false;
  if (units === 'in') return checkNumberIsBetween(value, 59, 76);
  if (units === 'cm') return checkNumberIsBetween(value, 150, 193);
};

const checkIsValidHairColor = function (hcl) {
  return /^#([a-f0-9]{6})$/.test(hcl);
};

const newCheckPassportIsValid = function (passport) {
  return (
    // check valid birthyear (1920 - 2002)
    passport.hasOwnProperty('byr') &&
    checkNumberIsBetween(Number(passport.byr), 1920, 2002) &&
    // check  valid issue year (2010 - 2020)
    passport.hasOwnProperty('iyr') &&
    checkNumberIsBetween(Number(passport.iyr), 2010, 2020) &&
    // check valid expiration year (2020 - 2030)
    passport.hasOwnProperty('eyr') &&
    checkNumberIsBetween(Number(passport.eyr), 2020, 2030) &&
    // check valid height
    passport.hasOwnProperty('hgt') &&
    checkIsValidHeight(passport.hgt) &&
    // check valid hair color
    passport.hasOwnProperty('hcl') &&
    checkIsValidHairColor(passport.hcl) &&
    // check valid eye color
    passport.hasOwnProperty('ecl') &&
    checkIsValidEyeColor(passport.ecl) &&
    // check valid passport id
    passport.hasOwnProperty('pid') &&
    checkIsValidPassportId(passport.pid)
  );
};

const newNumValidPassports = passports.filter(el => newCheckPassportIsValid(el))
  .length;

console.log(newNumValidPassports);
