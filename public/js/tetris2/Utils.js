/**
 * Rotates a matrix (piece) either clockwise or counter-clockwise.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @param {number} dir - Direction of rotation: 1 for clockwise, -1 for counter-clockwise.
 */
export function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) matrix.forEach(row => row.reverse());
    else matrix.reverse();
}

/**
 * Calculates the drop interval based on the current game level.
 * The higher the level, the faster the piece falls.
 *
 * @param {number} level - The current level of the game.
 * @returns {number} Drop interval in milliseconds.
 */
export function getDropInterval(level) {
    return Math.max(100, 1000 - (level - 1) * 100);
}

/**
 * Checks if the player's current piece collides with the existing blocks in the arena.
 *
 * @param {number[][]} playerMatrix - The shape matrix of the current piece.
 * @param {{x: number, y: number}} pos - The current position of the piece on the arena.
 * @param {number[][]} arenaMatrix - The current state of the game field (arena).
 * @returns {boolean} True if there is a collision, false otherwise.
 */
export function collide(playerMatrix, pos, arenaMatrix) {
    for (let y = 0; y < playerMatrix.length; ++y) {
        for (let x = 0; x < playerMatrix[y].length; ++x) {
            if (
                playerMatrix[y][x] !== 0
                && (arenaMatrix[y + pos.y]
                    && arenaMatrix[y + pos.y][x + pos.x]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}
