export class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(direction) {
        return new Coord(this.x + direction.x, this.y + direction.y);
    }
}
