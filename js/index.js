var redGamePiece, blueGamePiece, yellowGamePiece;
var myScore;
//Game  manager
function startGame() {
    myGameArea.start();
    redGamePiece = new component(40, 40, "red", 10, 126);
    blueGamePiece = new component(40, 40, "blue", 400, 126);
    yellowGamePiece = new component(75, 470, "yellow", 188, 0);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}
// Canvas definition
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.started = false;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
// Player Definition
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
      ctx = myGameArea.context;
      if (this.type == "text") {
       ctx.font = this.width + " " + this.height;
       ctx.fillStyle = color;
       ctx.fillText(this.text, this.x, this.y);
     }else {
       ctx.fillStyle = color;
       ctx.fillRect(this.x, this.y, this.width, this.height);
     }
    };
  this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

// Frame update
function updateGameArea() {
    myGameArea.clear();// If commented will leave a trail like tron
    myScore.text="SCORE: " + myGameArea.frameNo;
    if(this.myGameArea.start.started){ myGameArea.frameNo += 1 ;}
    myScore.update();
    redGamePiece.newPos();
    blueGamePiece.newPos();
    redGamePiece.update();
    blueGamePiece.update();
    yellowGamePiece.update();// the order does matter
}

function start() {
  this.myGameArea.start.started = true;
  redGamePiece.speedX += 1;
  blueGamePiece.speedX -= 1;
}
function stop() {
  this.myGameArea.start.started = false;
  redGamePiece.speedX -= 1;
  blueGamePiece.speedX += 1;
  myGameArea.frameNo -= 1;
}
