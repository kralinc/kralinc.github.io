generateColors();

function generateColors() {
	//You were right this is a good way to do it
	let colors = ["00", "33", "66", "99", "cc", "ff"];
	
	//Colors are arranged in 3 groups of 2, red, green, and blue
	//The color black is 00 00 00
	//each loop is one of these groups
	
	let i=0; //counts the number of colors
	for (let red=0; red < colors.length; ++red) 
	{
		for (let green=0; green < colors.length; ++green) 
		{
			for (let blue=0; blue < colors.length; ++blue) 
			{
				let color = "#" + colors[red] + colors[green] + colors[blue];
				let textColor;
				
				//This tests to see if the color is darker than it is light
				//I add up the 3 color values and see if their value is
				//less than (255 * 3) / 2, which is half brightness
				if (hexToInt(colors[red]) 
					+ hexToInt(colors[green]) 
					+ hexToInt(colors[blue]) < 383) {
					textColor = "#ffffff";
				}else {
					textColor = "#000000";	
				}
				//Prints one of the colored blocks.
				let template = "<p class='color-text' style='background-color: " 
				+ color + ";color: " 
				+ textColor + ";'>" 
				+ color + "</p>";
				document.write(template);
				++i;
			}
		}
	}
	//Opening the console will prove that there are 216 colors.
	console.log(i);
}

//Turns a hexadecimal number into an integer for math and comparison purposes
function hexToInt(num) {
	return parseInt(num, 16);
}

//This lab took me like 20 minutes total that is a new record for me in this class I think