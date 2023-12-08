import {input, utils} from '../helpers';

const copies = new Array(input.lines.length).fill(1);

const cards = input.lines.map((line, index) => {
  const [, card, numbers] = line.match(/(\d+):(.*)/);
  const [winning, mine] = numbers.split('|').map(utils.extractNumbers);

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

const part1 = utils.pick(cards, 'value').reduce(utils.sum);
console.log(part1);

const part2 = utils.pick(cards, 'copies').reduce(utils.sum);
console.log(part2);
