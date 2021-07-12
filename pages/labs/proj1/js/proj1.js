//SLIDESHOW
//This: proj1.js
//Author: Liam Andrade
//Date: 21-Oct-2020
//Purpose: To create a slideshow presentation of a fixed array of images

//The path to the images
const IMGPATH = "img/";

//Array with all of the images in the slideshow
//All images used are in the public domain
const IMAGES = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

//DOM element reference to the slideshow image
const SLIDESHOW = document.querySelector("#slideshow");

//Keeps track of which image the slideshow is on
let slideshowCounter = -1;

//Automatic slideshow
function slideshow() 
{
	slideshowCounter++;
	
	//Modulus clamps the slideshowCounter value within the length of the array
	//Set the slideshow image to the next image
	SLIDESHOW.src = IMGPATH + IMAGES[slideshowCounter % IMAGES.length];
}

//Buttonpress slideshow. Increments by 1 in either direction, though increment can be theoretically anything
//So much extra credit I am amazing
function slideshowIncrement(increment) 
{
	slideshowCounter += increment;
	
	//Prevent from going below zero
	if (slideshowCounter < 0) 
	{
		slideshowCounter = IMAGES.length - 1;
	}
	
	//Set the slideshow image to the image pointed to by the increment
	SLIDESHOW.src = IMGPATH + IMAGES[slideshowCounter % IMAGES.length];
	
	//Reset the slideshow timer
	clearInterval(slideshowInterval);
	slideshowInterval = setInterval(slideshow, 1500);
}

//Start on the 1st image
slideshow();
//Set the slideshow timer
let slideshowInterval = setInterval(slideshow, 1500);
