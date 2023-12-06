const {input, utils} = require('../helpers');

const [seedline, ...mappings] = input.lines;

const seeds = seedline.split(':')[1].trim().split(/\s+/).map(Number);
const seedPairs = utils.clump(seeds, 2);

const maps = [];
mappings.forEach((line) => {
  if (line.length == 0) return;
  if (line.match(/map:/)) maps.push([]);

  const [destination, start, length] = line.split(/\s+/).map(Number);
  maps.at(-1).push({destination, start, length, end: start + length});
});

const traceSeed = (value, index = 0) => {
  if (index == maps.length) return value;

  const map = maps[index].find(({start, length}) => value >= start && value < start + length);
  const next = map ? map.destination + (value - map.start) : value;

  return traceSeed(next, index + 1);
}

const filterMappings = (range, index) => {
  const mappings = maps[index] || []
  const [rangeStart, rangeLength] = range;
  
  const mapping = mappings.find(({start, end}) => rangeStart >= start && rangeStart < end);
  if (!mapping) return [[null, range]];

  const remainder = [mapping.end, rangeLength - mapping.length];
  const remaining = remainder[1] > 0 ? filterMappings(remainder, index) : [];

  return [[mapping, [rangeStart, Math.min(rangeLength, mapping.length)]], ...remaining];
}

const traceSeedRange = (seedRange, index = 0) => {
  if (index == maps.length) return [seedRange];

  const mappings = filterMappings(seedRange, index);

  return mappings.flatMap(([mapping, range]) => {
    const [rangeStart, rangeLength] = range;
    const nextRange = mapping ? [mapping.destination + (rangeStart - mapping.start), rangeLength] : range;

    return traceSeedRange(nextRange, index + 1);
  });
}

const part1 = Math.min(...seeds.map((seed) => traceSeed(seed)));
console.log(part1)

const part2 = seedPairs.flatMap((s) => traceSeedRange(s));
console.log(Math.min(...part2.map(x => x[0])))