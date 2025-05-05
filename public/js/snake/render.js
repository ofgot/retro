
export function setupCanvas() {
    const canvas = document.getElementById('gameCanvas');
    return canvas.getContext('2d');
}

export function render(ctx, snake, tileSize = 15) {
    ctx.fillStyle = '#959090';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#F6733A';
    for (let segment of snake.coords) {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 1, tileSize - 1);
    }
}
