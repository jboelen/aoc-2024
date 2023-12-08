import {input, utils} from '../helpers';

const [map, , ...lines] = input.lines;
const table = utils.objectFrom(lines, /(\w+) = \((\w+), (\w+)/);

const translateSide = (side) => side == 'L' ? 0 : 1; 
const instructions = map.replaceAll(/[LR]/g, translateSide).split('');

const performLookup = (instructions, key, goal, total = 0) => {
  if (key.match(goal)) return total;
  
  const index = instructions[0];
  const next =  table[key][index];
  
  instructions.push(instructions.shift());
  return performLookup(instructions, next, goal, total + 1);
}

const part1 = performLookup([...instructions], 'AAA', /ZZZ/);
console.log(part1);

const cycles = Object.keys(table)
  .filter(key => key.match(/A$/))
  .map(key => performLookup([...instructions], key, /Z$/));

const part2 = utils.lcm(cycles);
console.log(part2);
