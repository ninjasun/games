 
  function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

const MAX_PIXEL = 20000;
const MIN_PIXEL = 0;
/*  keyboard control */
const UP = 38;
const LEFT = 37;
const RIGHT = 39;
const DOWN = 40;
const PAUSE = 32;
/** */
let GAME_LOOP = false;
let gameId 
let snakeDirection = 'RIGHT'
let fast = 200; //ms update snake position
const snake = {
    head: '',
    tail: []
}

/**
 * snake non può tornare indietro, su sè stesso
 */
window.addEventListener('keydown', function(e) {
    switch (e.keyCode){
        case LEFT:
            if (snakeDirection !== RIGHT) {
                snakeDirection = LEFT;
            }
            break 
        case UP:
            if (snakeDirection !== DOWN) {
                snakeDirection = UP;
            }
            break
        case RIGHT:
            if (snakeDirection !== LEFT) {
                snakeDirection = RIGHT;
            }
            break
        case DOWN:
            if (snakeDirection !== UP) {
                snakeDirection = DOWN;
            }
            break
        case '32':
            /** TO DO PAUSE */
            break
        default:
            snakeDirection = RIGHT;
        
    }
})

window.addEventListener('load', function(e) {
    console.log("document.onload", e)
    const grid = document.getElementById('grid'); 
    const score = document.getElementById('score');
    const buttonStart = document.getElementById('start');
    const eatingSoundEl = document.getElementById("audio");

    buttonStart.addEventListener('click', function(e) {
        GAME_LOOP = !GAME_LOOP
        if(!GAME_LOOP) clearInterval(gameId)
    })

    function createBoard() {
        for(let i = 0; i < MAX_PIXEL; i++) {
            let div = document.createElement('DIV')
            div.setAttribute('class', 'pixel')
            div.setAttribute('id', i)
            grid.appendChild(div)
        }
    }

    
    function createSnake() {
        let position = getRandomNumber(MAX_PIXEL, MIN_PIXEL)
        let div = document.getElementById(position)
        div.setAttribute('class', 'snake')
        snake.head = position;
        snake.tail = [];
    }

    function createApple() {
        let position = getRandomNumber(MAX_PIXEL, MIN_PIXEL)
        let div = document.getElementById(position)
        div.setAttribute('class', 'apple')
    }

    function willCollide() {
        return false
    }

    function willEat(newSnakeId) {
        const apple = document.querySelector('.apple');
        const appleId = apple.getAttribute("id");

        if(newSnakeId == appleId) {
            //eating
            console.log("Eating..");
            eatingSoundEl.onplay();
            apple.classList.remove('apple');
            createApple()
            return true;
        }
        return false   
    }

    function moveSnake() {
        const oldSnakeId = parseInt(snake.head)
        let newSnakeId;

        switch (snakeDirection){
            case RIGHT:
                newSnakeId = oldSnakeId + 1;
                break;
            case LEFT:
                newSnakeId = oldSnakeId - 1;
                break;
            case UP:
                newSnakeId = oldSnakeId - 200;
                break;
            case DOWN:
                newSnakeId = oldSnakeId + 200;
                break;
            default:
                newSnakeId = oldSnakeId + 1;
        }
        const newSnakeEl = document.getElementById(newSnakeId);

        /** DETECT COLLISION */
        if(willCollide()){
            alert("Game over")
        }
        else {
            //newSnakeEl.setAttribute('class','.snake');
            newSnakeEl.classList.add('snake');
            snake.tail.unshift(snake.head);
            snake.head = newSnakeId;

            if(!willEat(newSnakeId) ) {
                const removedId = snake.tail.pop();
                const removedEl = document.getElementById(removedId);
                removedEl.classList.remove('snake');
                removedEl.classList.add('pixel')
            }
        }  
    } 

   createBoard()
   createSnake();
   createApple();

  
   gameId = this.setInterval(function() {
        if(GAME_LOOP){
            //ascolta eventi tastiera
            //move snake
            moveSnake();
            //check for collision
            console.log("move snake every " + fast + " ms ")
        }
   }, fast) 
  
})
