import {input, utils} from '../helpers';

const [times, distances] = input.lines.map(line => line.split(':')[1]).map(utils.extractNumbers);

const solve = ([time, distance]) => {
  const sqr = Math.sqrt(Math.pow(time, 2) - (4 * (distance + 1))) / 2;
  const [high, low] = [Math.floor(time/2 + sqr), Math.ceil(time/2 - sqr)];

  return (high - low) + 1;
}

const races = utils.zip(times, distances);
const part1 = races.map(solve).reduce(utils.multiply, 1);

const race = [times, distances].map(values => Number(values.join('')));
const part2 = solve(race)

console.log(part1, part2);