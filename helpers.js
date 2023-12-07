import {readFileSync} from 'fs';
import {resolve, parse} from 'path';

function readInput(){
  const err = new Error();

  const prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  
  const stack = err.stack;
  Error.prepareStackTrace = prepareStackTrace;

  const script = stack[2].getFileName();

  const directory = parse(script).dir;
  const [, path] = resolve(directory, 'input.txt').split(':');

  return readFileSync(path, 'utf8');
}

export const input = {
  get full(){
    return readInput();
  },
  get lines() {
    return readInput().split('\n');
  }
}

export const utils =  {
  // Reducers
  sum: (result, value) => result + value,
  multiply: (result, value) => result * value,

  // Arrays
  pick: (array, property) => array.map(value => value[property]),

  clump: (array, number) => {
    const remainder = array % number;
    if (remainder) throw new Error(`Array length (${array.length}) not evenly divisible by ${number}.`);
    
    const result = [];

    for(let i = 0; i < array.length; i += number){
      const slice = array.slice(i, i + number);
      result.push(slice);
    }

    return result;
  },
  
  zip: (array1, array2) => {
    const remainder = array1.length - array2.length;
    if(remainder) throw new Error(`Arguments have differring lengths (${array1.length}, ${array2.length}).`);

    return array1.map((value, index) => [value, array2[index]]);
  },

  // String
  extractNumbers: (string, regex) => string.trim().split(regex instanceof RegExp ? regex : /\s+/).map(Number),
  cyan: (string) => `\x1b[36m${string}\x1b[0m`,
}