//Color constants
const GREY = "#888";
const BLUE = "#66F";
const RED =  "#F66";
const GREEN = "#6F6";
const YELLOW = "#DD6";
const CYAN = "#6FF";
const PINK = "#F6F";
const COLORWHEEL = [BLUE, RED, GREEN, YELLOW, CYAN, PINK];
const DISALLOWEDCOLORS = [GREY, "#FFF", "#000"];

//const NUMBERMAX = 23;
//const NUMPLAYERS = 2;
//const NUMHUMANS = 1;

//Document constants
let BOARDSIZE;
const GRID = document.querySelector(".grid-container");
const SCOREDIV = document.querySelector("#scores");
const RESETBUTTON = document.querySelector("#reset");
const RELOADBUTTON = document.querySelector("#reload");
const TILESIZE = "6em ";
//const CORNERSARENEIGHBORS = true;
//const AIDELAY = 200;

//==== tile
class Tile {
	constructor(score, value, color, x, y) {
		this.score = score; 
		this.value = value; 
		this.color = color;
		this.x = x;
		this.y = y;
	}
	
}

//==== board
class Board {
	constructor(size, grid) 
    {
        //Creates a new board based on the size given by the algorithm in setup.js
        //It adds each tile to the CSS grid and adds an event listener to each tile to detect when one has been clicked on
		this.board = [];
		for (let y=0; y < size; ++y) {
			this.board.push([]);
			for (let x=0; x < size; ++x) {
				this.board[y].push(new Tile(0, 0, GREY, x, y));
				let newTile = document.createElement("div");
				newTile.classList.add("tile");
				newTile.classList.add("x" + x);
				newTile.classList.add("y" + y);
				newTile.style.backgroundColor = GREY;
				newTile.addEventListener("click", onTileClickScreen, false);
				grid.appendChild(newTile);
			}
		}
		
		
		let gridCSS = "grid-template-columns: " + TILESIZE.repeat(BOARDSIZE) + ";";
		GRID.setAttribute("style", gridCSS);
	}
	
	get(x, y) {
		return this.board[y][x];
	}
    
    reset() {
        //Iterates through the whole board and returns it to its default state, all empty tiles
        for (let y=0; y < this.board.length; ++y) 
        {
			for (let x=0; x < this.board[0].length; ++x) 
            {
				this.board[y][x] = new Tile(0, 0, GREY, x, y);
				let newTile = document.createElement("div");
		        let selector = ".x" + x + ".y" + y;
		        let screenTile = document.querySelector(selector);
				screenTile.style.backgroundColor = GREY;
                //Remove text if present
                if (screenTile.firstChild != null) 
                {
                    screenTile.removeChild(screenTile.firstChild);
                }
            }
        }
    }
}

//==== player
class Player {
	constructor(color) {
		this.numbers = this.generateNumbers();
		this.color = color;
		this.score = 0;
		this.scoreElem = document.createElement("div");
		//scoreElem.classList.add(".
	}
	
	generateNumbers() {
		let numbersArray = [];
		for (let i=1; i <= NUMBERMAX; ++i) {
			numbersArray.push(i);
		}
		
		//Fisher-yates shuffle
		for (let i = numbersArray.length - 1; i > 0; --i) {
			let j = Math.floor(Math.random() * i);
			let k = numbersArray[i];
			numbersArray[i] = numbersArray[j];
			numbersArray[j] = k;
		}
		//console.log(numbersArray);
		return numbersArray;
	}
}

//==== AI ====
class AI {
	constructor(player) {
		this.player = player;
	}
	
	makeMove() {
        //Not actually a heap, but a heapsorted tile list
		let heap = heapify(unusedTiles);
		
		let maxRealValueItem = null;
		let maxRealValue = -1;
		let currentValueItem = null;
		let currentValue = 0;
		
        //Iterate through the whole sorted list of unused tiles
		if (heap.length > 0) {
			do {
                //Grab the next tile and its value
				currentValueItem = heap.shift();
				currentValue = currentValueItem.value;

                //The real value of a tile is the amount that it can increase the player's score by
                //The regular value is simply the combined scores of the surrounding tiles
                //The value of a neighbor is only added to the real value if it is able to be flipped to the player's side
				let realValue = 0;
				let thePlayer = this.player;
				forEachNeighbor(currentValueItem, function(tile, neighbor, x, y) {
					if (!(neighbor.color === GREY || neighbor.color === thePlayer.color) && neighbor.score < thePlayer.numbers[0]) {
						realValue += neighbor.score;
					}
				});

                //If this tile has a higher real value than the maximum, then it is the new maximum
				if (realValue > maxRealValue) {
					maxRealValue = realValue;
					maxRealValueItem = currentValueItem;
				}

			}while (heap.length > 0);
		}else {
			//If there's nowhere to put a tile (only possible at the very beginning of the game) just put it at 1,1
			maxRealValueItem = new Tile(0,0,null,1,1);
		}
		
        //Find the tile in screen space, then click on it using the same function the humans use
		let selector = ".x" + maxRealValueItem.x + ".y" + maxRealValueItem.y;
		let screenTile = document.querySelector(selector);
		screenTile.style.backgroundColor = "#555";
		setTimeout(function() {tileClicked(screenTile)}, AIDELAY);
	}
}



//==== loose functions ====

//For when the user clicks on a tile
function onTileClickScreen(click) {
	let tile = click.target;
	tileClicked(tile);
}


//An abstraction of clicking on a tile used by AI and by players
function tileClicked(tile) {
	let classes = tile.classList;
	let x = parseInt(classes[1].substr(1, classes[1].length - 1));
	let y = parseInt(classes[2].substr(1, classes[2].length - 1));
	
	let dataTile = board.get(x, y);
    tile.scrollIntoView(false);
	modifyBoard(tile, dataTile);
}


function modifyBoard (screenTile, dataTile) 
{
	//If nothing has been placed on the tile yet
	if (dataTile.color === GREY ) {
		let color = currentPlayer.color;
		let number = currentPlayer.numbers.shift();
		
        //Do nothing if there are no numbers left
		if (isNaN(number)) {
			return;
		}
        //Set the color to the player's color and the number to the current number
		screenTile.style.backgroundColor = color;
		dataTile.color = color;
		dataTile.score = number;
		
		screenTile.appendChild(document.createTextNode(number));
		
        //Increase the player's score
		currentPlayer.score += number;
		
		//Add value to unused neighbors and take over used neighbors
		modifyNeighbors(dataTile);
        
        //Update the score on-screen
        for (let i=0; i < players.length; ++i) {
            document.querySelector(".player" + i).innerHTML = players[i].score;
        }
		
        //Set the current player to the next player
		currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
		currentPlayer = players[currentPlayerIndex];
		
        //Update the next tile ui
		document.querySelector("#next-num").innerHTML = currentPlayer.numbers[0];
		document.querySelector("#next-color").style.backgroundColor = currentPlayer.color;
        
        //End the game if the next player is out of moves
        if (isNaN(currentPlayer.numbers[0])) {
            endGame();
            return;
        }
		
		//Make a move if the next player is AI
		if (logicalPlayers[currentPlayerIndex] instanceof AI) {
			logicalPlayers[currentPlayerIndex].makeMove();
		}
	}
}

//Remove this tile from the list of unused tiles, then modify each of its neighbors according to the function below
function modifyNeighbors(tile) {
	
	if (unusedTilesPos(tile) != -1) 
	{
		unusedTiles.splice(unusedTilesPos(tile), 1);
	}
	

	forEachNeighbor(tile, modifyTile);

}

//Flip the color of the selected tile and modify the scores of the corresponding players
function modifyTile(tile, neighbor, x, y) {
	
    //If the neighboring tile is not empty, and is a different and lower scoring neighbor
	if (neighbor.score != 0 && neighbor.color != currentPlayer.color && neighbor.score < tile.score) {
		
        //Increase the current player's score by the neighbor score and decrease the original owner's score by that amount
		currentPlayer.score += neighbor.score;
		findPlayerByColor(neighbor.color).score -= neighbor.score;
		
        //Flip the neighbor's color to the player's color
		neighbor.color = tile.color;
		let selector = ".x" + x + ".y" + y;
		document.querySelector(selector).style.backgroundColor = neighbor.color;
		
	}else if (neighbor.score === 0) {
		//Otherwise if the tile is empty, increase its value and add it to the unused tiles list if it's not in already
		neighbor.value += tile.score;
		if (unusedTilesPos(neighbor) === -1) {
			unusedTiles.push(neighbor);
		}else {
			unusedTiles[unusedTilesPos(neighbor)] = neighbor;
		}
	}
}

//Do something on each of the tile's neighbors
function forEachNeighbor(tile, func) {
	for (let x = -1; x <= 1; ++x) 
	{
		for (let y = -1; y <= 1; ++y) 
		{
			//Skip corners if they are not being counted as neighbors
			if (x != 0 && y != 0 && !CORNERSARENEIGHBORS) 
			{
				continue;
			}
			
			//Get absolute coordinates
			let x2 = tile.x + x;
			let y2 = tile.y + y;

			//Do nothing if the coordinates are out of scope
			if (x2 < 0 || y2 < 0 || x2 >= BOARDSIZE || y2 >= BOARDSIZE) {
				continue;
			}
			
			//Do a function on the current neighbor
			let neighbor = board.get(x2, y2);
			func(tile, neighbor, x2, y2);
		}
	}
}

//Turn the array into a heap
function heapify(array) 
{
    //Copy array
	let newArray = array.slice();
	let heap = new TileMaxHeap();
	
    //Add all elements into the heap, then remove them all from the heap, which sorts it.
    //aka a heapsort
	while (newArray.length > 0) 
	{
		heap.add(newArray.pop());
	}
	
	let heapifiedArray = [];
	while (heap.getSize() > 0) 
	{
		heapifiedArray.push(heap.remove());
	}
	
	return heapifiedArray;
}

//Finds the index of a tile in the list of unused tiles by comparing their x,y coordinates
function unusedTilesPos(tile) {
	
	for (let i=0; i < unusedTiles.length; ++i) 
	{
		if (unusedTiles[i].x === tile.x && unusedTiles[i].y === tile.y) {
			return i;
		}
	}
	return -1;
}

//Finds a player by their color 
function findPlayerByColor(col) {
	let returnedColor = null;
    //Normally this would just return when it finds a match but this is a nested function so no can do
	players.forEach(function(value) {
		if (value.color === col) {
			returnedColor = value;
		}
	});
	
	return returnedColor;
}

//Generates a list of players and score trackers
function generatePlayers(scoresNeedGenerating) {
    
    //Start empty ofc
    players = [];
    logicalPlayers = [];
	
    //Copy the list of colors from the global list
    let colorWheelCopy = COLORWHEEL.concat();
    
    //Create a list of colors that won't conflict or override the reserved colors (like the board's grey)
	if (NUMPLAYERS > COLORWHEEL.length) 
    {
        for (let i = COLORWHEEL.length; i < NUMPLAYERS; ++i) 
        {
            let newColor = null;
            do {
                newColor = generateRandomColor();
            }while (newColor in colorWheelCopy || newColor in DISALLOWEDCOLORS);
            
            colorWheelCopy.push(newColor);
        }
    }
    
    //Create a new player object and a score element to go with it (if applicable)
	for (let i=0; i < NUMPLAYERS; ++i) {
        let newPlayer = new Player(colorWheelCopy[i]);
        if (scoresNeedGenerating) {
            newPlayer.scoreElem.innerHTML = "0";
            newPlayer.scoreElem.style.color = newPlayer.color;
            newPlayer.scoreElem.classList.add("player" + i);
            SCOREDIV.appendChild(newPlayer.scoreElem);
        }else {
            document.querySelector(".player" + i).innerHTML = "0";
        }
		players.push(newPlayer);
	}
	
    //The number of human players cannot exceed the total number of players
	let numHumans = (NUMHUMANS > NUMPLAYERS) ? NUMPLAYERS : NUMHUMANS;
	
    //Push human players to the "logical players" list first, then if there's any left, push AI to it
	for (let i = 0; i < numHumans; ++i) {
		logicalPlayers.push(players[i]);
	}
	
	for (let i = numHumans; i < players.length; ++i) {
		logicalPlayers.push(new AI(players[i]));
	}
	
    //Initialize game at player 0
	currentPlayer = players[0];
	document.querySelector("#next-num").innerHTML = currentPlayer.numbers[0];
	document.querySelector("#next-color").style.backgroundColor = currentPlayer.color;
	
    //If there's no humans, the first AI makes a move automatically
	if (numHumans === 0) {
		logicalPlayers[0].makeMove();
	}
}

//Generates a random hexadecimal color.
function generateRandomColor() {
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'c', 'D', 'E', 'F'];
    const colLen = allowedChars.length;
    
    let rand1 = Math.floor(Math.random() * colLen);
    let rand2 = Math.floor(Math.random() * colLen);
    let rand3 = Math.floor(Math.random() * colLen);
    
    return "#" + allowedChars[rand1] + allowedChars[rand2] + allowedChars[rand3];

}

//This event fires when there are no more moves left
function endGame() {
    //Show the win UI and high score
    const WINBOX = document.querySelector("#win-box");
    const highScorePlayerIndex = findHighScore();
    const highScorePlayer = players[highScorePlayerIndex];
    
    let winnerAnnounce = "Winner: Player " + (highScorePlayerIndex + 1) + "!<br>Score: " + highScorePlayer.score;
    document.querySelector("#win-message").innerHTML = winnerAnnounce;
    document.querySelector("#win-message").style.color = highScorePlayer.color;
    
    WINBOX.parentElement.style.display = "flex";
    //Prevent interaction with the board
    GRID.style.overflow = "hidden";
}

//Finds the highest scoring player in the list and returns it
function findHighScore() {
    let highScorePlayer = 0;
    let highScore = 0;
    for (let i=0; i < players.length; ++i) {
        if (players[i].score > highScore) {
            highScore = players[i].score;
            highScorePlayer = i;
        }
    }
    
    return highScorePlayer;
}

//Resets the game
function reset() {
    
    //Puts each tile in the board into its empty state
    board.reset();
    
    //Put globals back to default
    unusedTiles = [];

    players = [];
    currentPlayer = null;
    currentPlayerIndex = 0;

    logicalPlayers = [];

    //Reset the players without generating new scores
    generatePlayers(false);
    
    //Hide the win screen
    let winboxcontainer = document.querySelector("#win-box-container");
    winboxcontainer.style.display = "none";
    GRID.style.overflow = "auto";
}

//This runs when the player clicks "start" in settings
function initialize() {
    //Display the "next color" box of the UI
    document.querySelector("#next-color").style.display = "flex";
    //Create a new board
    board = new Board(BOARDSIZE, GRID);
    //Reset the board display
    GRID.style.display = "grid";
    //Generate a new list of players and their corresponding score objects
    generatePlayers(true);
}

//==== end class definitions ====

let board;
let unusedTiles = [];

let players = [];
let currentPlayer = null;
let currentPlayerIndex = 0;

let logicalPlayers = [];

//Remove the "Javascript required" message
document.querySelector("#remove-me").remove();

//Resets the game
RESETBUTTON.addEventListener("click", reset, false);

//Puts the player back on the settings screen
RELOADBUTTON.addEventListener("click", function ()
{
    //window.location.reload(false);
    SETUPFORM.parentNode.style.display = "flex";
    let winboxcontainer = document.querySelector("#win-box-container");
    winboxcontainer.style.display = "none";
    GRID.style.display = "none";
    GRID.textContent = "";
    document.querySelector("#scores").textContent = "";
    document.querySelector("#next-color").style.display = "none";
    document.querySelector("#flexbox").style.display = "none";
    unusedTiles = [];
}, false);
