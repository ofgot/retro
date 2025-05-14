import {collide} from "./Utils.js";

/**
 * Represents the main Tetris game logic controller.
 * Manages player interaction, game loop, scoring, levels, and rendering.
 */
export class Game {
    constructor(renderer, player, arena) {
        this.renderer = renderer;
        this.player = player;
        this.arena = arena;

        this.dropCounter = 0;
        this.lastTime = 0;

        this.normalDropInterval = 1000;
        this.fastDropInterval = 30;
        this.dropInterval = this.normalDropInterval;

        this.startX = Math.floor(this.arena.cols / 2) - 1;

        this.lines = 0;
        this.level = 1;
        this.score = 0;

        this.isGameOver = false;
        this.isPaused = false;
    }

    /**
     * Initializes and starts the game loop.
     */
    start() {
        this.player.reset(this.startX);
        this.bindControls();
        requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Updates the game logic each frame (drop timing, collision, etc.).
     * @param {number} time - The timestamp of the frame.
     */
    update(time = 0) {
        if (this.isPaused){
            return;
        }

        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;

        if (this.dropCounter > this.dropInterval) {
            this.player.drop();

            if (collide(this.player.matrix, this.player.pos, this.arena.matrix)) {
                this.player.pos.y--;
                this.arena.merge(this.player.matrix, this.player.pos);

                const cleared = this.arena.arenaSweep();
                if (cleared > 0) {
                    this.updateScore(cleared);
                }

                this.player.reset(this.startX);

                if (collide(this.player.matrix, this.player.pos, this.arena.matrix)) {
                    this.isGameOver = true;
                    this.draw();
                    this.renderer.drawGameOver();
                    return;
                }
            }

            this.dropCounter = 0;
        }

        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Draws the current game state using the renderer.
     */
    draw() {
        this.renderer.drawBackground();
        this.renderer.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.renderer.drawMatrix(this.player.matrix, this.player.pos);
        this.renderer.drawNext(this.player.nextMatrix);
    }

    /**
     * Sets up event listeners for keyboard and button controls.
     */
    bindControls() {
        document.addEventListener('keydown', event => {
            if (event.key === 'a' || event.key === 'ArrowLeft') {
                this.movePlayer(-1);
            } else if (event.key === 'd' || event.key === 'ArrowRight') {
                this.movePlayer(1);
            } else if (event.key === 's' || event.key === 'ArrowDown') {
                this.dropInterval = this.fastDropInterval;
            } else if (event.key === 'w' || event.key === 'ArrowUp') {
                this.rotatePlayer(1);
            }
        });

        document.addEventListener('keyup', event => {
            if (event.key === 's' || event.key === 'ArrowDown') {
                this.dropInterval = this.normalDropInterval;
            }
        });

        const pauseBtn = document.getElementById('pause');
        pauseBtn.addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
            if (!this.isPaused) {
                this.lastTime = 0; // сброс таймера
                requestAnimationFrame(this.update.bind(this));
            }
        });

        const musicBtn = document.getElementById('music');
        const audio = document.getElementById('tetris-music');

        if (audio.paused) {
            musicBtn.classList.add('muted');
        }

        musicBtn.addEventListener('click', () => {
            const isPlaying = !audio.paused;

            if (isPlaying) {
                audio.pause();
                musicBtn.classList.add('muted');
            } else {
                audio.play();
                musicBtn.classList.remove('muted');
            }
        });

        const restartBtn = document.getElementById('restart');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restart());
        }
    }

    /**
     * Rotates the player's piece and adjusts position to avoid collision.
     * @param {number} dir - Direction of rotation: 1 for clockwise, -1 for counter-clockwise.
     */
    rotatePlayer(dir) {
        const originalPos = this.player.pos.x;
        let offset = 1;

        this.rotateMatrix(this.player.matrix, dir);

        while (collide(this.player.matrix, this.player.pos, this.arena.matrix)) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > this.player.matrix[0].length) {
                this.rotateMatrix(this.player.matrix, -dir);
                this.player.pos.x = originalPos;
                return;
            }
        }
    }

    /**
     * Rotates a matrix in-place by transposing and reversing it.
     * @param {number[][]} matrix - The matrix to rotate.
     * @param {number} dir - Direction of rotation.
     */
    rotateMatrix(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }

        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    /**
     * Moves the player piece left or right if no collision occurs.
     * @param {number} dir - Direction to move (-1 left, 1 right).
     */
    movePlayer(dir) {
        this.player.pos.x += dir;

        if (collide(this.player.matrix, this.player.pos, this.arena.matrix)) {
            this.player.pos.x -= dir;
        }
    }

    /**
     * Updates the player's score, lines cleared, and level.
     * @param {number} linesCleared - The number of lines cleared in one move.
     */
    updateScore(linesCleared) {
        const pointsPerLine = [0, 40, 100, 300, 1200];
        this.score += pointsPerLine[linesCleared] * this.level;
        this.lines += linesCleared;
        this.level = Math.floor(this.lines / 10) + 1;

        this.updateSpeed();
        this.updateUI();
    }

    /**
     * Updates the on-screen UI for score, level, and lines.
     */
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lines').textContent = this.lines;
        document.getElementById('level').textContent = this.level;
    }

    /**
     * Adjusts the drop interval based on the current level.
     */
    updateSpeed() {
        this.dropInterval = Math.max(10, 1000 - (this.level - 1) * 100);
    }

    /**
     * Resets the game state to initial values and restarts the loop.
     */
    restart() {
        this.arena.clear();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropInterval = this.normalDropInterval;
        this.isGameOver = false;
        this.isPaused = false;

        this.updateUI();
        this.player.reset(this.startX);
        requestAnimationFrame(this.update.bind(this));
    }
}