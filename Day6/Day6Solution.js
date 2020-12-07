const formsByGroup = require('./Day6Data.js');

const countUniqueYesPerGroup = function (groupAnswers) {
  const allAnswersFromGroup = groupAnswers.replace(/\n/g, '');
  const uniqueAnswersFromGroup = new Set(allAnswersFromGroup);
  return uniqueAnswersFromGroup.size;
};

const sumAllYess = function (arr) {
  const sum = arr.reduce((acc, el) => acc + el, 0);
  return sum;
};

const uniqueYessPerGroup = formsByGroup.map(el => countUniqueYesPerGroup(el));

const allYessSummed = sumAllYess(uniqueYessPerGroup);

console.log('Part 1 answer: ', allYessSummed);

/////////////////////////////////////////
/////////// Part 2 solution /////////////
/////////////////////////////////////////

const formsByGroupArrays = formsByGroup.map(el => el.split(/\n/g));

const yessForEverybody = function (arr) {
  if (arr.length === 1) return arr[0].length;

  let answersArray = [...arr];
  let allYess = [];
  const person1Answers = answersArray.shift();

  for (let letter of person1Answers.split('')) {
    const allAnsweredYes = answersArray.every(el => el.includes(letter));
    if (allAnsweredYes) allYess.push(letter);
  }
  return allYess.length;
};

const everyoneInGroupSaidYes = formsByGroupArrays.map(el =>
  yessForEverybody(el)
);

const groupAllYessSummed = sumAllYess(everyoneInGroupSaidYes);

console.log('Part 2 answer: ', groupAllYessSummed);
