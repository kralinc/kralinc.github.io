//Collect document elements
const FORM = document.querySelector("#object-form");
const FORMINPUT = document.querySelector("#object-form-input");
const OUTPUT = document.querySelector("#output");

//Minimum number of permissible legs
const MINLEGS = 2;

//it adds an event listener what more do you need to know leave me alone.
FORM.addEventListener("submit", function(event) {validate(event)}, false);

//Why did I create an object to hold a single variable.
function Arthropod(legs) 
{
	this.legs = legs;
}

//Initialize our object
let arthropod = new Arthropod(0);

//Validate the form input
function validate(e) 
{
	e.preventDefault(); //prevents form from being stupid
	let formInput = FORMINPUT.value;
	
	//see isValid()
	if (isValid(formInput)) 
	{
		arthropod.legs = parseInt(formInput);
		OUTPUT.innerHTML = "This arthropod has " + arthropod.legs + " legs.";
		
		//Nice
		if (arthropod.legs > 1000000) 
		{
			OUTPUT.innerHTML += " Dang boi that a lot of legs what r u doin with all those";
		}
		
	}else 
	{
		OUTPUT.innerHTML = "Invalid number of legs. Must be integer at least " + MINLEGS + ".";
	}
}

//Checks if the given number is an integer within the acceptable range
//Uses helper functions contained in form-validation.js which were written for reusability
function isValid(input) 
{
	return (isValidInt(input) && (parseInt(input) >= MINLEGS));
}