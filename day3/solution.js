const {input} = require('../helpers');
const {lines} = input;

const width = lines[0].length - 1;
const height = lines.length - 1;

const values = lines.flatMap((line, i) => [...line.matchAll(/\d+/g)].map(match => ({value: match[0], col: match.index, row: i}))).map(e => ({...e, pos: e.col + (e.row * width), length: e.value.length}))
const symbols = lines.flatMap((line, i) => [...line.matchAll(/[^\.\d]/g)].map(match => ({value: match[0], col: match.index, row: i}))).map(e => ({...e, pos: e.col + (e.row * width), length: e.value.length}))

const positions = [];
const gears = {};

const add = symbol => position => {
    positions.push({symbol, position})
}

symbols.forEach(s => {
    const lookUp = s.row > 0;
    const lookDown = s.row < height;

    const lookLeft = s.col > 0;
    const lookRight = s.col < width;

    const push = add(s);

    if (lookUp){
        const up = s.pos - width
        push(up);

        if(lookLeft){
            push(up - 1);
        }

        if(lookRight){
            push(up + 1);
        }
    }

    if (lookDown){
        const down = s.pos + width
        push(down);

        if(lookLeft){
            push(down - 1);
        }

        if(lookRight){
            push(down + 1);
        }
    }

    if(lookLeft){
        push(s.pos - 1);
    }

    if(lookRight){
        push(s.pos + 1);
    }
})

const hits = values.filter(v =>{
    const start = v.pos
    const end = start + v.length - 1;

    const hit = positions.find(({position}) => position >= start && position <= end);
    if (hit == undefined) return false;

    if (hit.symbol.value == '*'){
        gears[hit.symbol.pos] ||= [];
        gears[hit.symbol.pos].push(v.value);
    }

    return true;
});

console.log(hits.reduce((r, v) => r + parseInt(v.value), 0));

const gr = Object.entries(gears).reduce((r, [k, v]) => {
    if (v.length == 2){
        return r + (v[0] * v[1])
    }

    return r
}, 0)

console.log(gr)