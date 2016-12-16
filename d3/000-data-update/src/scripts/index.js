require('../stylesheets/index.css');

const d3 = require('d3');

const root = document.createElement('div');

const getN = (min, max) => (Math.random() * (max - min) + min) | 0;
const generateData = (n) => Array(n).fill(0).map(x => getN(100, 500));

const width = 800;
const height = 300;

document.body.appendChild(root);

const svg = d3.select(root).append('svg');

svg.
    attr('width', width).
    attr('height', height)
;

const g = svg.append('g');

const update = (el, data) => {
    const xPadding = 40;

    const xSpacing = 3;

    const xScale =
        d3.scaleLinear().
        domain([0, data.length]).
        range([xPadding, width - xPadding])
    ;

    const yPadding = 20;

    const yScale =
        d3.scaleLinear().
        domain([0, d3.max(data, (d) => d)]).
        range([height - yPadding, yPadding])
    ;

    const xAxis =
        d3.axisBottom(xScale).
        ticks(data.length);

    const yAxis =
        d3.axisLeft(yScale);

    el.selectAll('g.axis.x').remove();

    el.append('g').
        attr('class', 'axis x').
        attr('transform', `translate(0, ${height - 20})`).
        call(xAxis);

    el.selectAll('g.axis.y').remove();

    el.append('g').
        attr('class', 'axis y').
        attr('transform', `translate(${xPadding}, 0)`).
        call(yAxis);

    const update = el.selectAll('.bar').data(data);
    
    const enter = update.enter().append('rect').attr('class', 'bar');

    const exit = update.exit();

    const color =
        d3.scaleSequential(d3.interpolatePlasma).
        domain([0, data.length]);

    enter.
        attr('x', (d, i) => xScale(i) + xSpacing / 2).
        attr('width', (d, i) => (width / data.length) - xSpacing).
        attr('y', (d) => height - yPadding)
    ;

    enter.merge(update).
        transition().
        attr('x', (d, i) => xScale(i) + xSpacing / 2).
        attr('width', (d, i) => (width / data.length) - xSpacing).
        attr('y', (d) => height - yPadding - yScale(d)).
        attr('height', (d) => yScale(d)).
        attr('fill', (d, i) => `${color(i)}`)
    ;

    exit.transition().
        attr('height', 0).
        attr('y', d => height - yPadding).
        remove()
    ;
};

update(g, generateData(getN(30, 50)));

setInterval(() => {
    update(g, generateData(getN(30, 50)));
}, 2000);
