import { Coord } from './coords.js';
import { Direction } from './direction.js';

export class Snake {
    constructor(acceleration = 0.7) {
        this.coords = [new Coord(5, 5), new Coord(5, 5)];
        this.direction = Direction.RIGHT;
        this.grow = false;
        this.acceleration = acceleration;

        this.previousDirection = this.direction;
    }

    setDirection(direction) {
        if (this.direction !== this.previousDirection) {
            return;
        }

        this.previousDirection = this.direction;
        this.direction = direction;
    }

    move(deltaTime) {
        let head = this.coords[0];

        if (this.direction !== this.previousDirection) {
            const roundedCoords = new Coord(Math.round(head.x), Math.round(head.y));
            const remainedCoords = new Coord(Math.abs(roundedCoords.x - head.x), Math.abs(roundedCoords.y - head.y));

            if (remainedCoords.x <= 0.2 && remainedCoords.y <= 0.2) {
                head = roundedCoords;
                this.previousDirection = this.direction;
            }
        }

        const speed = (deltaTime * (this.acceleration / 10)) / 16;
        const changes = new Coord(this.previousDirection.x * speed, this.previousDirection.y * speed)

        const newHead = head.add(changes);
        this.coords.unshift(newHead);

        if (!this.grow) {
            this.coords.pop();
        } else {
            this.addTailSegment();
            this.grow = false;
        }
    }

    addTailSegment() {
        const tail = this.coords[this.coords.length - 1];
        const beforeTail = this.coords[this.coords.length - 2] || tail;

        const dx = tail.x - beforeTail.x;
        const dy = tail.y - beforeTail.y;

        const newSegment = new Coord(tail.x + dx, tail.y + dy);
        this.coords.push(newSegment);
    }

    growNextStep() {
        this.grow = true;
    }
}
