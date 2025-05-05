import { Snake } from './snake.js';
import { Direction } from './direction.js';
import { setupCanvas, render } from './render.js';

const ctx = setupCanvas();
const snake = new Snake();

render(ctx, snake);

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

function gameLoop() {
    snake.move();
    render(ctx, snake);
    requestAnimationFrame(() => setTimeout(gameLoop, 140));
}

gameLoop();
