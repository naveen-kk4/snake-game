// game constants and variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio("./assets/food.mp3");
const gameOverSound = new Audio("./assets/gameover.mp3");
const moveSound = new Audio("./assets/move.mp3");
const musicSound = new Audio("./assets/music.mp3");
const board = document.getElementById("board");
let score = 0;
let speed = 2;
let lastPaintTime = 0;
let snakeArr=[
    {x:13 , y:13}
]
let food = {x:6 , y:7};


// all game functions

function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime - lastPaintTime)/1000 < 1/speed)return;
    lastPaintTime = ctime;
    gameEngine();

}
function isCollided(sArr){
    // if you bump into yourself
    for(let i = 1; i<snakeArr.length;i++){
        if(sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y){
            return true;
        }
    }
    // if you bump into wall
    if(sArr[0].x >=18 || sArr[0].x <=0  || sArr[0].y >=18 || sArr[0].y <=0 )return true;
}





function gameEngine(){
    //part 1 - updating snake array and food
    if(isCollided(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over . Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        if(score > localStorage.getItem("highScore")){
            localStorage.setItem("highScore",JSON.stringify(score));
            document.getElementById("highScore-head").innerHTML = "HIGHSCORE : "+score;
        }
        score=0;
        speed = 2;
        document.getElementById("score-head").innerHTML = "SCORE : 0";
    }



    // if food is eaten , increment score and reset food

    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){ 
        score+=1;
        speed+=0.5;
       document.getElementById("score-head").innerHTML = "SCORE : "+score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()) , y : Math.round(a + (b-a)*Math.random())};
   
    }

    // moving the snake 
    for (let i = snakeArr.length - 2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    

    // part 2 - Display snake and food


    //display snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index==0){
            snakeElement.classList.add("head");
        }
        else  snakeElement.classList.add("snake");
        board.appendChild(snakeElement);

    })
     
    //display food 
  
       foodElement = document.createElement("div");
       foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
       foodElement.classList.add("food");
        board.appendChild(foodElement);

    

}










// main logic starting point

let highScore = localStorage.getItem("highScore");
if(highScore===null){
  
    localStorage.setItem("highScore",JSON.stringify(0));
}
else{
    document.getElementById("highScore-head").innerHTML = "HIGHSCORE : "+highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1}
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
        case 'ArrowDown':console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        case 'ArrowLeft':console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
        case 'ArrowRight':console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    }

})


