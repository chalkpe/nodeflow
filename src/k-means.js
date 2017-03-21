const graph = document.getElementById('graph');
const button = document.getElementById('button');

const ctx = graph.getContext('2d');
const colors = [
    '#ec407a', '#00bcd4', '#ffc107', '#66bb6a',
    '#9c27b0', '#cddc39', '#795548'
];

function draw(list, color = '#000000', size = 2){
    for(let v of list){
        ctx.fillStyle = colors[v.cluster] || color;
        let [x, y] = [350 + v[0] * 100, 350 + v[1] * 100];

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function rand(n){
    return Math.floor(Math.random() * n);
}

function pick(array, count) {
    let [res, copy] = [[], array.slice()];
    while(res.length < count) res.push(...copy.splice(rand(copy.length), 1));

    return res;
}

const [a, b, c] = [gaussian(0, 0.9), gaussian(3, 0.5), gaussian(1, 0.5)];
const vectors = [...Array(3000)].map(() => rand(2) ?
    [a.ppf(Math.random()), a.ppf(Math.random())] :
    [b.ppf(Math.random()), c.ppf(Math.random())]);

let total = 0;
let centroides = pick(vectors, 2 + rand(6));

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

    console.log('sum', sum);
    console.log('cen', centroides);
    console.log('vec', vectors);

    draw(centroides, '#808080', 5);
    draw(vectors);

    button.innerHTML = `#${++total}`;
}

draw(vectors, 0, 1);
draw(centroides, '#ff0000', 3);
