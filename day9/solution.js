import {input, utils} from '../helpers';
const report = utils.extractNumbers(input.lines);

const extrapolate = (line) => {
  if (line.every(n => n == 0)) return 0;
  
  const next = line.reduce((result, number, index) => {
    if (index + 1 == line.length) return result;
    
    const difference = line[index + 1] - number;
    result.push(difference);

    return result;
  }, []);

  return line.at(-1) + extrapolate(next);
}

const part1 = report.map(extrapolate).reduce(utils.sum);
console.log(part1);

const etalopartxe = (line) => extrapolate(line.reverse());
const part2 = report.map(etalopartxe).reduce(utils.sum);
console.log(part2);
