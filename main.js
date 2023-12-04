const { readdirSync, mkdirSync, lstatSync, writeFileSync } = require('fs');
const {resolve} = require('path');

const defaultContent = (day) => `
const {input} = require('../helpers');
console.log('Day ${day}');
`.trim();

const folders = readdirSync('.')
  .filter(entry => lstatSync(entry).isDirectory() && entry.match(/day/))
  .map(entry => parseInt(entry.replace('day', '')))
  .sort((a, b) => a - b);

const latest = folders.at(-1);

const day = parseInt(process.argv?.[2] || latest);

const folder = resolve(process.cwd(), `day${day}`);
const solution = resolve(folder, 'solution.js');
const input = resolve(folder, 'input.txt');

const exists = folders.includes(day);

if (!exists){
  mkdirSync(folder);
  
  writeFileSync(input, '');
  writeFileSync(solution, defaultContent(day));
}

require(solution);