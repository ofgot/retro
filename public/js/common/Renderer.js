/**
 * Renderer constructor for drawing elements on a canvas.
 * Handles basic properties such as tile size and grid dimensions.
 *
 * @param {CanvasRenderingContext2D} context - The canvas 2D rendering context.
 * @param {number} tileSize - The size of a single tile in pixels.
 */
export function Renderer(context, tileSize) {
    this.context = context;
    this.canvas = context.canvas;

    this.tileSize = tileSize;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.cols = this.canvasWidth / this.tileSize;
    this.rows = this.canvasHeight / this.tileSize;
}
