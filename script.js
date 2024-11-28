const board = document.getElementById("game")
const ctx = board.getContext("2d")
let feed;
let bomb;
let speed = 90;
let level = "low";
const score = document.getElementById("Score")
let score_val = 0;
time = 0;
let map =  [
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
    [1 , 1 , 1 , 1, 1 , 1 , 1 , 1 , 1 , 1 ],
]
let mathMap = [
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
    [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
]
let line = 0 ;
let col = 0;
let snake = {
    x : 5,
    y : 10,
    nowx : 5,
    nowy : 10
}
let way;

function init(){
    
    let randy = Math.round(Math.random()*100 / 12);
    if(randy != 0) {
        randy -- 

    } else {
        randy = 0
    }
    let randx = Math.round(Math.random()*100 / 12);
    if(randx != 0) {
        randx -- 

    } else {
        randx = 0
    }
    if(randx > 9|| randy > 9){
        alert("error")
    }
    
    if(randx == snake.x && randy == snake.y){
        randy = Math.round(Math.random()*100 / 12);
        if(randy != 0) {
            randy -- 

        } else {
            randy = 0
        }
        randx = Math.round(Math.random()*100 / 12);
        if(randx != 0) {
            randx -- 

        } else {
            randx = 0
        }
        if(randx > 9|| randy > 9){
            alert("error")
        }
    }
    let num = Math.round(Math.random()*100);
    while(true){
        num = Math.round(Math.random()*100);
        if(num % 2 == 0){
            break;
        }
    }
    mathMap[randy ] [randx] = [1 , num]
    randy = Math.round(Math.random()*100 / 12);
    if(randy != 0) {
        randy -- 
    } else {
        randy = 0
    }
    randx = Math.round(Math.random()*100 / 12);
    if(randx != 0) {
        randx -- ;
    } else {
        randx = 0;
    }
    if(randx > 9|| randy > 9){
        alert("error");
    }
     num = Math.round(Math.random()*100);
    while(true){
        num = Math.round(Math.random()*100);
        if(num % 2 == 1){
            break;
            
        }
    }
    mathMap[randy ] [randx] = [0 , num]
}
init()
function gameOver(){
    document.getElementsByTagName("audio")[0].play()
    document.getElementsByTagName("section")[0].style.display = "flex"
        document.getElementsByTagName("span")[0].innerHTML = "GAME OVER <br> SCORE : " + score_val
        function close(){
            document.getElementsByTagName("section")[0].style.display = "none"
        }
        setTimeout(() => {
             close()
        }, 2000);
        snake.x = 5
        snake.y = 10
        score_val = 0;
        time = 0;
        way = ""
        let mathMap = [
            [0 , 0 , 0, 0 , 0 , [1 , 12] , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0],
        ]
}
document.getElementsByClassName("up")[0].addEventListener("click" , (e) => {
    way = "up"
})
document.getElementsByClassName("right")[0].addEventListener("click" , (e) => {
    way = "right"
})
document.getElementsByClassName("left")[0].addEventListener("click" , (e) => {
    way = "left"
})
document.getElementsByClassName("down")[0].addEventListener("click" , (e) => {
    way = "down"
})
document.addEventListener("keydown" , (e) => {
    document.getElementsByClassName("stop")[0].style.display = "none"
            document.getElementsByClassName("stop2")[0].style.display = "none"
    switch (e.key) {
        case "ArrowRight":
            //snake.nowx = snake.x
            //snake.nowy = snake.y
            //snake.x ++
            way = "right";
            break;
        case "ArrowLeft":
            //snake.nowx = snake.x
            //snake.nowy = snake.y
            //snake.x --
            way = "left";
            break;
        case "ArrowUp":
            //snake.nowy = snake.y
            //snake.nowx = snake.x
            //snake.y --
            way = "up";
            break;
        case "ArrowDown":
            //snake.nowy = snake.y
            //snake.nowx = snake.x
            //snake.y ++
            way = "down";
            break;
        case "Alt":
            //snake.nowy = snake.y
            //snake.nowx = snake.x
            //snake.y ++
            way = "stop";
            document.getElementsByClassName("stop")[0].style.display = "block"
            document.getElementsByClassName("stop2")[0].style.display = "block"
            break;
    
        default:
            break;
    }
    
})
function setLoop(){
    
return setInterval(() => {
    switch(way) {
        case "right" :
            snake.nowx = snake.x;
            snake.nowy = snake.y;
            snake.x ++
            break
        case "left" :
            snake.nowx = snake.x;
            snake.nowy = snake.y;
            snake.x --
            break
        case "up" :
            snake.nowy = snake.y;
            snake.nowx = snake.x;
            snake.y --
            break
        case "down" :
            snake.nowy = snake.y;
            snake.nowx = snake.x;
            snake.y ++
            break
    }
    if((snake.x < 1 || snake.x > 10 || snake.y < 1 || snake.y > 10 )&& level != "low"){
        gameOver();
        
    }else if(level == "low"){
        if(snake.x < 1){
            snake.x = 9;
        }
        if(snake.x > 9){
            snake.x = 1;
        }
        if(snake.y > 10){
            snake.y = 1;
        }
        if(snake.y < 1){
            snake.y = 9;
        }
    
    }

        /*
    if(snake.x < 1){
        snake.x = 9;
    }else if(snake.x > 9){
        snake.x = 1;
    }else if(snake.y < 1){
        snake.y = 9;
    }else if(snake.y > 9){
        snake.y = 1;
    }
    */
    if(snake.x == feed.x && snake.y == feed.y){
       win();
    }
    if(snake.x == bomb.x && snake.y == bomb.y){
       gameOver();
    }
}, speed);
}

setInterval(() => {
    time++
}, 1000);
setInterval(() => {
    line = 0;
    col=0;
    
    map[snake.y - 1] [snake.x-1] = 0;
    if(snake.nowx != snake.x || snake.nowy != snake.y){
        map[snake.nowy - 1] [snake.nowx-1] = 1;
    }
    
    map.forEach(element => {
    
        element.forEach(key => {
            ctx.fillStyle = "white";
            if(key == "0"){
                ctx.fillRect(col * 108  , line * 108 , 105 ,105)
            }else if(key == "1"){
                ctx.fillStyle = "black"
                ctx.fillRect(col * 108  , line * 108 , 105 ,105);
            }
            col++;
        })
        col = 0;
        line ++;
    });
    line = 0;
    col = 0;
    mathMap.forEach(element => {
        col = 0;
        element.forEach (key => {
            col ++;
            if(key != false && key[0] ){
                ctx.fillStyle = "green"
                ctx.fillRect(col  * 108  , line  * 108 , 105 ,105);
                ctx.fillStyle = "black"
                ctx.font = "50px Arial";
                ctx.fillText(key[1],col*108 + 20 ,line*108 + 70 );

                let lox = (col + 1 > 10) ? col  : col + 1

                feed = {
                    x : lox, 
                    y : line + 1,
                }
            }
            if(key != false && !key[0] ){
                ctx.fillStyle = "green"
                ctx.fillRect(col  * 108  , line  * 108 , 105 ,105);
                ctx.fillStyle = "black"
                ctx.font = "50px Arial";
                ctx.fillText(key[1],col*108 + 20 ,line*108 + 70 );
                let lox = (col + 1 > 10) ? col  : col + 1
                bomb = {
                    x : lox, 
                    y : line + 1,
                }
            }
        })
        line ++;
    })
    score.innerHTML = "Score : "+score_val + " & Time : "+Math.round(time);
    
} , 0.1)
    
function win(){
    document.getElementsByTagName("audio")[1].play()
    mathMap[feed.y - 1][feed.x -2 ] = 0;
    mathMap[bomb.y - 1][bomb.x -2 ] = 0;
    let randy = Math.round(Math.random()*100 / 12);
    if(randy != 0) {
        randy -- 

    } else {
        randy = 0
    }
    let randx = Math.round(Math.random()*100 / 12);
    if(randx != 0) {
        randx -- 

    } else {
        randx = 0
    }
    if(randx > 9|| randy > 9){
        alert("error")
    }
    
    if(randx == snake.x && randy == snake.y){
        randy = Math.round(Math.random()*100 / 12);
        if(randy != 0) {
            randy -- 

        } else {
            randy = 0
        }
        randx = Math.round(Math.random()*100 / 12);
        if(randx != 0) {
            randx -- 

        } else {
            randx = 0
        }
        if(randx > 9|| randy > 9){
            alert("error")
        }
    }
    let num = Math.round(Math.random()*100);
    while(randx == feed.x  && randy == feed.y ){
        randy = Math.round(Math.random()*100 / 12);
        if(randy != 0) {
            randy -- 
        } else {
            randy = 0
        }
        randx = Math.round(Math.random()*100 / 12);
        if(randx != 0) {
            randx -- ;
        } else {
            randx = 0;
        }
        if(randx > 9|| randy > 9){
            alert("error");
        }
    }
    while(true){
        num = Math.round(Math.random()*100);
        if(num % 2 == 0){
            break;
        }
    }
    mathMap[randy ] [randx] = [1 , num]
    randy = Math.round(Math.random()*100 / 12);
    if(randy != 0) {
        randy -- 
    } else {
        randy = 0
    }
    randx = Math.round(Math.random()*100 / 12);
    if(randx != 0) {
        randx -- ;
    } else {
        randx = 0;
    }
    if(randx > 9|| randy > 9){
        alert("error");
    }
    while(randx == bomb.x  && randy == bomb.y ){
        randy = Math.round(Math.random()*100 / 12);
        if(randy != 0) {
            randy -- 
        } else {
            randy = 0
        }
        randx = Math.round(Math.random()*100 / 12);
        if(randx != 0) {
            randx -- ;
        } else {
            randx = 0;
        }
        if(randx > 9|| randy > 9){
            alert("error");
        }
    }
     num = Math.round(Math.random()*(10**2));
    while(true){
        num = Math.round(Math.random()*(10**2));
        if(num % 2 == 1){
            break;
            
        }
    }
    
    
    
    mathMap[randy ] [randx] = [0 , num]
    score_val ++;
}
document.getElementsByClassName("level_selector")[0].addEventListener("click" , (e) => {
    level = e.target.innerText;
    speed = 150;
    startGame();
})
document.getElementsByClassName("level_selector")[1].addEventListener("click" , (e) => {
    level = e.target.innerText;
    speed = 90;
    startGame();
})
document.getElementsByClassName("level_selector")[2].addEventListener("click" , (e) => {
    level = e.target.innerText;
    speed = 60;
    startGame();
})
function startGame(){
    document.getElementsByClassName("level")[0].style.display = "none";
    setLoop()
}
setTimeout(() => {

    document.getElementsByTagName("audio")[2].play();
    document.getElementsByClassName("start_page")[0].style.opacity = 0;
    setTimeout(() => {
        document.getElementsByClassName("start_page")[0].style.display = "none";
    }, 500);
}, 3000);