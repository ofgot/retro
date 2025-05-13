
export class Arena {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = this.createMatrix(width, height);
    }

    createMatrix(w, h) {
        const matrix = [];
        while (h--) matrix.push(new Array(w).fill(0));
        return matrix;
    }

    arenaSweep() {
        let rowCount = 0;
        outer: for (let y = this.matrix.length - 1; y >= 0; --y) {
            for (let x = 0; x < this.matrix[y].length; ++x) {
                if (this.matrix[y][x] === 0) continue outer;
            }
            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;
            rowCount++;
        }
        return rowCount;
    }


    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) this.matrix[y + player.pos.y][x + player.pos.x] = value;
            });
        });
    }

    clear() {
        this.matrix.forEach(row => row.fill(0));
    }


}
