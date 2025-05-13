import {TetrisRenderer} from "./TetrisRenderer.js";
import {Game} from "./Game.js";
import {Arena} from "./Arena.js";
import {Player} from "./Player.js";

const TILE = 20

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
context.scale(TILE, TILE);

const nextCanvas = document.getElementById('next-canvas');
const nextContext = nextCanvas.getContext('2d');
nextContext.scale(TILE, TILE);

const cols = canvas.width / TILE;
const rows = canvas.height / TILE;

console.log(cols);
console.log(rows);

const renderer = new TetrisRenderer(context, nextContext, TILE);
const arena = new Arena(rows, cols);
const player = new Player()
const game = new Game(renderer, player, arena);

game.start()
