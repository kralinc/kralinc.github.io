function validateForm() {
    let usernameForm = document.getElementById("username");
	let milesForm = document.getElementById("miles");
	let gallonsForm = document.getElementById("gallons");
	
	//This string will be placed into the errorlabel section of the form.
	let errorString = "";
	
	//Validate username
	//This regex looks for an unobstructed sequence of alphabetic characters.
	let nameRegex = /(^|\s)[a-zA-Z]+($|\s)/;
	let name = nameRegex.exec(usernameForm.value);
	let nameValid = true;
	if (name == null) //if it finds no matches for the name regex
	{
		errorString += "Name must contain a word with no numbers or special characters.<br>";
		nameValid = false;
	}else {
		name = name[0]; //w3schools said exec only returns 1 match but NO
	}
	
	//Finds numbers, including those with decimals.
	let numberRegex = /^\d+\.?\d*$/;
	
	
	//For miles and gallons, it first checks if the regex returns a valid number
	//if so, it checks if the value of the number is allowed in the form
	let milesFormValid = numberRegex.test(milesForm.value);
	let milesFormValue;
	if (milesFormValid) {
		milesFormValue = parseFloat(milesForm.value);
		if (!(milesFormValue >= 0)) {
			milesFormValid = false;
		}
	}
	
	let gallonsFormValid = numberRegex.test(gallonsForm.value);
	let gallonsFormValue;
	if (gallonsFormValid) {
		gallonsFormValue = parseFloat(gallonsForm.value);
		if (!(gallonsFormValue > 0)) {
			gallonsFormValid = false;	
		}
	}
	
	//calculate miles per gallon if applicable
	let milesPerGallon;
	
	if (milesFormValid && gallonsFormValid) 
	{
		milesPerGallon = (milesFormValue / gallonsFormValue).toFixed(2);
	}else {
		if (!milesFormValid) 
		{
			errorString += "Enter a valid nonnegative number for miles.<br>";
		}
		if (!gallonsFormValid) 
		{
			errorString += "Enter a valid number greater than 0 for gallons.";	
		}
	}
	
	//Prints errors if there are any, prints nothing otherwise
	document.getElementById("errorlabel").innerHTML = errorString;
	
	//Prints the output of the program as long as all inputs are valid.
	if (milesFormValid && gallonsFormValid && nameValid) 
	{
		let outputString = name + " drove " 
		+ milesFormValue + " miles on " 
		+ gallonsFormValue + " gallons, for an MPG of "
		+ milesPerGallon;
		
		document.getElementById("output").innerHTML = outputString;
	}
	
}
