export function Renderer(context, tileSize) {
    this.context = context;
    this.canvas = context.canvas;

    this.tileSize = tileSize;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.cols = this.canvasWidth / this.tileSize;
    this.rows = this.canvasHeight / this.tileSize;
}
