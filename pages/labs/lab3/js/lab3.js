checkColors();

//==== Set a cookie ====
function setCookie(cookieName, cookieValue, expirationDays) {
	var date = new Date();
	//Time is in milliseconds
	date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + date.toGMTString();
	//It turns out either samesite has to be strict or secure must be true or both, but not neither.
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/;SameSite=Strict";
}


//==== Get a cookie ====
function getCookie(cookieName) {
	var name = cookieName + "=";
	//What does decodeURIComponent() do?
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookieArray = decodedCookie.split(";");
	
	for (var i = 0; i < cookieArray.length; ++i) {
		var cookie = cookieArray[i];
		//removes whitespace I think
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);	
		}
		//I need to look further into what this does
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);	
		}
	}
	
	//Return nothing if the cookie does not exist.
	return "";
}

//This might be useful someday though it didn't come into use this time.
function cookieExists(cookieName) {
	var cookie = getCookie(cookieName);
	if (cookie == "") {
		return false;	
	}else {
		return true;	
	}
}

//This checks to see if there are cookies with color values in them, and applies them if there are.
function checkColors() {
	var textColor = getCookie("textcolor");
	var bgColor = getCookie("bgcolor");
	
	//If both cookies exist...
	if (textColor != "" && bgColor != "") {
		//set the value of the color forms to the ones in the cookie
		var textColorForm = document.getElementById("textcolor");
		var bgColorForm = document.getElementById("bgcolor");
		textColorForm.value = textColor;
		bgColorForm.value = bgColor;
		
		//don't look at this
		document.getElementById("ska").style.borderColor = textColor + " " + bgColor + " " + textColor + " " + bgColor;
		
		//Find all of the colored text objects and change their text and background colors
		var text = document.getElementsByClassName("coloredtext");
		for (var i = 0; i < text.length; ++i) {
			text[i].style.color = textColor;
			text[i].style.backgroundColor = bgColor;
			text[i].style.display = "block";
			//hehe
			if (textColor == bgColor) {
				text[i].innerHTML = "WHAT THE H*CK???";	
			}
		}
		
	}
}

//This gets the color values from the form.
function getColors() {
	var textColorForm = document.getElementById("textcolor");
	var bgColorForm = document.getElementById("bgcolor");
	setCookie("textcolor", textColorForm.value, 7);
	setCookie("bgcolor", bgColorForm.value, 7);
	checkColors();
}