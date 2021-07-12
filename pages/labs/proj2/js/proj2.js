//Author: Liam Andrade
//Date: 7-Nov-2020
//Purpose: This file is where the game actually runs. Any functions that depend on the document or global variables are housed here.

//remove "no js" message
$("#remove-me").remove();

//Change the size of the bullets to be what was set in the definitions file
//Way more efficient than adding it for each bullet
$("body").prepend("<style> .bullet { width:" + BULLETSIZE + "%; height: " + BULLETSIZE + "%;</style>");

//Constants for screen items
const CANVAS = $("#game-canvas");
const PLAYER = $("#player");

//The list of patterns available to use in the game
const PATTERNS_EASY = [PATTERN_HEXAGON, PATTERN_OCTAGON, PATTERN_REVERSE_OCTAGON, PATTERN_RAIN, PATTERN_SWORLY, PATTERN_FLIPPED_HEXAGON, PATTERN_RAIN_SHIFT, PATTERN_SWORLY_REVERSE, PATTERN_HEXASHOTGUN, PATTERN_HEXASHOTGUN_ROTATED];

const PATTERNS_HARD = [PATTERN_HEXAGON, PATTERN_OCTAGON, PATTERN_REVERSE_OCTAGON, PATTERN_RAIN, PATTERN_SMOKE, PATTERN_SMOKE_SHIFT, PATTERN_SWORLY, PATTERN_FLIPPED_HEXAGON, PATTERN_RAIN_SHIFT, PATTERN_SWORLY_REVERSE, PATTERN_HEXASHOTGUN, PATTERN_HEXASHOTGUN_ROTATED, PATTERN_OCTASHOTGUN, PATTERN_OCTASHOTGUN_ROTATED, PATTERN_REVERSE_OCTAGON_ROTATE, PATTERN_DIAMONDBOUNCE, PATTERN_NOMERCY];

const PATTERNS_HELL = [PATTERN_HEXAGON, PATTERN_OCTAGON, PATTERN_REVERSE_OCTAGON, PATTERN_RAIN, PATTERN_SMOKE, PATTERN_SMOKE_SHIFT, PATTERN_SWORLY, PATTERN_FLIPPED_HEXAGON, PATTERN_RAIN_SHIFT, PATTERN_SWORLY_REVERSE, PATTERN_HEXASHOTGUN, PATTERN_HEXASHOTGUN_ROTATED, PATTERN_OCTASHOTGUN, PATTERN_OCTASHOTGUN_ROTATED, PATTERN_REVERSE_OCTAGON_ROTATE, PATTERN_DIAMONDBOUNCE, PATTERN_NOMERCY, HELL_DIAMONDBOUNCE, HELL_DODECAGON, HELL_DODECASHOTGUN, HELL_NOMERCY, HELL_RAIN, PATTERN_HAIL_LEFT, PATTERN_HAIL_RIGHT];

let PATTERNS;

// ==== Global constants ====
const PLAYERSPEED = 0.75;
const PLAYERSTARTPOS = new Vector2(50,75);
const HIGHSCORESTORAGE = "bulletHellHighScore";
let MAXBULLETSONSCREEN;

//Put a new bullet on the screen
function makeScreenBullet (bullet) 
{
    CANVAS.append("<div class='bullet' id='bullet" + bullet.id + "'></div>");
    let theBullet = getScreenBullet(bullet);
    theBullet.css("transform", "translate(" + bullet.pos.x + "vh, " + bullet.pos.y + "vh)");
    
}

//Move a bullet in data and on screen
function moveBullet(bullet) 
{
    //Get x and y components of velocity by deriving from position
    //(Thank you Diana Welsch for teaching me trig)
    let velocityX = bullet.vel * Math.cos(bullet.dir);
    let velocityY = bullet.vel * Math.sin(bullet.dir);
    
    //Move bullet in data
    bullet.pos.add(new Vector2(velocityX, velocityY));
    
    //physics
    bullet.vel += bullet.acc;
    
    //Move the bullet on screen
    getScreenBullet(bullet).css("transform", "translate(" + bullet.pos.x + "vh, " + bullet.pos.y + "vh)");
    
    //Remove the bullet if out of bounds
    //Gets pushed to a temporary "trash can" array so that the array is only affected after it's been looped through
    if (bullet.pos.x < -BULLETSIZE || bullet.pos.x > 100 + BULLETSIZE || bullet.pos.y < -BULLETSIZE || bullet.pos.y > 100 + BULLETSIZE) {
        bulletsMarkedForDeletion.push(bullet);
    }
}

//Get a bullet on screen with a certain id
function getScreenBullet(bullet) {
    return $("#bullet" + bullet.id);
}





//  ==== Global variables ====
let activeIntervals = {};
let activeBullets = [];
let bulletsMarkedForDeletion = [];
let currentBulletId = 0;
let currentIntervalId = 0;
let score = 0;
let lost = false;
let allowRestart = false;
let player = new Player(PLAYERSTARTPOS, PLAYERSPEED);


//Move the player based on keyboard input
function movePlayer() 
{
    //get input
    player.input.x = player.right - player.left;
    player.input.y = player.down - player.up;
    
    //Alter position
    player.pos.x += player.input.x * player.vel;
    player.pos.y += player.input.y * player.vel;
    
    //Bind player to play area
    if (player.pos.x < 0)
        {
            player.pos.x = 0;
        }
    
    if (player.pos.x > 100 - player.size.x)
        {
            player.pos.x = 100 - player.size.x;
        }
    if (player.pos.y < 0)
        {
            player.pos.y = 0;
        }
    if (player.pos.y > 100 - player.size.y)
        {
            player.pos.y = 100 - player.size.y;
        }
    
    //Changes the player's css to move them
    PLAYER.css("transform", "translate(" + player.pos.x + "vh, " + player.pos.y + "vh");
}

//Remove a bullet by finding its id in the arraylist
function removeBullet(bullet) {
    for (let i=0; i < activeBullets.length; ++i) 
    {
        if (activeBullets[i].id === bullet.id) 
        {
            activeBullets.splice(i, 1);
            getScreenBullet(bullet).remove();
        }
    }
}

//The function that is set to an interval to execute a bullet pattern
function patternInterval(pattern, index) 
{
    let bullet = pattern.fire(currentBulletId);
    
    //Stop this pattern if there are no more bullets left
    if (bullet === null) 
    {
        clearInterval(activeIntervals[index]);
        activeIntervals[index] = null;
    }else 
    {
        activeBullets.push(bullet);
        makeScreenBullet(bullet);
        currentBulletId++;
    }
    
    
}

//Create a new interval to execute a bullet pattern
function createInterval()
{
    if (activeBullets.length < MAXBULLETSONSCREEN) 
    {
        //Get random pattern
        let newPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)].copy();
        
        //create an interval for it
        activeIntervals[currentIntervalId] = setInterval( function() {
                patternInterval(newPattern, currentIntervalId)
            }, newPattern.delay);

        currentIntervalId++;
    }
}

//Main game loop
function draw() {
    
    //Move the player based on keyboard input
    movePlayer();
    
    //This loop acts on every active bullet
    //I want to use a for/in loop but they never work
    //I miss java
    for (let i=0; i < activeBullets.length; ++i) 
    {
        //Move the current bullet
        moveBullet(activeBullets[i]);
        
        //End the game if a bullet hit the player
        if (activeBullets[i].isOverlapping(player))
            {
                //Player can't die twice
                if (!lost) 
                {
                    lose();
                }
            }
    }
    
    //Remove all bullets that have gone out of bounds
    while (bulletsMarkedForDeletion.length > 0)
    {
        removeBullet(bulletsMarkedForDeletion[0]);
        bulletsMarkedForDeletion.shift();
    }
    
}

//Interperet the user input and send it to the player object
function getKeys(e, on)
{
    //Cannot move player after game is lost
    //Controls: WASD or Arrow Keys
    //W=87, A=65, S=83, D=68
    if (!lost) {
        switch (e.which) {
            case 87:
            case 38:
                player.up = on;
                break;
            case 65:
            case 37:
                player.left = on;
                break;
            case 83:
            case 40:
                player.down = on ;
                break;
            case 68:
            case 39:
                player.right = on;
                break;
        }
    }
}

//The stuff that happens when the player loses the game
function lose()
{
    //This is a cool CSS animation I'm so awesome
    PLAYER.addClass("exploded");
    PLAYER.removeAttr("id");
    
    //Stop launching bullets and counting score
    clearInterval(launchPatterns);
    clearInterval(increaseScore);
    
    //Score has like 20 decimals without this for some reason
    //I hate javascript
    score = parseFloat(score.toFixed(1));
    
    //Show the game over screen and player score
    $("#gameover").css("display", "flex");
    $("#score").text("Score: " + score);
    $("#highscore").text("High Score: " + getHighScore());
    
    //Clear input and make the player lose
    lost = true;
    player.left = false;
    player.right = false;
    player.up = false;
    player.down = false;

    //Makes a 1.2 second delay between when the player dies and when they can restart the game
    //Prevents the player from accidentally restarting too quickly
    setTimeout(function()
        {
            allowRestart = true;
        }, 1200);
}

//Reset the game to how it was when the player entered the game
function reset()
{
    //Make the player not exploded
    PLAYER.removeClass("exploded");
    PLAYER.attr("id", "player");
    
    //Remove all bullets from the game
    let allBullets = $(".bullet").remove();
    activeBullets = [];

    //Reset all of the intervals
    launchPatterns = setInterval(createInterval, 900);
    increaseScore = setInterval(function() {
        score += 0.1;
    }, 100);
        
    for (const [key, value] of Object.entries(activeIntervals)){
        clearInterval(value);
    }
    activeIntervals = {};
    
    //Remove game over screen
    $("#gameover").css("display", "none");
    
    //Put player back to default position
    player.pos = new Vector2(50,75);
    
    //Reset all counters to zero
    score = 0;
    currentBulletId = 0;
    currentIntervalId = 0;
    lost = false;
    allowRestart = false;
}


//Gets the high score from localStorage
function getHighScore()
{
    //Grab the high score from localStorage
    let storedHighScore = localStorage.getItem(HIGHSCORESTORAGE);
    
    //Set the localStorage variable for high score to the current score if
    // there is no current high score or if it beats the current high score
    if (storedHighScore === null || score > storedHighScore)
    {
        localStorage.setItem(HIGHSCORESTORAGE, score);
        return score;
    }else 
    {
        return storedHighScore;
    }
}


//Get input from keyboard
$("html").keydown(function (e) {
    getKeys(e, 1);
    
    //"Press any key to continue"
    if (lost && allowRestart)
        {
            reset();
        }
});

//Key is not being pressed if it is up (released)
$("html").keyup(function (e) {
    getKeys(e, 0);
});


//The 3 variables that really run the game
let loop;
let launchPatterns;
let increaseScore;


//When the game is launched from the settings screen, this event fires
$("#settings-form").submit(function(event) 
{
    //No reloading page dumb form frick you
    event.preventDefault();
    
    //Get the difficulty the player chose
    let difficultyChoice = $("input[name=difficulty]:checked").val();
    
    //There are 3 difficulty settings
    //They vary by choice of patterns, amount of bullets on-screen, and music.
    //The music is from UNDERTALE (undertale.com) and composed by Toby Fox (undertale.com)
    if (difficultyChoice == "easy") 
    {
        PATTERNS = PATTERNS_EASY;
        MAXBULLETSONSCREEN = 25;
        $("#music source").attr("src", "sound/mus_papyrusboss.ogg");
    }else  if (difficultyChoice == "hard") 
    {
        $("#music source").attr("src", "sound/mus_xpart.ogg");
        PATTERNS = PATTERNS_HARD;
        MAXBULLETSONSCREEN = 30;
    }else 
    {
        PATTERNS = PATTERNS_HELL;
        $("#music source").attr("src", "sound/mus_zz_megalovania.ogg");
        MAXBULLETSONSCREEN = 40;
    }
    
    //Remove the settings screen
    $("#settings").css("display", "none");
    
    //Load the selected music
    let audio = $("#music");
    audio[0].pause();
    audio[0].load();
    audio[0].play();
    
    //Start the draw loop
    loop = setInterval(draw, 16);
    
    //Set the game into its default state
    reset();
});
