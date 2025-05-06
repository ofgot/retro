import {TILE_SIZE} from "./main.js";

export function setupCanvas() {
    const canvas = document.getElementById('gameCanvas');
    return canvas.getContext('2d');
}

export function drawSnake(ctx, snake, tileSize) {
    ctx.fillStyle = '#F6733A';
    for (let segment of snake.coords) {
        ctx.fillRect(
            segment.x * tileSize,
            segment.y * tileSize,
            tileSize,
            tileSize
        );
    }
}

export function drawMap(ctx, map, tileImages) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const tileValue = map[y][x];
            const image = tileImages[tileValue - 1];
            if (image) {
                ctx.drawImage(image, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}