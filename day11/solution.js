import {input, utils} from '../helpers';
const image = input.lines.map(line => line.split(''));

const rows = {};
const cols = {};

const galaxies = image.reduce((galaxies, line, y) => {
  line.forEach((symbol, x) => {
    cols[x] ||= [];
    cols[x].push(symbol);

    if (symbol == '#') galaxies.push({x, y});
  });

  if (line.join('').match(/^\.+$/)) rows[y] = true;
  return galaxies;
}, []);

Object.entries(cols).forEach(([column, values]) => {
  cols[column] = !!values.join('').match(/^\.+$/);
});

const path = (valuedImage, coords, expansion) => {
  const currentValue = valuedImage[coords.y][coords.x];
  if (currentValue == 0) return 0;

  const neighbours = [[-1, 0], [+1, 0], [0, -1], [0, +1]]
    .map(([x, y]) => [coords.x + x, coords.y + y])
    .map(([x, y]) => [valuedImage[y]?.[x], x, y])
    .filter(([value]) => !isNaN(Number(value)));

  const minValue = Math.min(...utils.pick(neighbours, 0));
  const [, x, y] = neighbours.find(([value]) => value == minValue);

  let distance = 1
  if (y != coords.y && rows[y]) distance = expansion;
  if (x != coords.x && cols[x]) distance = expansion;

  return path(valuedImage, {x, y}, expansion) + distance;
}

let part1 = 0;
let part2 = 0;

galaxies.forEach((coordsA, galaxyA) => {
  const valuedImage = image.map((line, y) => line.map((_, x) => Math.abs(y - coordsA.y) + Math.abs(x - coordsA.x)));

  galaxies.forEach((coordsB, galaxyB) => {
    if (!galaxyB > galaxyA) return;
    
    part1 += path(valuedImage, coordsB, 2);
    part2 += path(valuedImage, coordsB, 1000000);
  });
});

console.log(part1, part2);
