const {input} = require('../helpers');

const [seedline, ...mappings] = input.lines;
const seeds = seedline.split(':')[1].trim().split(/\s+/).map(Number);

const seedPairs = [];
for(let i = 0; i < seeds.length; i+=2){
  seedPairs.push([seeds[i], seeds[i + 1]]);
}

const maps = {};
const mapIndex = {};

let currentMap = '';
mappings.forEach((line) => {
  if (line.length == 0) return;

  if(line.match(/map:/)){
    const [, mapName] = line.match(/^(.*) map:/);
    const [from, to] = mapName.split('-to-');
    mapIndex[from] = to;

    currentMap = mapName;
    maps[currentMap] = [];
    return;
  }

  const [destination, start, length] = line.split(/\s+/).map(Number);
  maps[currentMap].push({destination, start, length})
});

const doLookup = (from, value) => {
  const to = mapIndex[from];
  if (!to) return value;

  const mapName = [from, '-to-', mapIndex[from]].join('');
  const map = maps[mapName].find(({start, length}) => value >= start && value < start + length);

  if (map){
    const next = map.destination + (value - map.start);
    return doLookup(to, next);
  }

  return doLookup(to, value);
}

const findRanges = (maps, seed, range) => {
  const map = maps.find(({start, length}) => seed >= start && seed < start + length);
  const result = []

  if (!map) return [{map, seed, range}];
  result.push({map, seed, range: Math.min(range, map.length)});

  const excess = range - map.length;
  if (excess > 0){
    result.push(...findRanges(maps, map.start + map.length, excess));
  }

  return result;
}

const doLookup2 = (from, [seed, range]) => {
  const to = mapIndex[from];
  if (!to) return [[seed, range]];

  const mapName = [from, '-to-', mapIndex[from]].join('');
  const ranges = findRanges(maps[mapName], seed, range);
  const result = []

  ranges.forEach(({map, seed, range}) => {
    if (!map){
      result.push(...doLookup2(to, [seed, range]));
    } else {
      result.push(...doLookup2(to, [map.destination + (seed - map.start), range]));
    }
  })

  return result;
}

const part1 = Math.min(...seeds.map((s) => doLookup('seed', s)));
console.log(part1)

const part2 = seedPairs.flatMap((s) => doLookup2('seed', s));
console.log(Math.min(...part2.map(x => x[0])))