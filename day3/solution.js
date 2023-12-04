const {input} = require('../helpers');
const {lines} = input;

const width = lines[0].length - 1;
const height = lines.length - 1;

const match = (regex) => lines
  .flatMap((line, i) => [...line.matchAll(regex)]
      .map(match => ({symbol: match[0], col: match.index, row: i})))
  .map(e => ({...e, index: e.col + (e.row * width), length: e.symbol.length}));

const values = match(/\d+/g);
const symbols = match(/[^\.\d]/g);

const positions = [];
const gears = {};

const createPush = (symbol, index) => position => positions.push({symbol, index, position});

symbols.forEach(({symbol, row, col, index}) => {
  const lookUp = row > 0;
  const lookDown = row < height;

  const lookLeft = col > 0;
  const lookRight = col < width;

  const push = createPush(symbol, index);
  
  const up = index - width;
  const down = index + width;

  if (lookUp){
    push(up);

    if (lookLeft) push(up - 1);
    if (lookRight) push(up + 1);
  }

  if (lookDown){
    push(down);

    if (lookLeft) push(down - 1);
    if (lookRight) push(down + 1);
  }

  if (lookLeft) push(index - 1);
  if (lookRight) push(index + 1);
});

const validPoisitions = values.filter(({index, length, symbol}) => {
  const start = index;
  const end = start + length - 1;

  const hit = positions.find(({position}) => position >= start && position <= end);

  if (hit?.symbol == '*'){
    gears[hit.index] ||= [];
    gears[hit.index].push(parseInt(symbol));
  }

  return !!hit;
});

const validGears = Object.values(gears).filter(values => values.length == 2);

const part1 = validPoisitions.reduce((r, {symbol}) => r + parseInt(symbol), 0);
const part2 = validGears.reduce((r, [g1, g2]) => r + g1 * g2, 0);

console.log(part1, part2);
