//Regex tests for integer numbers
const numberRegex = /^(\s*)\d+(\s*)$/;

//Grab parts of the form
const ageForm = document.getElementById("age");
const insuranceForm = document.getElementById("insurance-amount");
const form = document.getElementById("insurance-form");

//Listen for form submission
form.addEventListener("submit", validate);


//Form validation
function validate() 
{
	//Error messages and output start blank. 
	//If nothing gets added to them then nothing gets displayed, as intended
	let errorMessages = "";
	let output = "";
	
	//Grab the values from the form
	let ageFormValue = ageForm.value;
	let insuranceFormValue = insuranceForm.value;
	
	//Test if valid integers were added,
	let ageFormIsValid = numberRegex.test(ageFormValue);
	let insuranceFormIsValid = numberRegex.test(insuranceFormValue);
	
	
	//If the age form does not contain an integer
	if (!ageFormIsValid)
	{
		errorMessages += "Please enter a valid whole number for age<br>";
		ageForm.classList.add("invalid-field");
	}
	
	//If the age form contains an integer but is outside of the accepted range
	if (ageFormIsValid && (parseInt(ageFormValue) < 0 || parseInt(ageFormValue) > 120))
	{
		ageFormIsValid = false;
		errorMessages += "Age must be a reasonable value (0-120).<br>";
		ageForm.classList.add("invalid-field");
	}else if (ageFormIsValid) {
		ageFormValue = parseInt(ageFormValue);
		if (ageForm.classList.contains("invalid-field")) {
			ageForm.classList.remove("invalid-field");
		}
	}
	
		
	//If the insurance form doesn't contain an integer
	if (!insuranceFormIsValid)
	{
		errorMessages += "Please enter a valid whole number for desired insurance.<br>";
		insuranceForm.classList.add("invalid-field");
	}
	
	//If the insurance form contains an integer but is outside of the accepted range
	if (insuranceFormIsValid && (parseInt(insuranceFormValue) < 2 || parseInt(insuranceFormValue) > 6)) 
	{
		insuranceFormIsValid = false;
		errorMessages += "You must request between 2 and 6 units ($10,000/unit) of insurance.";
		insuranceForm.classList.add("invalid-field");
	}else if (insuranceFormIsValid) {
		insuranceFormValue = parseInt(insuranceFormValue);
		if (insuranceForm.classList.contains("invalid-field")) {
			insuranceForm.classList.remove("invalid-field");
		}
	}
	
	
	//If all validation has passed
	if (insuranceFormIsValid && ageFormIsValid) 
	{
		
		//Calculate monthly rate using data from the table
		let montlyRate;
		
		if (ageFormValue > 70) {
			monthlyRate = 0;	
		}else if (ageFormValue > 64) {
			monthlyRate = 59;	
		}else if (ageFormValue > 40) {
			monthlyRate = 42;
		}else if (ageFormValue > 17) {
			monthlyRate = 32;
		}else if (ageFormValue > 1) {
			monthlyRate = 24;
		}else {
			monthlyRate = 0;
		}
		
		//A value of 0 means no insurance is available
		if (monthlyRate == 0)
		{
			output = "Sorry! We don't offer life insurance in your age range.";
		}
		else
		{
			const monthlyCost = insuranceFormValue * monthlyRate;
			const insuranceAmountInDollars = insuranceFormValue * 10000;
			output = "$" + insuranceAmountInDollars 
				+ " of life insurance for a " + ageFormValue 
				+ " year old will cost $" + monthlyCost 
				+ " per month.";
		}
	}
	
	//Error and standard output
	document.getElementById("error-messages").innerHTML = errorMessages;
	document.getElementById("output").innerHTML = output;
	
}