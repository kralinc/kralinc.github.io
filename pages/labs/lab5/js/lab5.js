function validateForm() {
    let usernameForm = document.getElementById("username");
	let mpgForm = document.getElementById("mpg");
	
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
    //Allows making lists with either commas or spaces
    let splitMPGDataRegex = /(, |,)/g;
	
    //grab raw data from form
    let rawMPGData = mpgForm.value;
    let rawMPGPairs = rawMPGData.replace(splitMPGDataRegex, " ").split(" ");
    let mpgPairs = [];
    let mpgDataIsValid = true;
    
    
    //load valid pairs of numbers into the mpgPairs array
    for (let i = 0; i < rawMPGPairs.length; ++i) {
        let pair = rawMPGPairs[i].split("/");
        
        //Each MPG pair has exactly 2 elements. Failing to have exactly 2 means invalid input
        if (pair.length != 2) 
        {
            mpgDataIsValid = false;
            errorString += rawMPGPairs[i] + " is not a valid miles/gallons pair.<br>";
            break;
        }
        
        //Test if miles and gallons are valid numbers
        let miles = pair[0];
        let gallons = pair[1];
        let milesValid = numberRegex.test(miles);
        let gallonsValid = numberRegex.test(gallons);
        
        //Pushes to array only if miles and gallons are valid numbers
        //and if they are both within the accepted range of values
        if (milesValid 
            && gallonsValid 
            && !(parseFloat(miles) < 0 || parseFloat(gallons) <= 0)) 
        {
            mpgPairs.push(pair);
        }else {
            mpgDataIsValid = false;
            errorString += rawMPGPairs[i] + " is not a valid miles/gallons pair.<br>";
            break;
        }
    }

    //==== Output ====
    if (mpgDataIsValid && nameValid) {
        let output = "Driver: " + name + "<br>";
        let totalMiles = 0;
        let totalGallons = 0;
        
        //Loops through only once because I am amazing.
        for (let i = 0; i < mpgPairs.length; ++i)
        {
            let miles = parseFloat(mpgPairs[i][0]);
            let gallons = parseFloat(mpgPairs[i][1]);
            let mpg = (miles / gallons).toFixed(2);
            output += miles + "/" + gallons + " -> " + mpg +" MPG" + "<br>";
            totalMiles += miles;
            totalGallons += gallons;
        }
        
        let totalMPG = (totalMiles / totalGallons).toFixed(2);
        
        output += "Total miles: " + totalMiles 
            + "<br>Total gallons: " + totalGallons 
            + "<br>Overall MPG: " + totalMPG;
        
        document.getElementById("output").innerHTML = output;
    }
    
    
	//Prints errors if there are any, prints nothing otherwise
	document.getElementById("errorlabel").innerHTML = errorString;

	
}
