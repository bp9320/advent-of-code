const ruleList = require('./Day7Data.js');

// console.log(ruleList);

const ruleListNoBagsOrPeriods = ruleList.map(rule =>
  rule.replace(/( bag)s?/g, '').replace('.', '')
);

// console.log(ruleListNoBagsOrPeriods);

const parseRules = function (rule, parentObj) {
  const [containerColor, contents] = rule.split(' contain ');
  const contentsParsed = contents
    .split(', ')
    .map(el => el.split(/(?<=[0-9]) /));
  parentObj[containerColor] = contentsParsed.reduce((acc, el) => {
    acc[el[1]] = Number(el[0]);
    return acc;
  }, {});
  return parentObj;
};

const parsedRules = ruleListNoBagsOrPeriods.reduce(
  (acc, el) => parseRules(el, acc),
  {}
);

const bagsContainingSpecifiedColor = function (color, rulesDict) {
  const containsSpecifiedColor = Object.entries(rulesDict)
    .filter(rule => rule[1].hasOwnProperty(color))
    .map(el => el[0]);
  return containsSpecifiedColor.length;
};

console.log(bagsContainingSpecifiedColor('shiny gold', parsedRules));
