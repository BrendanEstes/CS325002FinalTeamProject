var startTime = null;
function startGame(gameName) {
    // code to start the game
    startTime = new Date();
}

function endGame() {
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

    startGame('Snake');

    requestAnimationFrame(loop);
}

function pacmanclicked() {
    document.querySelector(".select-game").style.display = "none";
    document.querySelector(".pacmangame").style.display = "block";

    startGame('PacMan');

    const canvas = document.getElementById('pacmancanvas')
    const c = canvas.getContext('2d')

    canvas.width = innerWidth
    canvas.height = innerHeight

    class Boundary{
        static width = 40
        static height = 40
        constructor({position, image})
        {
            this.position=position
            this.width=40
            this.height=40
            this.image = image
        }
        draw(){
            //c.fillStyle = 'blue'
            //c.fillRect(this.position.x, this.position.y,this.width, this.height)
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }

    class Player{
        constructor({position,velocity}){
            this.position = position
            this.velocity = velocity
            this.radius = 15
        }
        draw(){
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0,
                 Math.PI *2)
            c.fillStyle = 'yellow'
            c.fill()
            c.closePath()
        }
        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
    class Ghost{
        static speed = 2
        constructor({position,velocity, color = 'red'}){
            this.position = position
            this.velocity = velocity
            this.radius = 15
            this.color = color
            this.prevCollsions =[]
            this.speed = 2
        }
        draw(){
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0,
                 Math.PI *2)
            c.fillStyle = this.color
            c.fill()
            c.closePath()
        }
        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }

    class Pellet{
        constructor({position}){
            this.position = position
            this.radius = 3
        }
        draw(){
            c.beginPath()
            c.arc(this.position.x, this.position.y, this.radius, 0,
                 Math.PI *2)
            c.fillStyle = 'white'
            c.fill()
            c.closePath()
        }
    }

    const pellets = []
    const boundaries = []
    const ghosts=[
        new Ghost({
            position: {
                x:Boundary.width *6 + Boundary.width/2,
                y:Boundary.height + Boundary.height/2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            }
        })
    ]
    const player = new Player({
        position:{
            x:Boundary.width + Boundary.width/2,
            y:Boundary.height + Boundary.height/2
        },
        velocity:{
            x:0,
            y:0
        }
    })

    const keys = {
        w: {
            pressed:false
        },
        a: {
            pressed:false
        },
        s: {
            pressed:false
        },
        d: {
            pressed:false
        }
    }

    let lastKey =''

    const map = [
        ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
        ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
      ]
    function createImage(src){
        const image = new Image()
        image.src = src
        return image
    }
   
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch(symbol){
                case'-':
                boundaries.push(
                    new Boundary({
                      position:{
                        x:Boundary.width * j,
                        y:Boundary.height * i
                      },
                      image: createImage('./img/pipeHorizontal.png')
                    })
                )
                break
                case'|':
                boundaries.push(
                    new Boundary({
                      position:{
                        x:Boundary.width * j,
                        y:Boundary.height * i
                      },
                      image: createImage('./img/pipeVertical.png')
                    })
                )
                break
                case '1':
                boundaries.push(
                    new Boundary({
                      position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                       },
                    image: createImage('./img/pipeCorner1.png')
                    })
                )
                break
                case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner2.png')
          })
        )
        break
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner3.png')
          })
        )
        break
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner4.png')
          })
        )
        break
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/block.png')
          })
        )
        break
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png')
          })
        )
        break
        case '.':
        pellets.push(
          new Pellet({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2
            }
          })
        )
        break
            }
        })
    })

    function circleCollidesWithRectangle({circle,rectangle})
    {
        const padding = Boundary.width /2 - circle.radius - 1
        return (circle.position.y - circle.radius + circle.velocity.y 
            <= 
            rectangle.position.y + rectangle.height + padding && 
            circle.position.x + circle.radius + circle.velocity.x 
            >= rectangle.position.x - padding &&
            circle.position.y + circle.radius + circle.velocity.y
            >= rectangle.position.y - padding && 
            circle.position.x - circle.radius + circle.velocity.x
            <= rectangle.position.x + rectangle.width + padding)
    }
    let animationId
    function animate(){
        animationId = requestAnimationFrame(animate)
        console.log(animationId)
        c.clearRect(0,0,canvas.width, canvas.height)
        if(keys.w.pressed && lastKey === 'w'){
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    circleCollidesWithRectangle({
                        circle: {
                            ...player, 
                            velocity:{
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: boundary
                })
            ){
                player.velocity.y = 0
                break
            }else{
                player.velocity.y = -5
            }
        }
        }else if (keys.a.pressed && lastKey === 'a'){
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    circleCollidesWithRectangle({
                        circle: {
                            ...player, 
                            velocity:{
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ){
                player.velocity.x = 0
                break
            }else{
                player.velocity.x = -5
            }
        }
        }else if (keys.s.pressed && lastKey === 's'){
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    circleCollidesWithRectangle({
                        circle: {
                            ...player, 
                            velocity:{
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundary
                })
            ){
                player.velocity.y = 0
                break
            }else{
                player.velocity.y = 5
            }
        }
        }else if (keys.d.pressed && lastKey === 'd'){
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if(
                    circleCollidesWithRectangle({
                        circle: {
                            ...player, 
                            velocity:{
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ){
                player.velocity.x = 0
                break
            }else{
                player.velocity.x = 5
            }
        }
        }

        for(let i = pellets.length -1; 0 < i; i--){
            const pellet = pellets[i]
            pellet.draw()

            if(Math.hypot(pellet.position.x - player.position.x,
                pellet.position.y - player.position.y) < 
                pellet.radius + player.radius
                ){
                    pellets.splice(i,1)
                }
        }
        boundaries.forEach((boundary) =>{
            boundary.draw()

            if(
                circleCollidesWithRectangle({
                    circle: player,
                    rectangle: boundary
                })
                ){
                    player.velocity.x = 0
                    player.velocity.y = 0
                }
        })
        player.update()

        ghosts.forEach((ghost) => {
            ghost.update()
            if(Math.hypot(ghost.position.x - player.position.x,
                ghost.position.y - player.position.y) < 
                ghost.radius + player.radius
                ){
                    cancelAnimationFrame(animationId)
                    console.log('you lose')
                }
                if(pellets.length===0){
                    console.log('you win')
                    cancelAnimationFrame(animationId)
                }
            const collsions = []
            boundaries.forEach((boundary) =>{
                if(
                    !collsions.includes('right') && 
                    circleCollidesWithRectangle({
                        circle: {
                            ...ghost, 
                            velocity:{
                            x: ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ){
                collsions.push('right')
            }
            if(!collsions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost, 
                        velocity:{
                        x: -ghost.speed,
                        y: 0
                    }
                },
                rectangle: boundary
            })
        ){
            collsions.push('left')
        }
        if(!collsions.includes('up') &&
            circleCollidesWithRectangle({
                circle: {
                    ...ghost, 
                    velocity:{
                    x: 0,
                    y: -ghost.speed
                }
            },
            rectangle: boundary
        })
    ){
        collsions.push('up')
    }
    if(!collsions.includes('down') &&
        circleCollidesWithRectangle({
            circle: {
                ...ghost, 
                velocity:{
                x: 0,
                y: ghost.speed
            }
        },
        rectangle: boundary
    })
){
    collsions.push('down')
}
        })
        if(collsions.length > ghost.prevCollsions.length)
        ghost.prevCollsions = collsions

        if(JSON.stringify(collsions) !== JSON.stringify
        (ghost.prevCollsions)){
            if(ghost.velocity.x>0) ghost.prevCollsions.push('right')
            else if (ghost.velocity.x<0) ghost.prevCollsions.push('left')
            else if (ghost.velocity.y<0) ghost.prevCollsions.push('up')
            else if (ghost.velocity.y>0) ghost.prevCollsions.push('down')

            console.log(collsions)
            console.log(ghost.prevCollsions)

            const pathways = ghost.prevCollsions.filter((collsion
            )=>{
                   return !collsions.includes(collsion)
                })
                console.log({pathways})
                
                const direction = pathways[Math.floor(Math.random() * pathways.
                length)]
                console.log({direction})
                switch(direction){
                    case 'down':
                        ghost.velocity.y = ghost.speed
                        ghost.velocity.x = 0
                        break
                    case 'up':
                        ghost.velocity.y = -ghost.speed
                        ghost.velocity.x = 0
                        break
                    case 'right':
                        ghost.velocity.y = 0
                        ghost.velocity.x = ghost.speed
                        break
                    case 'left':
                        ghost.velocity.y = 0
                        ghost.velocity.x = -ghost.speed
                        break
                }
                ghost.prevCollsions=[]
        }
    })
}
    animate()

    addEventListener('keydown',({ key })=>{
        switch(key){
            case 'w':
                keys.w.pressed  = true
                lastKey = 'w'
                break
            case 'a':
                keys.a.pressed  = true
                lastKey = 'a'
                break
            case 's':
                keys.s.pressed  = true
                lastKey = 's'
                break
            case 'd':
                keys.d.pressed  = true
                lastKey = 'd'
                break
        }

    })
    addEventListener('keyup',({key})=>{
        switch(key){
            case 'w':
                keys.w.pressed  = false
                break
            case 'a':
                keys.a.pressed  = false
                break
            case 's':
                keys.s.pressed  = false
                break
            case 'd':
                keys.d.pressed  = false
                break
        }
    })
}


function bombermanclicked() {
    document.querySelector(".select-game").style.display = "none";
    document.querySelector(".bombermangame").style.display = "block";

    startGame('BomberMan');

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
        // down arrow key
        else if (e.which === 40) {
            row++;
        }
        // space key (bomb)
        else if (
            e.which === 32 && !cells[row][col] &&
            // count the number of bombs the player has placed
            entities.filter((entity) => {
                return entity.type === types.bomb && entity.owner === player
            }).length < player.numBombs
        ) {
            // place bomb
            const bomb = new Bomb(row, col, player.bombSize, player);
            entities.push(bomb);
            cells[row][col] = types.bomb;
        }

        // don't move the player if something is already at that position
        if (!cells[row][col]) {
            player.row = row;
            player.col = col;
        }
    });

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
