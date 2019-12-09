const cvs = document.getElementById('tetris')
const ctx = cvs.getContext("2d");

const row = 20;

const col = 10;

const vacant = "white"; // vacant square has a white color

let board = []; // define board array

const sq = squareSize = 20;
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
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard()

// draw square for board
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(x * sq, y * sq, sq, sq)
}

// create piece class constructor for tetrominos
class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.tetrominoNumber = 0; // set to 0 to start at the first postion of the tetromino array
        this.activetetromino = this.tetromino[this.tetrominoNumber];
        this.color;
        this.x = 3;
        this.y = -2;
    }
}


// pieces and their colors
const $piece = [
    [Z, "red"],
    [S, "blue"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

//initialize piece

let p = new Piece($piece[0][0], $piece[0][1])





// create draw and un draw function
Piece.prototype.draw = function () {
    for (r = 0; r < this.activetetromino.length; r++) {
        for (c = 0; c < this.activetetromino.length; c++) {
            // draw square referencing active tetromino
            if (this.activetetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
}

// call draw function 


p.draw();

Piece.prototype.undraw = function () {
    for (let r = 0; r < this.activetetromino; r++) {
        for (let c = 0; c < this.activetetromino; c++) {
            if (this.activetetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, vacant);
            }
        }
    }
}
// create function to undraw and draw tetromino in new coordinates,
//to control pieces must have event listener and assign keyboard click to action
Piece.prototype.movedown = function () {
    if (!this.collision(0, 1, this.activetetromino)) {
        this.undraw();
        this.y++;
        this.draw();
    } else {}
}


Piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoNumber + 1) % this.tetromino.length];
    if (!this.collision(0, 0, nextPattern)) {
        this.undraw();
        this.tetrominoNumber = (this.tetrominoNumber + 1) % this.tetromino.length
        this.activetetromino = this.tetromino[this.tetrominoNumber];
        this.draw();
    }
}

Piece.prototype.moveright = function () {
    if (!this.collision(-1, 0, this.activetetromino)) {
        this.undraw();
        this.x++;
        this.draw();
    } else {}
}
Piece.prototype.moveleft = function () {
    if (!this.collision(1, 0, this.activetetromino)) {
        this.undraw();
        this.x--;
        this.draw();
    } else {}
}
// create a collision prevention function 
Piece.prototype.collision = function (x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            // skip empty square
            if (!piece[r][c]) {
                continue;
            }
            // future coordinates to test collision
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            // condition test
            if (newX < 0 || newX >= col || newY > row) {
                return true;
            }
            // skip newY < 0; board [-1] will crash game
            if (newY < 0) {
                continue;
            }
            // checks for locked piece already on board
            if (board[newY][newX] != vacant) {
                return true;
            }

        }
    }
    return false;
}

document.addEventListener("keydown", control)
// arrow key: left - 37, up - 38, right - 39, down - 40  
// asdw  key: left - 65, up - 87, right - 68, down -83
function control(event) {
    if (event.keyCode == 37 || 65) {
        moveleft()
    } else if (event.keycode == 38 || 87) {
        Piece.rotate();
    } else if (event.keycode == 39 || 68) {
        moveRight();
    } else if (event.keycode == 40 || 83) {
        moveDown();
    }
};
