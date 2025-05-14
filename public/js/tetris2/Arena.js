export class Arena {
    constructor(rows, cols) {
        this.cols = cols;   // width
        this.rows = rows;   // height
        this.matrix = this.createMatrix(cols, rows);
    }

    /**
     * Creates a 2D array filled with zeros.
     * @param {number} cols - number of columns (width)
     * @param {number} rows - number of rows (height)
     * @returns {number[][]}
     */
    createMatrix(cols, rows) {
        const matrix = [];
        for (let y = 0; y < rows; y++) {
            matrix.push(new Array(cols).fill(0));
        }
        return matrix;
    }


    /**
     * Clears filled rows and returns how many were removed.
     * @returns {number}
     */
    arenaSweep() {
        let rowCount = 0;

        outer: for (let y = this.rows - 1; y >= 0; --y) {
            for (let x = 0; x < this.cols; ++x) {
                if (this.matrix[y][x] === 0) continue outer;
            }

            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;
            rowCount++;
        }

        return rowCount;
    }

    /**
     * Merges the player's piece into the arena matrix.
     * This happens when a piece lands and becomes part of the static arena.
     *
     * @param {number[][]} matrix - The matrix representing the current falling piece.
     * @param {Object} pos - The position of the piece in the arena.
     * @param {number} pos.x - The x-coordinate of the piece's top-left corner.
     * @param {number} pos.y - The y-coordinate of the piece's top-left corner.
     */
    merge(matrix, pos) {
        console.log(pos.x, pos.y, matrix);
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.matrix[y + pos.y][x + pos.x] = value;
                }
            });
        });
    }


    /**
     * Clears the entire matrix.
     */
    clear() {
        this.matrix.forEach(row => row.fill(0));
    }
}