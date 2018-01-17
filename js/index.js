var redGamePiece, blueGamePiece, yellowGamePiece;
var myScore;
var upBoundary ,downBoundary,leftBoundary, rightBoundary;
//Game  manager
function startGame() {
    myGameArea.start();
    redGamePiece = new component(40, 40, "red", 10, 240);
    blueGamePiece = new component(40, 40, "blue", 430, 240);
    upBoundary = new component(478, 10, "green", 0, 0);
    downBoundary = new component(478, 10, "green", 0, 470);
    leftBoundary = new component(10, 478, "green", 470, 0);
    rightBoundary = new component(10, 478, "green", 0, 0);
    yellowGamePiece = new component(75, 460, "yellow", 190, 10);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}
// Canvas definition
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.started = false;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        this.clear();
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
  this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
             (mytop > otherbottom) ||
             (myright < otherleft) ||
             (myleft > otherright)) {
         crash = false;
      }
      return crash;
  };
}

// Frame update
function updateGameArea() {
  if (redGamePiece.crashWith(blueGamePiece)) {
          alert("BUUUM");
          restart();
      } else {
      myGameArea.clear();// If commented will leave a trail like tron
      myScore.text="SCORE: " + myGameArea.frameNo;
      if(this.myGameArea.start.started){ myGameArea.frameNo += 1 ;}
      myScore.update();
      // Boundaries
      upBoundary.update();
      downBoundary.update();
      leftBoundary.update();
      rightBoundary.update();
      // Planes
      redGamePiece.newPos();
      blueGamePiece.newPos();
      redGamePiece.update();
      blueGamePiece.update();
      // blankZone
      yellowGamePiece.update();// the order does matter
    }
}

function start() {
  this.myGameArea.start.started = true;
  redGamePiece.speedX += 1;
  blueGamePiece.speedX -= 1;
}
function restart() {
  this.myGameArea.start.started = false;
  redGamePiece.speedX -= 1;
  blueGamePiece.speedX += 1;
  myGameArea.frameNo -= 1;
    myGameArea.stop();
    startGame();
}
function stop() {
  alert("Buff you saved a Crash, maybe next time you can do it better?");
  restart();

}
