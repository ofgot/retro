import { Coord } from './coords.js';
import { Direction } from './direction.js';

export class Snake {
    constructor(acceleration = 1) {
        this.coords = [new Coord(5, 5), new Coord(4, 5)];
        this.direction = Direction.RIGHT;
        this.grow = false;
        this.acceleration = acceleration;

    }

    setDirection(direction) {
        this.direction = direction;
    }

    move(deltaTime) {
        const speed = (deltaTime * (this.acceleration / 10)) / 16;
        const head = this.coords[0];

        const changes = {
            x: this.direction.x * speed,
            y: this.direction.y * speed,
        }

        const newHead = head.add(changes);
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
}
