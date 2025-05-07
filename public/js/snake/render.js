import {TILE_SIZE} from "./main.js";

export function setupCanvas() {
    const canvas = document.getElementById('gameCanvas');
    return canvas.getContext('2d');
}

export function drawFood(ctx, food, imageFood) {
    ctx.drawImage(
        imageFood,
        food.position.x * food.tileSize,
        food.position.y * food.tileSize,
        food.tileSize,
        food.tileSize
    );
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

export function drawGrid(ctx, width, height, tileSize, color = 'rgba(0, 0, 0, 0.2)', lineWidth = 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // Рисуем вертикальные линии
    for (let x = 0; x <= width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Рисуем горизонтальные линии
    for (let y = 0; y <= height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}