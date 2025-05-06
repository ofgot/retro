import { Coord } from './coords.js';
import { Direction } from './direction.js';

export class Snake {
    constructor(acceleration = 1) {
        this.coords = [new Coord(5, 5)];
        this.direction = Direction.RIGHT;
        this.grow = false;
        this.acceleration = acceleration;
    }

    setDirection(direction) {
        this.direction = direction;
    }
    
    move(deltaTime) {
        /**
         * DeltaTime - coof for smooth rendering for each FPS
         * Acceleration / 10 - acceleration divided by coof for easier setup, can be removed
         * 16 - average deltaTime, for easier setup
         */
        const speed = (deltaTime * (this.acceleration / 10)) / 16;
        const changes = {
            x: this.direction.x * speed,
            y: this.direction.y * speed,
        }

        const head = this.coords[0];
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
