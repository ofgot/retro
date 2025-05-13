import {createPiece} from "./Pieces.js";
import {rotate} from "./Utils.js";

export class Player {
    constructor(pieces = 'TJLOSZI') {
        this.pieces = pieces;
        this.pos = { x: 0, y: 0 };
        this.matrix = null;
        this.nextMatrix = this.randomPiece();
    }

    randomPiece() {
        return createPiece(this.pieces[Math.floor(Math.random() * this.pieces.length)]);
    }

    drop() {
        this.pos.y++;
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
                break;
            }
        }
    }

    reset(startPosX, startPosY = 0) {
        this.matrix = this.nextMatrix;
        this.nextMatrix = this.randomPiece();
        this.pos.x = startPosX;
        this.pos.y = startPosY;
    }

}
