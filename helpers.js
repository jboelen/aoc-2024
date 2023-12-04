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