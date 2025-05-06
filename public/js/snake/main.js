import {drawMap, drawSnake, setupCanvas} from "./render.js";
import {loadTiles, map} from "./field.js";
import {Snake} from "./snake.js";
import {Direction} from "./direction.js";

const ctx = setupCanvas();

export const TILE_SIZE = 32;
const snake = new Snake();
const tileImages = [];

await loadTiles(tileImages);

let lastTime = performance.now();

function gameLoop(timestamp) {
    const deltaTime = performance.now() - lastTime;
    lastTime = performance.now();


    lastTime = timestamp;

    snake.move(deltaTime);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMap(ctx, map, tileImages);
    drawSnake(ctx, snake, TILE_SIZE);
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
