const {readFileSync} = require('fs');
const {resolve, parse} = require('path');

function input(){
  const err = new Error();
  Error.prepareStackTrace = (_, stack) => stack;

  const stack = err.stack;
  const script = stack[2].getFileName();
  
  const directory = parse(script).dir;
  const path = resolve(directory, 'input.txt');

  return readFileSync(path, 'utf8');
}


module.exports.input = {
  get lines() {
    return input().split('\n');
  },
  get full(){
    return input();
  }
}

module.exports.utils =  {
  // Reducers
  sum: (result, value) => result + value,
  multiply: (result, value) => result * value,

  // Arrays
  clump: (array, number) => {
    const remainder = array % number;
    if (remainder) throw `Array length (${array.length}) not evenly divisible by ${number}.`;
    
    const result = [];

    for(let i = 0; i < array.length; i += number){
      const slice = array.slice(i, i + number);
      result.push(slice);
    }

    return result;
  },
  zip: (array1, array2) => {
    const remainder = array1.length - array2.length;
    if(remainder) throw `Arguments have differring lengths (${array1.length}, ${array2.length}).`;

    return array1.map((v1, index) => [v1, v2[index]]);
  },

  // String
  extractNumbers: (string, regex = /\s+/) => string.trim().split(regex).map(Number),
}