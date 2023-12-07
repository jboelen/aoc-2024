import { readdirSync, mkdirSync, lstatSync, writeFileSync } from 'fs';
import {resolve} from 'path';

const defaultContent = (day) => `
  import {input, utils} from '../helpers';
  console.log(utils.cyan(input.full));
`.trim().replace('  ', '');

const folders = readdirSync('.')
  .filter(entry => lstatSync(entry).isDirectory() && entry.match(/day/))
  .map(entry => parseInt(entry.replace('day', '')))
  .sort((a, b) => a - b);

const latest = folders.at(-1);
const day = parseInt(process.argv?.[2] || latest);

const folder = resolve(process.cwd(), `day${day}`);
const exists = folders.includes(day);

const solution = resolve(folder, 'solution.js');
const input = resolve(folder, 'input.txt');

if (!exists){ 
  mkdirSync(folder);
  
  writeFileSync(input, `Day ${day}`);
  writeFileSync(solution, defaultContent(day));
}

await import(solution);