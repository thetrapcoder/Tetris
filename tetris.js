const cvs = document.getElementById('tetris')
const ctx = cvs.getContext("2d");

const row = 20;

const col = 10;

const vacant = "#FFF"; // vacant square has a white color

let board = []; // define board array

const sq = 20;
// create rows and columns for board
var r;
var c;
for (r = 0; r < row; r++) {
    board[r] = [];
    for (c = 0; c < col; c++) {
        board[r][c] = vacant;
    }
}
// create function to raw board
function drawBoard() {
    for (r = 0; r < row; r++) {
        for (c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c] = vacant);
        }
    }
}

drawBoard()

// draw grid square for board
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(x * sq, y * sq, sq, sq)
}
