var hyponoticalBall, database;
var position;

function setup(){
    database = firebase.database;
    createCanvas(500,500);
    hyponoticalBall = createSprite(250,250,10,10);
    hyponoticalBall.shapeColor = "red";
    var hyponoticalBallposition = database.ref('ball/position');
    hyponoticalBallposition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
    'x' : position.x + x,
   'y' : position.y + y
})   }

function readPosition(data){
    position = data.val();
    hyponoticalBall.x = position.x;
    hyponoticalBall.y = position.y;
}

function showError(){
    console.log("error in writing to the database");
}