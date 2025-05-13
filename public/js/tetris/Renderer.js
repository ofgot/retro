import {colors} from "./Pieces.js";

function drawElement(matrix, offset, context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                const gx = x + offset.x;
                const gy = y + offset.y;

                const gradient = context.createLinearGradient(gx, gy, gx, gy + 1);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                gradient.addColorStop(0.3, colors[value]);
                gradient.addColorStop(1, colors[value]);

                context.fillStyle = gradient;

                const padding = 0.05;
                context.fillRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );

                context.beginPath();
                context.fillStyle = 'rgba(255,255,255,0.25)';
                context.ellipse(gx + 0.5, gy + 0.3, 0.35, 0.13, 0, 0, Math.PI * 2);
                context.fill();

                context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                context.lineWidth = 0.05;
                context.strokeRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );
            }
        });
    });
}

function drawBackground(context, canvas, tileSize, cols, rows) {
    context.fillStyle = '#0A1A2A';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#377177';
    context.lineWidth = 0.03;
    for (let y = 0; y <= rows; y++) {
        context.beginPath();
        context.moveTo(0, y * tileSize);
        context.lineTo(cols * tileSize, y * tileSize);
        context.stroke();
    }
    for (let x = 0; x <= cols; x++) {
        context.beginPath();
        context.moveTo(x * tileSize, 0);
        context.lineTo(x * tileSize, rows * tileSize);
        context.stroke();
    }
}


export function draw(context, canvas, arena, player, tileSize, cols, rows) {
    drawBackground(context, canvas, tileSize, cols, rows);
    drawElement(arena.matrix, {x:0, y:0}, context);
    drawElement(player.matrix, player.pos, context);
}

export function drawNext(context,canvas, pieceMatrix, tileSize, cols, rows) {
    drawBackground(context, canvas, tileSize, cols, rows);

    const pieceWidth = pieceMatrix[0].length;
    const pieceHeight = pieceMatrix.length;

    const canvasCols = canvas.width / (tileSize * 20);
    const canvasRows = canvas.height / (tileSize * 20);

    const offset = {
        x: Math.floor((canvasCols - pieceWidth) / 2),
        y: Math.floor((canvasRows - pieceHeight) / 2) + 1,
    };

    const isIBlock =
        (pieceWidth === 4 && pieceMatrix.every(row => row.includes(5))) ||
        (pieceHeight === 4 && pieceMatrix.flat().filter(v => v === 5).length === 4);

    const isOBlock =
        pieceWidth === 2 &&
        pieceHeight === 2 &&
        pieceMatrix.flat().every(v => v === 2);

    if (isOBlock) {
        offset.x += 1;
        offset.y -= 1;
    }
    if (isIBlock) {
        offset.x += 1;
        offset.y -= 1;
    }

    drawElement(pieceMatrix, offset, context);
}

export function drawGameOver(context, canvas) {
    const tileW = canvas.width / 20;
    const tileH = canvas.height / 20;

    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, tileH / 4, tileW, tileH / 2);

    context.fillStyle = 'red';
    context.font = '1.5px Arial';
    context.textAlign = 'center';
    context.fillText('GAME OVER', tileW / 2, tileH / 2);

    context.fillStyle = 'white';
    context.font = '0.8px Arial';
    context.fillText('Click "Restart" to play again', tileW / 2, tileH / 2 + 2);
}

