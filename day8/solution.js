import {input, utils} from '../helpers';

const [rawInstructions, , ...lines] = input.lines;

const instructions = rawInstructions.split('');
const table = utils.object(lines, /(\w+) = \((\w+), (\w+)/);

const performLookup = (regex, instructions, key, total = 0) => {
  if (key.match(regex)) return total;
  
  const index = instructions[0] == 'L' ? 0 : 1;
  const next =  table[key][index];
  
  instructions.push(instructions.shift());
  return performLookup(regex, instructions, next, total + 1);
}

const part1 = performLookup(/ZZZ/, [...instructions], 'AAA');
console.log(part1);

const cyles = Object.keys(table)
  .filter(key => key.match(/A$/))
  .map(key => performLookup(/Z$/, [...instructions], key));

const part2 = utils.lcd(cyles);
console.log(part2);

