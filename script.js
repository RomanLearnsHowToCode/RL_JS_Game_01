console.log(" * Author: Roman Liewehr * \n * Project: RL_2022_JS_GAME_01 * \n * LinkedIn: https://www.linkedin.com/in/roman-l-b38653170/ * \n * Portfolio: https://rl445.brighton.domains * \n * Project inspired by YouTube tutorial: https://www.youtube.com/watch?v=jl29qI62XPg *");

// Canvas Setup
const canvas = document.getElementById('canvas1'); // reference to canvas1 id
const ctx = canvas.getContext('2d'); //access to draw 2d content
canvas.width = 800; // same values as in css file
canvas.height = 500;

let score = 0; 
let gameFrame = 0; // we will increase this value every second, so we can spawn bubbles each 100 frames etc
ctx.font = '50px Georgia'; // we will use font to display score

// Mouse Interactivity
const mouse = {
    x: canvas.width/2, // middle of the screen horizontally
    y: canvas.height/2, // middle of the screen vertically
    click: false
}

/* This bounding rectangle is inbuilt function for canvas, 
   By console logging it we will find out variables with values, 
   left and top will be used as offsets for mouse position, lines 29 and 30
*/
let canvasPosition = canvas.getBoundingClientRect();
//console.log(canvasPosition);

 // function inside is callback function, the values will be overriden
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left; 
    mouse.y = event.y - canvasPosition.top;
    //console.log(event);
    //console.log("Mouse X is: " + mouse.x, "Mouse Y is: " + mouse.y);
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

// Player
const playerLeft = new Image();
playerLeft.src = 'Assets/cartoon_fish_06_red_swim_left.png';
const playerRight = new Image();
playerRight.src = 'Assets/cartoon_fish_06_red_swim_right.png';

class Player {
    constructor(){
        // This will place player into middle of the canvas
        this.x = canvas.width/2; 
        this.y = canvas.height/2;
        this.radius = 50; // simple circle
        this.angle = 0; // for rotation of the sprite
        this.frameX = 0; // frame of the animation X
        this.frameY = 0; // frame of the animation Y
        this.frame = 0; // frame of the spritesheet
        this.spriteWidth = 498; // the width of single frame
        this.spriteHeight = 327; // the height of single frame
    }
    update(){
        const dx = this.x - mouse.x; // distance x from mouse.x
        const dy = this.y - mouse.y; // distance y from mouse.y
        // if the mouse.x is not x, then x - distance, the distance can be both positive or negative
        let theta = Math.atan2(dy, dx); // this is to calculate angle of the fish (fish will face the direction of mouse)
        this.angle = theta;
        if(mouse.x != this.x){
        // divided by 30 so this will happen over time (speed) without division it would jump straigt to that X
            this.x -= dx/30; // speed of movement
        }
        if(mouse.y != this.y){
            this.y -= dy/30; // speed of movement
        }
    } // https://www.w3schools.com/tags/ref_canvas.asp 
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y); // this will take values from update ifs
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius,10);

        ctx.save(); // save current canvas settings
        ctx.translate(this.x, this.y); // pos x and y are now translated for both calls where is 0 - 60 and 0 - 45
        ctx.rotate(this.angle);
        if(this.x >= mouse.x) {
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                        this.spriteWidth, this.spriteHeight, 0 - 60 , 0 - 45, this.spriteWidth/4, this.spriteHeight/4);
        } else {
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                this.spriteWidth, this.spriteHeight, 0 - 60 , 0 - 45, this.spriteWidth/4, this.spriteHeight/4);
        }
        ctx.restore();
    }
}
const player = new Player();

// Bubbles
const bubblesArray = [];
class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100  + Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance; // this is to calculate collision
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'; // turnery operator (if else shortened)
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy); // pythagorian theorem to calculate collision distance
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2); // Math.Pi * 2 = 360 degree circle
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Assets/bubblePop1.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'Assets/bubblePop2.ogg';


function handleBubbles(){
    // if the gameFrame is divisible by 50 and the remainder is 0 (run this code every 50 frames)
    if (gameFrame % 50 == 0){
        bubblesArray.push(new Bubble());
        //console.log(bubblesArray.length);
    }
    /*  We need to create second for statement 
        and loop through the array again, it is not a good practice,
        but those bubbles would blink.. now after reading comments, the explanation is following:

        The reason why you get the blinking at 25:37 is that when you do bubblesArray.splice(i,1)
        all following values in the array move back one position. So, what was (i+1) becomes (i).
        Your update() and draw() methods will not be called for that new item (i), and you see a blink.
        Not all bubbles blink. Just the one after the one that was removed. To fix, add i--; after you call splice.
        That will make your for loop will go back a step and draw the item that just got moved into this (i) position.
     */
    // fixed for loop (i--)
    for (let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        if(bubblesArray[i].y <0 - bubblesArray[i].radius *2) { // if the bubble position is greater than 0
            bubblesArray.splice(i, 1); // then delete it (it is out of screen)
            i--;
        } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
            if (!bubblesArray[i].counted){
                if(bubblesArray[i].sound == 'sound1'){
                    bubblePop1.play();
                } else {
                    bubblePop2.play();
                }
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i,1);
                i--;
            }
        }
    }
}

// Animation Loop - principal recursion (call over and over)
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50 );
    gameFrame++; 
    //console.log(gameFrame);
    requestAnimationFrame(animate);
}
animate();

// this will refresh canvasPosition if resized, so the navigation will be always correct
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});