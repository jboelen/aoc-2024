const {input} = require('../helpers');
const [times, distances] = input.lines.map(line => line.split(':')[1].trim().split(/\s+/).map(Number));

const solve = ([t, d]) => {
  const sqr = Math.sqrt(Math.pow(t, 2) - (4*(d + 0.5))) / 2;
  const [high, low] = [Math.floor(t/2 + sqr), Math.floor(t/2 - sqr)];

  return high - low;
}

const races = times.map((t, index) => [t, distances[index]]);

const part1 = races.map(solve).reduce((r, wins) => r * wins, 1);
const part2 = solve([Number(times.join('')), Number(distances.join(''))])

console.log(part1, part2)