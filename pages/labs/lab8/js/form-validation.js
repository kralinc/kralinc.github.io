function isValidInt(string) {
	let intRegex = /^(\s*)\d+(\s*)$/;
	//let whitespaceRegex = /\s/g;
	return intRegex.test(string);
}

function isValidFloat(string) {
	let floatRegex = /^\d+\.?\d*$/;
	return floatRegex.test(string);
}

function isValidWord(string) {
	let wordRegex = /^[A-Za-z]+$/;
	return wordRegex.test(string);
}