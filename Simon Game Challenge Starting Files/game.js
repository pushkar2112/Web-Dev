var buttonCoulours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


$('.btn').click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

})

function nextSequence(){
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level += 1;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonCoulours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
    $("." + currentColour).removeClass("pressed")
  },100);
}

function restart(){
  started = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success")


    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else{
    console.log("Wrong")
    wrong = "wrong";
    playSound(wrong);
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restart();
  }

}
