const {input} = require('../helpers');

const roundColor = (round, color) => round.match(new RegExp(`(\\d+) ${color}`))?.[1] || 0
const maxColor = (rounds, color) => Math.max(...rounds.map(r => roundColor(r, color)))

const parseLine = (line) => {
  const id = parseInt(line.match(/Game (\d+)/)[1]);
  const rounds = line.split(';')

  const red = maxColor(rounds, 'red');
  const blue = maxColor(rounds, 'blue');
  const green = maxColor(rounds, 'green');

  const valid = red <= 12 && blue <=14 && green <= 13;
  const power = red * blue * green;

  return {id, rounds, power, valid};
}

const games = input.lines.map(parseLine);

const part1 = games.filter(({valid}) => valid).reduce((result, {id}) => result + id, 0);
const part2 = games.reduce((result, {power}) => result + power, 0);

console.log(part1, part2);