import {TetrisRenderer} from "./TetrisRenderer.js";
import {Game} from "./Game.js";
import {Arena} from "./Arena.js";
import {Player} from "./Player.js";

// Size of one tile in pixels
const TILE = 20

// Get the main canvas and scale it for tile-based rendering
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
context.scale(TILE, TILE);

// Get the canvas used to display the next piece
const nextCanvas = document.getElementById('next-canvas');
const nextContext = nextCanvas.getContext('2d');
nextContext.scale(TILE, TILE);

// Calculate number of columns and rows based on canvas size
const cols = canvas.width / TILE;
const rows = canvas.height / TILE;

// Initialize game components
const renderer = new TetrisRenderer(context, nextContext, TILE);
const arena = new Arena(rows, cols);
const player = new Player()
const game = new Game(renderer, player, arena);

// Start the game loop
game.start()
