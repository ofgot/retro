/**
 * Array of colors for Tetris pieces.
 * The index corresponds to the number used in the piece matrix.
 * Index 0 (null) means empty space.
 */
export const colors = [
    null,
    '#f4418c',
    '#60abc5',
    '#2dbf6a',
    '#F538FF',
    '#f6a84f',
    '#fadf48',
    '#5589f8'
];

/**
 * Creates a Tetris piece matrix by type.
 * Each number in the matrix corresponds to a color in the `colors` array.
 *
 * @param {string} type - One of 'T', 'O', 'L', 'J', 'I', 'S', 'Z'.
 * @returns {number[][]} A 2D array representing the shape of the Tetris piece.
 */
export function createPiece(type) {
    switch (type) {
        case 'T': return [[0,1,0],[1,1,1],[0,0,0]];
        case 'O': return [[2,2],[2,2]];
        case 'L': return [[0,0,3],[3,3,3],[0,0,0]];
        case 'J': return [[4,0,0],[4,4,4],[0,0,0]];
        case 'I': return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
        case 'S': return [[0,6,6],[6,6,0],[0,0,0]];
        case 'Z': return [[7,7,0],[0,7,7],[0,0,0]];
    }
}