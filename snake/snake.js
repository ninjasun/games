 
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
let GAME_LOOP = false;
let gameId 


window.addEventListener('load', function(e) {
    console.log("document.onload", e)
    let grid = document.getElementById('grid'); 
    const score = document.getElementById('score');
    const buttonStart = document.getElementById('start');

   let snakeDirection = 'RIGHT'

    buttonStart.addEventListener('click', function(e) {
        console.log("Clicked: ", e)
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
    }

    function createApple() {
        let position = getRandomNumber(MAX_PIXEL, MIN_PIXEL)
        let div = document.getElementById(position)
        div.setAttribute('class', 'apple')
    }

    function moveSnake() {
        const snake = document.querySelector('.snake');
        snake.classList.remove("snake");
        snake.classList.add("pixel");
        const oldSnakeId = parseInt(snake.getAttribute('id'));
        let newSnakeId;

        switch (snakeDirection){
            case 'RIGHT':
                newSnakeId = oldSnakeId + 1;
                break;
            case 'LEFT':
                newSnakeId = oldSnakeId -1;
                break;
            case 'UP':
                newSnakeId = oldSnakeId - 200;
                break;
            case 'DOWN':
                newSnakeId = oldSnakeId + 200;
                break;
            default:
                newSnakeId = oldSnakeId + 1;
        }
        const newSnake = document.getElementById(newSnakeId);
    
        newSnake.setAttribute('class','snake')
    } 

   createBoard()
   createSnake();
   createApple();

  
   gameId = this.setInterval(function() {
        if(GAME_LOOP){
            //ascolta eventi tastiera
            //move snake
            moveSnake()
            //check for collision
            console.log("print snake every 500ms ")
        }
   }, 250) 
  
})
