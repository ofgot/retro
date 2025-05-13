import {draw, drawGameOver, drawNext} from "./Renderer.js";
import {Arena} from "./Arena.js";
import {Player} from "./Player.js";
import {getDropInterval} from "./Utils.js";

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
context.scale(20, 20);

const nextCanvas = document.getElementById('next-canvas');
const nextContext = nextCanvas.getContext('2d');
nextContext.scale(20, 20);

const arena = new Arena(12, 22);
const player = new Player(arena);

let isPaused = false;

let dropCounter = 0;
let lastTime = 0;

let rows = arena.matrix.length;
let cols = arena.matrix[0].length;
let tileSize = 1;

function update(time = 0) {
    if (isPaused) {
        requestAnimationFrame(update);
        return;
    }
    if (player.isGameOver) {
        requestAnimationFrame(update);
        drawGameOver(context, canvas);
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > getDropInterval(player.level)) {
        player.drop();
        dropCounter = 0;
    }

    draw(context, canvas, arena, player, tileSize, cols, rows);
    drawNext(nextContext, nextCanvas, player.nextMatrix, tileSize, cols, rows);

    document.getElementById('score').textContent = player.score;
    document.getElementById('level').textContent = player.level;
    document.getElementById('lines').textContent = player.lines;

    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.key === 'a') player.move(-1);
    else if (event.key === 'd') player.move(1);
    else if (event.key === 's') player.drop();
    else if (event.key === 'w') player.rotate(-1);
});

document.getElementById('restart').addEventListener('click', () => {
    player.reset();
    arena.clear();
    player.score = 0;
    player.level = 1;
    player.lines = 0;
    player.isGameOver = false;
    isPaused = false;
});

document.getElementById('pause').addEventListener('click', () => {
    isPaused = !isPaused;
    document.getElementById('pause').textContent = isPaused ? 'Resume' : 'Pause';
});

const musicBtn = document.getElementById('music');
const audio = document.getElementById('tetris-music');

if (audio.paused) {
    musicBtn.classList.add('muted');
}

musicBtn.addEventListener('click', () => {
    const isPlaying = !audio.paused;

    if (isPlaying) {
        audio.pause();
        musicBtn.classList.add('muted');
    } else {
        audio.play();
        musicBtn.classList.remove('muted');
    }
});


player.reset();
update();