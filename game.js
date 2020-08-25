
const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let gameStarted = false
let level = 1;


$(".btn").click( (e) => {

    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer()


});
$(document).keydown( (e) => {
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    }

});



function playAnimation(chosenColor) {
    $("#"+chosenColor).fadeOut(200).fadeIn(200);
}

function playsound(chosenColor) {
    let audio = new Audio("sounds/" + chosenColor + ".mp3")
    audio.play();

}

function nextSequence(){

    $(" #level-title ").text("level " + level);
    level += 1
    let randomNumber = Math.floor(Math.random()*3);
    let chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    playAnimation(chosenColor);
    playsound(chosenColor);

}

function checkAnswer(){
    currentLevel = userClickedPattern.length -1;

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern.length = 0;
            $(document).delay(1000);
            nextSequence();
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over").delay(200).queue( function (next){
            $(this).removeClass("game-over");
            next();
        });
        $(" #level-title ").text("Game Over, Press Any Key to Restart");
        gameStarted = false;
        level = 1;
        userClickedPattern.length = 0;
        gamePattern.length = 0;
    }
}