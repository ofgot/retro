import { Coord } from './coords.js';
import { Direction } from './direction.js';

export class Snake {
    constructor() {
        this.coords = [new Coord(20, 20)];
        this.direction = Direction.RIGHT;
        this.grow = false;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    move() {
        const head = this.coords[0];
        const newHead = head.add(this.direction);
        this.coords.unshift(newHead);

        if (!this.grow) {
            this.coords.pop();
        } else {
            this.grow = false;
        }
    }

    growNextStep() {
        this.grow = true;
    }

    add(direction) {
        return new Coord(this.x + direction.x, this.y + direction.y);
    }
}


