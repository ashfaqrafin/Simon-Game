
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    var audio1= new Audio("sounds/"+userChosenColour+".mp3");
    audio1.play();


    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    
    checkAnswer(userClickedPattern.length-1);

});


var started=true;
var level=0;

$(document).keypress(function()
{
    if(started)
    {      
        nextSequence();
        $("#level-title").text("Level 0");
        started=false;

    }
})



function nextSequence()
{
    level++;
    
    $("#level-title").text("Level  "+level);


    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    
}


function playSound(name)
{
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    
    
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();

}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");

    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");

        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000)
        }
    }
    else 
    {
        console.log("wrong");
        playSound("wrong");  
        
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}
function startOver() {

    level = 0;
    gamePattern = [];
    started = true;
  }
  