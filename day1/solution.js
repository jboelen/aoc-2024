import {input} from '../helpers';

const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const searchers = [/\d/g, ...nums.map(n => new RegExp(n, "g"))];

const parseValue = (value) => (nums.indexOf(value) + 1) || value;
const parseLine = (line) => searchers.flatMap(s => [...line.matchAll(s)]).sort((a, b) => a.index - b.index).map(r => r[0]);

const sumLine = (result, digits) => result + parseInt([digits.at(0), digits.at(-1)].map(parseValue).join(''));
const sumLines = (lines) => lines.reduce(sumLine, 0);

const lines = input.lines.map(parseLine);

const part1 = lines.map(digits => digits.filter(d => d.match(/\d/)));
const part2 = lines;

console.log(...[part1, part2].map(sumLines))
