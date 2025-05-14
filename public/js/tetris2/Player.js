import {createPiece} from "./Pieces.js";

/**
 * Represents the player in the Tetris game.
 * Handles current piece, next piece, and its position.
 */
export class Player {
    /**
     * Represents the player in the Tetris game.
     * Handles current piece, next piece, and its position.
     */
    constructor(pieces = 'TJLOSZI') {
        this.pieces = pieces;
        this.pos = { x: 0, y: 0 };
        this.matrix = null;
        this.nextMatrix = this.randomPiece();
    }

    /**
     * Randomly selects and returns a new Tetris piece.
     * @returns {number[][]} A 2D matrix representing the shape of a Tetris piece.
     */
    randomPiece() {
        return createPiece(this.pieces[Math.floor(Math.random() * this.pieces.length)]);
    }

    /**
     * Moves the piece down by one cell.
     */
    drop() {
        this.pos.y++;
    }

    /**
     * Resets the player’s current piece with the next one, and generates a new next piece.
     * Also resets the position of the piece on the game field.
     *
     * @param {number} startPosX - Starting X position for the piece.
     * @param {number} startPosY - Starting Y position for the piece (default is 0).
     */
    reset(startPosX, startPosY = 0) {
        this.matrix = this.nextMatrix;
        this.nextMatrix = this.randomPiece();
        this.pos.x = startPosX;
        this.pos.y = startPosY;
    }
}
