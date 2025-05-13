import {createPiece} from "./Pieces.js";
import { rotate } from './Utils.js';

export class Player {
    constructor(arena, onGameOver) {
        this.arena = arena;
        this.pos = {x: 0, y: 0};
        this.matrix = null;

        this.nextMatrix = this.randomPiece();

        this.score = 0;
        this.lines = 0;
        this.level = 1;

        this.isGameOver = false;
    }

    randomPiece() {
        const pieces = 'TJLOSZI';
        return createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
    }

    drop() {
        this.pos.y++;
        if (this.collide()) {
            this.pos.y--;
            this.arena.merge(this);
            const linesCleared = this.arena.arenaSweep();

            if (linesCleared > 0) {
                this.lines += linesCleared;
                this.level = Math.floor(this.lines / 10) + 1;

                const pointsPerClear = [0, 40, 100, 300, 1200];
                this.score += pointsPerClear[linesCleared] * this.level;
            }

            this.reset();
        }
    }


    move(dir) {
        this.pos.x += dir;
        if (this.collide()) {
            this.pos.x -= dir;
        }
    }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        rotate(this.matrix, dir);
        while (this.collide()) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                rotate(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    reset() {
        this.matrix = this.nextMatrix;
        this.nextMatrix = this.randomPiece();
        this.pos.y = 0;
        this.pos.x = Math.floor(this.arena.matrix[0].length / 2) - Math.floor(this.matrix[0].length / 2);

        if (this.collide()) {
            this.isGameOver = true;
        }
    }

    collide() {
        const [m, o] = [this.matrix, this.pos];
        const arenaMatrix = this.arena.matrix;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arenaMatrix[y + o.y] &&
                        arenaMatrix[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
