const signed_in = false;

function loggedIn(){
  if (!signed_in){
    window.location = "login.html";
  } else {
    const playPacman = document.getElementById('playpacman');
    const playBomberman = document.getElementById('bomberman');
    const playSnake = document.getElementById('playsnake');
    
    if (playPacman){
      pacmanclicked(); 
    } else if (playBomberman) {
      bombermanclicked(); 
    } else if (playSnake) {
      snakeclicked(); 
    }
  }
}

class Login{
  constructor(name, email, password){
    this.name = name;
    this.email = email;
    this.password = password;
  }
  
  // this function will be used to send login data to a server
  create(){
    const person = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    
    // Send person data to server
  }
}
var startTime = null;

function startGame(gameName) {
    // code to start the game
    startTime = new Date();
}

function endGame(gameName) {
    // code to end the game
    var endTime = new Date();
    var duration = Math.round((endTime - startTime) / 1000); // duration in seconds
    document.querySelector('.score1').innerHTML = 'Time Played: ' + duration + ' seconds';
}

var score_Pacman = document.getElementsByClassName('pacman');

function backbtn() {
    document.querySelector(".select-game").style.display = "block";
    document.querySelector(".pacmangame").style.display = "none";
    document.querySelector(".bombermangame").style.display = "none";
    document.querySelector(".snakegame").style.display = "none";
}

function snakeclicked() {

    document.querySelector(".select-game").style.display = "none";
    document.querySelector(".snakegame").style.display = "block";

    requestAnimationFrame(loop);
}

function pacmanclicked() {
    document.querySelector(".select-game").style.display = "none";
    document.querySelector(".pacmangame").style.display = "block";
}

function bombermanclicked() {
    document.querySelector(".select-game").style.display = "none";
    document.querySelector(".bombermangame").style.display = "block";

    var canvas = document.getElementById('bombermancanvas');
    var context = canvas.getContext('2d');

    var grid2 = 64;
    const numRows = 13;
    const numCols = 15;

    // create a new canvas and draw the soft wall image. then we can use this
    // canvas to draw the images later on
    const softWallCanvas = document.createElement('canvas');
    const softWallCtx = softWallCanvas.getContext('2d');
    softWallCanvas.width = softWallCanvas.height = grid2;

    softWallCtx.fillStyle = 'black';
    softWallCtx.fillRect(0, 0, grid2, grid2);
    softWallCtx.fillStyle = '#a9a9a9';

    // 1st row brick
    softWallCtx.fillRect(1, 1, grid2 - 2, 20);

    // 2nd row bricks
    softWallCtx.fillRect(0, 23, 20, 18);
    softWallCtx.fillRect(22, 23, 42, 18);

    // 3rd row bricks
    softWallCtx.fillRect(0, 43, 42, 20);
    softWallCtx.fillRect(44, 43, 20, 20);

    // create a new canvas and draw the soft wall image. then we can use this
    // canvas to draw the images later on
    const wallCanvas = document.createElement('canvas');
    const wallCtx = wallCanvas.getContext('2d');
    wallCanvas.width = wallCanvas.height = grid2;

    wallCtx.fillStyle = 'black';
    wallCtx.fillRect(0, 0, grid2, grid2);
    wallCtx.fillStyle = 'white';
    wallCtx.fillRect(0, 0, grid2 - 2, grid2 - 2);
    wallCtx.fillStyle = '#a9a9a9';
    wallCtx.fillRect(2, 2, grid2 - 4, grid2 - 4);

    // create a mapping of object types
    const types = {
        wall: '?',
        softWall: 1,
        bomb: 2
    };

    // keep track of all entities
    let entities = [];

    // keep track of what is in every cell of the game using a 2d array. the
    // template is used to note where walls are and where soft walls cannot spawn.
    // '?' represents a wall
    // 'x' represents a cell that cannot have a soft wall (player start zone)
    let cells = [];
    const template = [
        ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', 'x', 'x', , , , , , , , , , 'x', 'x', '?'],
        ['?', 'x', '?', , '?', , '?', , '?', , '?', , '?', 'x', '?'],
        ['?', 'x', , , , , , , , , , , , 'x', '?'],
        ['?', , '?', , '?', , '?', , '?', , '?', , '?', , '?'],
        ['?', , , , , , , , , , , , , , '?'],
        ['?', , '?', , '?', , '?', , '?', , '?', , '?', , '?'],
        ['?', , , , , , , , , , , , , , '?'],
        ['?', , '?', , '?', , '?', , '?', , '?', , '?', , '?'],
        ['?', 'x', , , , , , , , , , , , 'x', '?'],
        ['?', 'x', '?', , '?', , '?', , '?', , '?', , '?', 'x', '?'],
        ['?', 'x', 'x', , , , , , , , , , 'x', 'x', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?']
    ];

    // populate the level with walls and soft walls
    function generateLevel() {
        cells = [];

        for (let row = 0; row < numRows; row++) {
            cells[row] = [];

            for (let col = 0; col < numCols; col++) {

                // 90% chance cells will contain a soft wall
                if (!template[row][col] && Math.random() < 0.90) {
                    cells[row][col] = types.softWall;
                }
                else if (template[row][col] === types.wall) {
                    cells[row][col] = types.wall;
                }
            }
        }
    }

    // blow up a bomb and its surrounding tiles
    function blowUpBomb(bomb) {

        // bomb has already exploded so don't blow up again
        if (!bomb.alive) return;

        bomb.alive = false;

        // remove bomb from grid
        cells[bomb.row][bomb.col] = null;

        // explode bomb outward by size
        const dirs = [{
            // up
            row: -1,
            col: 0
        }, {
            // down
            row: 1,
            col: 0
        }, {
            // left
            row: 0,
            col: -1
        }, {
            // right
            row: 0,
            col: 1
        }];
        dirs.forEach((dir) => {
            for (let i = 0; i < bomb.size; i++) {
                const row = bomb.row + dir.row * i;
                const col = bomb.col + dir.col * i;
                const cell = cells[row][col];

                // stop the explosion if it hit a wall
                if (cell === types.wall) {
                    return;
                }

                // center of the explosion is the first iteration of the loop
                entities.push(new Explosion(row, col, dir, i === 0 ? true : false));
                cells[row][col] = null;

                // bomb hit another bomb so blow that one up too
                if (cell === types.bomb) {

                    // find the bomb that was hit by comparing positions
                    const nextBomb = entities.find((entity) => {
                        return (
                            entity.type === types.bomb &&
                            entity.row === row && entity.col === col
                        );
                    });
                    blowUpBomb(nextBomb);
                }

                // stop the explosion if hit anything
                if (cell) {
                    return;
                }
            }
        });
    }

    // bomb constructor function
    function Bomb(row, col, size, owner) {
        this.row = row;
        this.col = col;
        this.radius = grid2 * 0.4;
        this.size = size;    // the size of the explosion
        this.owner = owner;  // which player placed this bomb
        this.alive = true;
        this.type = types.bomb;

        // bomb blows up after 3 seconds
        this.timer = 3000;

        // update the bomb each frame
        this.update = function (dt) {
            this.timer -= dt;

            // blow up bomb if timer is done
            if (this.timer <= 0) {
                return blowUpBomb(this);
            }

            // change the size of the bomb every half second. we can determine the size
            // by dividing by 500 (half a second) and taking the ceiling of the result.
            // then we can check if the result is even or odd and change the size
            const interval = Math.ceil(this.timer / 500);
            if (interval % 2 === 0) {
                this.radius = grid2 * 0.4;
            }
            else {
                this.radius = grid2 * 0.5;
            }
        };

        // render the bomb each frame
        this.render = function () {
            const x = (this.col + 0.5) * grid2;
            const y = (this.row + 0.5) * grid2;

            // draw bomb
            context.fillStyle = 'black';
            context.beginPath();
            context.arc(x, y, this.radius, 0, 2 * Math.PI);
            context.fill();

            // draw bomb fuse moving up and down with the bomb size
            const fuseY = (this.radius === grid2 * 0.5 ? grid2 * 0.15 : 0);
            context.strokeStyle = 'white';
            context.lineWidth = 5;
            context.beginPath();
            context.arc(
                (this.col + 0.75) * grid2,
                (this.row + 0.25) * grid2 - fuseY,
                10, Math.PI, -Math.PI / 2
            );
            context.stroke();
        };
    }

    // explosion constructor function
    function Explosion(row, col, dir, center) {
        this.row = row;
        this.col = col;
        this.dir = dir;
        this.alive = true;

        // show explosion for 0.3 seconds
        this.timer = 300;

        // update the explosion each frame
        this.update = function (dt) {
            this.timer -= dt;

            if (this.timer <= 0) {
                this.alive = false;
            }
        };

        // render the explosion each frame
        this.render = function () {
            const x = this.col * grid2;
            const y = this.row * grid2;
            const horizontal = this.dir.col;
            const vertical = this.dir.row;

            // create a fire effect by stacking red, orange, and yellow on top of
            // each other using progressively smaller rectangles
            context.fillStyle = '#D72B16';  // red
            context.fillRect(x, y, grid2, grid2);

            context.fillStyle = '#F39642';  // orange

            // determine how to draw based on if it's vertical or horizontal
            // center draws both ways
            if (center || horizontal) {
                context.fillRect(x, y + 6, grid2, grid2 - 12);
            }
            if (center || vertical) {
                context.fillRect(x + 6, y, grid2 - 12, grid2);
            }

            context.fillStyle = '#FFE5A8';  // yellow

            if (center || horizontal) {
                context.fillRect(x, y + 12, grid2, grid2 - 24);
            }
            if (center || vertical) {
                context.fillRect(x + 12, y, grid2 - 24, grid2);
            }
        };
    }

    // player character (just a simple circle)
    const player = {
        row: 1,
        col: 1,
        numBombs: 1,
        bombSize: 3,
        radius: grid2 * 0.35,
        render() {
            const x = (this.col + 0.5) * grid2;
            const y = (this.row + 0.5) * grid2;

            context.save();
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(x, y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }
    }

    // game loop
    let last;
    let dt;
    function loop(timestamp) {
        requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // calculate the time difference since the last update. requestAnimationFrame
        // passes the current timestamp as a parameter to the loop
        if (!last) {
            last = timestamp;
        }
        dt = timestamp - last;
        last = timestamp;

        // update and render everything in the grid
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                switch (cells[row][col]) {
                    case types.wall:
                        context.drawImage(wallCanvas, col * grid2, row * grid2);
                        break;
                    case types.softWall:
                        context.drawImage(softWallCanvas, col * grid2, row * grid2);
                        break;
                }
            }
        }

        // update and render all entities
        entities.forEach((entity) => {
            entity.update(dt);
            entity.render();
        });

        // remove dead entities
        entities = entities.filter((entity) => entity.alive);

        player.render();
    }

    // listen to keyboard events to move the snake
    document.addEventListener('keydown', function (e) {
        let row = player.row;
        let col = player.col;

        // left arrow key
        if (e.which === 37) {
            col--;
        }
        // up arrow key
        else if (e.which === 38) {
            row--;
        }
        // right arrow key
        else if (e.which === 39) {
            col++;
        }
        else if (e.which === 40) {
            row++;
        }
     // don't move the player if something is already at that position
        if (!cells[row][col]) {
            player.row = row;
            player.col = col;
        }
  // handle space bar press for bomb placement
    if (e.which === 32) {
        placeBomb();
    }
});

document.addEventListener('click', function (e) {
    let row = player.row;
    let col = player.col;

    // handle mouse click for bomb placement
    if (!cells[row][col] &&
        // count the number of bombs the player has placed
        entities.filter((entity) => {
            return entity.type === types.bomb && entity.owner === player;
        }).length < player.numBombs
    ) {
        placeBomb();
    }
});

function placeBomb() {
    let row = player.row;
    let col = player.col;

    // place bomb
    const bomb = new Bomb(row, col, player.bombSize, player);
    entities.push(bomb);
    cells[row][col] = types.bomb;
}

    // start the game
    generateLevel();
    requestAnimationFrame(loop);

}




///////////////////////////////// SNAKE CODE:

// game loop
function loop() {
    requestAnimationFrame(loop);

    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;

    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // draw snake one cell at a time
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {

        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;

            // canvas is 400x400 which is 25x25 grids
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < snake.cells.length; i++) {

            // snake occupies same space as a body part. reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function (e) {
    // prevent snake from backtracking on itself by checking that it's
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)

    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

var grid = 16;
var count = 0;

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};


var apple = {
    x: 320,
    y: 320
};

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
