import { Renderer } from '../common/Renderer.js';
import {colors} from "./Pieces.js";

/**
 * @constructor
 * TetrisRenderer extends the base Renderer and provides specific drawing logic
 * for the Tetris game background grid.
 *
 * @param {CanvasRenderingContext2D} context - The 2D rendering context for the game canvas.
 * @param {CanvasRenderingContext2D} nextContext - The context for the "next piece" preview canvas. * @param {number} tileSize - The size of a single tile in logical units.
 * @param {number} tileSize - The size of a single tile in logical units.
 */
export function TetrisRenderer(context, nextContext, tileSize) {
    Renderer.call(this, context, tileSize);
    this.nextContext = nextContext;
}

// Set up prototype inheritance from Renderer
TetrisRenderer.prototype = Object.create(Renderer.prototype);

/**
 * Draws the background grid for the Tetris playfield.
 */
TetrisRenderer.prototype.drawBackground = function () {
    const ctx = this.context;

    ctx.fillStyle = '#0A1A2A';
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    ctx.strokeStyle = '#377177';
    ctx.lineWidth = 0.03;

    for (let y = 0; y <= this.rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.cols, y);
        ctx.stroke();
    }

    for (let x = 0; x <= this.cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.rows);
        ctx.stroke();
    }
};

/**
 * Draws a given matrix (piece or field) onto the main canvas.
 *
 * @param {number[][]} matrix - The matrix representing blocks to draw.
 * @param {{x: number, y: number}} offset - The top-left position where to draw the matrix.
 */
TetrisRenderer.prototype.drawMatrix = function (matrix, offset) {
    const ctx = this.context;

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                const gx = x + offset.x;
                const gy = y + offset.y;

                const gradient = ctx.createLinearGradient(gx, gy, gx, gy + 1);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                gradient.addColorStop(0.3, colors[value]);
                gradient.addColorStop(1, colors[value]);

                ctx.fillStyle = gradient;

                const padding = 0.05;
                ctx.fillRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );

                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,255,255,0.25)';
                ctx.ellipse(gx + 0.5, gy + 0.3, 0.35, 0.13, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = 0.05;
                ctx.strokeRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );
            }
        });
    });
}

/**
 * Draws a "Game Over" message on top of the canvas.
 */
TetrisRenderer.prototype.drawGameOver = function () {
    const ctx = this.context;

    const tileW = ctx.canvas.width / this.tileSize;
    const tileH = ctx.canvas.height / this.tileSize;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, tileH / 4, tileW, tileH / 2);

    ctx.fillStyle = 'red';
    ctx.font = '1.5px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', tileW / 2, tileH / 2);

    ctx.fillStyle = 'white';
    ctx.font = '0.8px Arial';
    ctx.fillText('Click "Restart" to play again', tileW / 2, tileH / 2 + 2);
}

/**
 * Draws the "next" Tetris piece in a separate preview canvas.
 *
 * @param {number[][]} matrix - The matrix representing the next piece.
 */
TetrisRenderer.prototype.drawNext = function (matrix) {
    const ctx = this.nextContext;
    const canvas = ctx.canvas;
    const tileSize = this.tileSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0A1A2A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cols = canvas.width / tileSize;
    const rows = canvas.height / tileSize;

    ctx.strokeStyle = '#377177';
    ctx.lineWidth = 0.03;
    for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cols, y);
        ctx.stroke();
    }
    for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rows);
        ctx.stroke();
    }

    const pieceWidth = matrix[0].length;
    const pieceHeight = matrix.length;

    const canvasCols = canvas.width / tileSize;
    const canvasRows = canvas.height / tileSize;

    const offset = {
        x: Math.floor((canvasCols - pieceWidth) / 2),
        y: Math.floor((canvasRows - pieceHeight) / 2) + 1,
    };

    const flat = matrix.flat();
    const isIBlock =
        (pieceWidth === 4 && matrix.every(row => row.includes(5))) ||
        (pieceHeight === 4 && flat.filter(v => v === 5).length === 4);
    const isOBlock =
        pieceWidth === 2 &&
        pieceHeight === 2 &&
        flat.every(v => v === 2);

    if (isOBlock) {
        offset.x += 1;
        offset.y -= 1;
    }
    if (isIBlock) {
        offset.x += 1;
        offset.y -= 1;
    }

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                const gx = x + offset.x;
                const gy = y + offset.y;

                const gradient = ctx.createLinearGradient(gx, gy, gx, gy + 1);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                gradient.addColorStop(0.3, colors[value]);
                gradient.addColorStop(1, colors[value]);

                ctx.fillStyle = gradient;

                const padding = 0.05;
                ctx.fillRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );

                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,255,255,0.25)';
                ctx.ellipse(gx + 0.5, gy + 0.3, 0.35, 0.13, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = 0.05;
                ctx.strokeRect(
                    gx + padding,
                    gy + padding,
                    1 - padding * 2,
                    1 - padding * 2
                );
            }
        });
    });
};
