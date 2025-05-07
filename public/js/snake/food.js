export const tileSourcesFood = [
    { src: 'img/snake/food/tile0336.png'},
    { src: 'img/snake/food/tile0337.png'},
    { src: 'img/snake/food/tile0338.png'},
];

export class Food {
    constructor(canvasWidth, canvasHeight, tileSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tileSize = tileSize;

        this.respawn();
    }

    generatePosition() {
        const cols = Math.floor(this.canvasWidth / this.tileSize);
        const rows = Math.floor(this.canvasHeight / this.tileSize);
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        return { x, y };
    }

    respawn() {
        this.position = this.generatePosition();
    }
}
