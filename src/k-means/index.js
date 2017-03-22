import Random from 'random-js';
import gaussian from 'gaussian';

const graph = document.getElementById('graph');
const ctx = graph.getContext('2d');

const r = new Random();
const button = document.getElementById('button');

const colors = [
    '#ec407a', '#00bcd4', '#ff9800', '#66bb6a', '#9c27b0',
    '#cddc39', '#795548', '#3f51b5', '#ffeb3b', '#009688'
];

function draw(list, color = '#000000', size = 3){
    for(let v of list){
        ctx.fillStyle = colors[v.cluster] || color;
        let [x, y] = [350 + v[0] * 100, 350 + v[1] * 100];

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const [a, b, c] = [gaussian(0, 0.9), gaussian(3, 0.5), gaussian(1, 0.5)];
const vectors = [...Array(10000)].map(() => r.bool() ?
    [a.ppf(Math.random()), a.ppf(Math.random())] :
    [b.ppf(Math.random()), c.ppf(Math.random())]);

let total = 0;
let centroides = r.sample(vectors, r.integer(3, colors.length));

function run(){
    let sum = [];

    for(let v of vectors){
        v.cluster = centroides
            .map((c, i) => [i, (v[0] - c[0]) ** 2 + (v[1] - c[1]) ** 2])
            .reduce((a, b) => a[1] < b[1] ? a : b)[0];

        sum[v.cluster] = sum[v.cluster] || { x: 0, y: 0, count: 0 };

        sum[v.cluster].count++;
        sum[v.cluster].x += v[0];
        sum[v.cluster].y += v[1];
    }

    centroides = sum.map(({ count, x, y }) => [x / count, y / count]);

    draw(vectors);
    draw(centroides, '#000000', 2);

    button.innerHTML = `#${++total}`;
    setTimeout(run, 0);
}

draw(vectors, 0, 1);
draw(centroides, '#ff0000', 3);

button.onclick = run;
