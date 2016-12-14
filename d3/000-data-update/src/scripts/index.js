require('../stylesheets/index.css');

const d3 = require('d3');

const root = document.createElement('div');

const getN = (min, max) => (Math.random() * (max - min) + min) | 0;
const generateData = (n) => Array(n).fill(0).map(x => getN(50, 300));

const width = 800;
const height = 300;

document.body.appendChild(root);

const svg = d3.select(root).append('svg');

svg.
    attr('width', width).
    attr('height', height).
    style('margin', '0 auto')
;

const g = svg.append('g');

const getRGBColor = (n, frequency = 0.3) => [
    Math.sin(frequency * n + 0) * 127 + 128,
    Math.sin(frequency * n + 2 * Math.PI / 3) * 127 + 128,
    Math.sin(frequency * n + 4 * Math.PI / 3) * 127 + 128,
].map(n => Math.round(n)).join(',');

const update = (el, data) => {
    const barWidth = 15;
    const spacing = 1;

    const update = el.selectAll('.bar').data(data);
    
    const enter = update.enter().append('rect').attr('class', 'bar');

    const exit = update.exit();

    enter.
        attr('width', barWidth).
        attr('height', 0).
        attr('y', (d) => height).
        attr('x', (d, i) => (barWidth + spacing) * i)
    ;

    enter.merge(update).
        transition().
        attr('y', (d) => height - d).
        attr('height', (d) => d).
        attr('fill', (d, i) =>
            `rgb(${getRGBColor(i)})`
        )
    ;

    exit.transition().
        attr('height', 0).
        attr('y', height).
        remove()
    ;
};

update(g, generateData(getN(30, 50)));

setInterval(() => {
    update(g, generateData(getN(30, 50)));
}, 1000);
