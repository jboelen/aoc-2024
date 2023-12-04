const {input} = require('../helpers');

const copies = new Array(input.lines.length).fill(1);

const cards = input.lines.map((line, index) => {
  const [, card, numbers] = line.match(/(\d+):(.*)/);
  const [winning, mine] = numbers.split('|').map(numbers => numbers.trim().split(/\s+/).map(Number));

  const matches = winning.filter((number) => mine.includes(number));
  const value = matches.length ? Math.pow(2, matches.length - 1) : 0;

  matches.forEach((_, mIndex) => {
    copies[index + mIndex + 1] += copies[index];
  });

  return {
    card,
    winning,
    mine,
    matches,
    value,
    copies: copies[index]
  }
})

const [part1, part2] = cards.reduce(([r1, r2], {value, copies}) => [r1 + value, r2 + copies], [0, 0]);
console.log(part1, part2);