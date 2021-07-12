const SETUPFORM = document.querySelector("#setup-form");

const MINPLAYERS = 2; //Can't play by yourself. Rules of the game don't allow for it
const MINNUMIN = 1; //Can't give everyone zero tiles. Even one tile doesn't make much sense but at least doesn't break the game
const MINHUMANS = 0; //Can't have negative human players
const MINAIDELAY = 0; //Can't have a negative delay in an interval

let NUMBERMAX;
let NUMPLAYERS;
let NUMHUMANS;
let AIDELAY;
let CORNERSARENEIGHBORS;

function validateSetupForm(event) 
{
    event.preventDefault();
    //Get form elements
    const MAXNUMIN = document.querySelector("#max-number-input");
    const NUMPLAYERSIN = document.querySelector("#num-players-input");
    const NUMHUMANSIN = document.querySelector("#num-humans-input");
    const NUMDELAYIN = document.querySelector("#num-delay-input");
    const CORNERSIN = document.querySelector("#check-corners");
    const ERROROUT = document.querySelector("#setup-form-error");
    
    //Clear errors
    MAXNUMIN.classList.remove("num-in-error");
    NUMPLAYERSIN.classList.remove("num-in-error");
    NUMHUMANSIN.classList.remove("num-in-error");
    NUMDELAYIN.classList.remove("num-in-error");
    
    //Get the numbers inputted into the boxes
    NUMBERMAX = parseInt(MAXNUMIN.value);
    NUMPLAYERS = parseInt(NUMPLAYERSIN.value);
    NUMHUMANS = parseInt(NUMHUMANSIN.value);
    AIDELAY = parseInt(NUMDELAYIN.value);
    CORNERSARENEIGHBORS = CORNERSIN.checked;
    
    //If any of the form values is invalid, do not move onto the next step
    if (NUMBERMAX < MINNUMIN || NUMPLAYERS < MINPLAYERS || NUMHUMANS < MINHUMANS || AIDELAY < MINAIDELAY) 
    {
        //Show error messages based on which boxes specifically have something wrong with them
        if (NUMBERMAX < MINNUMIN) 
        {
            ERROROUT.innerHTML = "Please enter a number greater than zero for maximum number of tiles.";
            MAXNUMIN.classList.add("num-in-error");
        }
        if (NUMPLAYERS < MINPLAYERS) {
            ERROROUT.innerHTML += "<br>Please enter a number of players no less than 2.";
            NUMPLAYERSIN.classList.add("num-in-error");
        }
        if (NUMHUMANS < MINHUMANS) {
            ERROROUT.innerHTML += "<br>Please enter a non-negative number of humans.";
            NUMHUMANSIN.classList.add("num-in-error");
        }
        if (AIDELAY < MINAIDELAY) {
            ERROROUT.innerHTML += "<br>Please enter a number no less than 0 for AI Delay.";
            NUMDELAYIN.classList.add("num-in-error");
        }
    }else 
    {
        //There has to be enough room on the board for every player to place all of their tiles
        //Each player has the same number of tiles
        //Therefore this number of tiles can be represented as T (number of tiles) * N (number of players)
        //     T * N
        //However BOARDSIZE isn't trying to find the number of tiles needed, it's trying to find the dimensions of the board
        //The board is a perfect square. Its height matches its width
        //The total size of this board will be BOARDSIZE * BOARDSIZE, or BOARDSIZE^2
        //So the length of a single dimension of the board must be 
        //    sqrt(T * N)
        //This usually doesn't result in an integer, so the result is rounded up
        //It's better to have too many tiles than not enough tiles
        //    ceil(sqrt(T * N))
        BOARDSIZE = Math.ceil(Math.sqrt(NUMBERMAX * NUMPLAYERS));

        //Start game
        SETUPFORM.parentNode.style.display = "none";
        document.querySelector("#flexbox").style.display = "flex";
        initialize();
    }
}

SETUPFORM.addEventListener("submit", function(event) {validateSetupForm(event)}, false);
