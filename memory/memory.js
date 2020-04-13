 
 const cardList = [{
    name: 'blu',
    src: "./images/card-blue.png",
    position: 0,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'blu',
    src: "./images/card-blue.png",
    position: 3,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'grey',
    src: "./images/card-grey.png",
    position: 2,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'grey',
    src: "./images/card-grey.png",
    position: 8,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'red',
    src: "./images/card-red.png",
    position: 11,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'red',
    src: "./images/card-red.png",
    position: 9,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'yellow',
    src: "./images/card-yellow.png",
    position: 1,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'yellow',
    src: "./images/card-yellow.png",
    position: 7,
    coveredSrc: "./images/card-black.png",
 }, {
    name: 'purple',
    src: "./images/card-purple.png",
    position: 4,
    coveredSrc: "./images/card-black.png",
 },  {
    name: 'purple',
    src: "./images/card-purple.png",
    position: 6,
    coveredSrc: "./images/card-black.png",
 },  {
    name: 'brown',
    src: "./images/card-brown.png",
    position: 5,
    coveredSrc: "./images/card-black.png",
 },  {
    name: 'brown',
    src: "./images/card-brown.png",
    position: 10,
    coveredSrc: "./images/card-black.png",
 }
]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

window.addEventListener('load', function(e) {
    console.log("document.onload", e)
    let grid = document.getElementById('grid'); 
    let score = this.document.getElementById('score');

    let multiplex = 10
    score.textContent = 0;
    let memoryStack = []

    gameStart()

    cardList.forEach( (item, index) => {
       let img = document.createElement('img')
       img.setAttribute('src', item.coveredSrc)
       img.setAttribute('id', item.position)
       img.setAttribute('name', item.name)
       img.setAttribute('class', 'card')
       img.addEventListener("click", handleCardClick);

       grid.appendChild(img)
    })

    
    //var list = document.querySelectorAll('card');

    function isEqueltoLastClicked(item) {
        if(memoryStack.length === 0){
            return true
        }
        if ( memoryStack[memoryStack.length - 1].name === item.name ) {
            score.textContent = multiplex + parseInt(score.textContent)
            console.log("score: ", score)
            return true
        }
        return false;
    }
   
    function gameStart(){
        score.textContent = 0;
        memoryStack = [];
        multiplex = 10
        shuffle(cardList)
    }

    function handleCardClick(e){

        const target = e.target;
        let alredyClicked = memoryStack.find(item => item.id === target.id)
        if (alredyClicked) return

        let dataItem = cardList.find(item => item.name === target.name)
        if(dataItem){
            /** flip */
            target.setAttribute('src', dataItem.src)
            /** se uguale tengo altrimenti reflip */
            if(isEqueltoLastClicked(dataItem) || memoryStack.length % 2 === 0){
                memoryStack.push(dataItem)

                if(memoryStack.length === cardList.length){
                    alert("You won! " + score.textContent)
                    gameStart()
                    return
                }
            }
            else {
                if(multiplex <= 0){
                    alert("You loose! " + score.textContent)
                    gameStart()
                    return
                }
                setTimeout(function(){
                    const list = document.getElementsByClassName('card');

                    for (let item of list) {
                        item.setAttribute('src', dataItem.coveredSrc)
                    }
                    memoryStack = [];
                    multiplex--
                    score.textContent = 0;
                }, 1300)
            }
        }
    }
})
