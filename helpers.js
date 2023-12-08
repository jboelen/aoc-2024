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
  extract: (array, regex) => array.map(line => line.match(regex).slice(1)),
  object: (array, regex) => Object.fromEntries((regex ? utils.extract(array, regex) : array).map(([key, ...values]) => [key, values])),

  // Arrays
  pick: (array, property) => array.map(value => value[property]),
  range: (size, start = 0, increment = 1) => Array.from({length: size}, (_, i) => start + increment * i),

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

  primes: (num) => {
    const sqrt =  Math.floor(Math.sqrt(num));
    const numbers = utils.range(num + 1);
    
    numbers[1] = 0;
  
    utils.range(sqrt+1)
      .slice(2)
      .forEach(i => utils.range(num - i*i, i*i, i).forEach(j => numbers[j] = 0))
    
    return numbers.filter(Boolean);
  },

  lcd: (array, max = 500) => {
    let result = 1;
    let values = [...array];
    
    let primes = utils.primes(max);
    let prime = primes.shift();
    
    while(values.some(n => n > 1) && prime) {
      if (values.some(value => value % prime == 0)){
        values = values.map(value => value % prime == 0 ? value / prime : value);
        result = result * prime;

        continue;
      }
      
      prime = primes.shift();
    }

    return result
  },

  // String
  extractNumbers: (string, regex) => string.trim().split(regex instanceof RegExp ? regex : /\s+/).map(Number),
  cyan: (string) => `\x1b[36m${string}\x1b[0m`,

  // Other
  benchmark: (name, times, fn) => {
    const MS_PER_NS = 1e-6;
    const NS_PER_SEC = 1e9;

    const average = utils.range(100).reduce(([r1, r2]) => {
      const time = process.hrtime()
      fn();
      const [d1, d2] = process.hrtime(time);

      return [r1 + d1, r2 + d2];
    }, [0, 0]).map(n => n / times);


    console.log(`Benchmark for ${name} took ${ (average[0] * NS_PER_SEC + average[1]) * MS_PER_NS } milliseconds`);
  }
}