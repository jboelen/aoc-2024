import {input, utils} from '../helpers';

const roundColor = (round, color) => round.match(new RegExp(`(\\d+) ${color}`))?.[1] || 0
const maxColor = (rounds, color) => Math.max(...rounds.map(r => roundColor(r, color)))

const parseLine = (line) => {
  const [id, ...rounds] = line.match(/(?<=Game.* )([\w\d\s,]+)/g);

  console.log(rounds)

  const red = maxColor(rounds, 'red');
  const blue = maxColor(rounds, 'blue');
  const green = maxColor(rounds, 'green');

  const valid = red <= 12 && blue <=14 && green <= 13;
  const power = red * blue * green;

  return {id, rounds, power, valid};
}

const allGames = input.lines.map(parseLine);
const validGames = utils.filter(allGames, 'valid');

const part1 = utils.sumBy(validGames, 'id');
const part2 = utils.sumBy(allGames, 'power');

console.log(part1, part2);
