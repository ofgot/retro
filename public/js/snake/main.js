import {drawFood, drawGrid, drawMap, drawSnake, setupCanvas} from "./render.js";
import {map} from "./field.js";
import {Snake} from "./snake.js";
import {Direction} from "./direction.js";
import {checkWallCollision, isFoodEaten} from "./collision.js";
import {Food} from "./food.js";
import {loadTiles} from "./manager.js";
import {tileSourcesFood, tileSourcesGround, tileSourcesHead} from "./images.js";

const ctx = setupCanvas();

export const TILE_SIZE = 48;

const tileMap = [];
const tileFood = [];
const tileHead = [];

const food = new Food(ctx.canvas.width, ctx.canvas.height, TILE_SIZE, tileFood);
const snake = new Snake();

await loadTiles(tileMap, tileSourcesGround);
await loadTiles(tileFood, tileSourcesFood);
await loadTiles(tileHead, tileSourcesHead);

let lastTime = performance.now();
let isStopped = false;
let foodImage = tileFood[Math.floor(Math.random() * tileFood.length)];

function gameLoop(timestamp) {
    const deltaTime = performance.now() - lastTime;
    lastTime = performance.now();

    lastTime = timestamp;

    if (!isStopped) {
        snake.move(deltaTime);
    }

    if (isStopped){
        for (let i = 1; i < snake.coords.length; i++) {
            console.log(snake.coords[i]);
        }
    }

    if (isFoodEaten(snake.coords[0], food, TILE_SIZE)) {
        snake.growNextStep();
        food.respawn();
    }

    if (checkWallCollision(snake.coords[0], ctx.canvas.width, ctx.canvas.height, TILE_SIZE)) {
        isStopped = true;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMap(ctx, map, tileMap);
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height, TILE_SIZE);
    drawFood(ctx, food, foodImage);
    drawSnake(ctx, snake,TILE_SIZE, tileHead[0]);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        snake.setDirection(Direction.UP);
        break;
      case 'd':
        snake.setDirection(Direction.RIGHT);
        break;
      case 's':
        snake.setDirection(Direction.DOWN);
        break;
      case 'a':
        snake.setDirection(Direction.LEFT);
        break;
    }
});

// function gameLoop() {
//     snake.move();
//
//     const head = snake.coords[0];
//
//     if (head.x === food.position.x && head.y === food.position.y) {
//       snake.growNextStep();
//       food.position = food.generatePosition();
//     }
//
//     if (checkWallCollision(head, ctx.canvas.width, ctx.canvas.height, tileSize)) {
//       alert('Game Over: Wall hit!');
//       return;
//     }
//
//     if (checkSelfCollision(snake.coords)) {
//       alert('Game Over: You ate yourself!');
//       return;
//     }
//
//     render(ctx, snake, food, tileSize);
//     requestAnimationFrame(() => setTimeout(gameLoop, 130));
// }

// gameLoop();
