import {input, utils} from '../helpers';
const report = input.lines.map(l => utils.extractNumbers(l))

const extrapolate = (side, line) => {
  if (line.every(n => n == 0)) return 0;

  const [multiplier, index] = side == 'left' ? [1, 0] : [-1, -1];
  
  const next = line.reduce((result, number, index) => {
    if (index + 1 == line.length) return result;

    const difference = number - line[index + 1];
    const value = multiplier * difference;

    result.push(value);

    return result;
  }, []);

  return line.at(index) + extrapolate(side, next)
}

const [part2, part1] = ['left', 'right'].map(side => report.map(line => extrapolate(side, line)).reduce(utils.sum))
console.log(part1);
console.log(part2);
