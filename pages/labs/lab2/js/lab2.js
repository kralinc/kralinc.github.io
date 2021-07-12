let MAX_ITEMS = 5; //My code is flexible :)

let nextItemIndex = 0; //The index of the item to be saved over

//This function saves the specified item in the list.
function save(item) 
{
    //combines the index with the word "item" to get the id of the item to be edited.
    let itemToEdit;
    itemToEdit = "item" + nextItemIndex;

    //Get the contents of the input box, then put those contents in the item to be edited
    let itemValue = document.getElementById("itemInput").value;
    document.getElementById(itemToEdit).innerHTML = itemValue;

    //Put the item into local storage with the same id as the item to be edited
    localStorage.setItem(itemToEdit, itemValue);

    //Iterate the index of the next item to be edited
    //Modulus clamps the max value of the index so as to not attempt to reference indices that do not exist.
    nextItemIndex = (nextItemIndex + 1) % MAX_ITEMS;

    //Change the text above and inside the input box
    document.getElementById("inputLabel").innerHTML = "Write item #" + (nextItemIndex + 1); //nextItemIndex + 1, because indices start at 0 but the list starts at 1
	document.getElementById("itemInput").value = "";
}

//This sets the index of the list item that will be saved over next.
function setNextItemIndex(index) 
{
    document.getElementById("inputLabel").innerHTML = "Edit item #" + (index + 1);
    nextItemIndex = index;
}

function load() 
{
    //I don't think we've learned for loops let. Please be nice if we have
    let i=0;
    while (i < MAX_ITEMS) 
    {
        //If the item it wants to load exists, load it. Otherwise set the space empty.
        if (localStorage.getItem("item" + i) != null)
        {
            document.getElementById("item" + i).innerHTML = localStorage.getItem("item" + i);
        }else 
        {
            document.getElementById("item" + i).innerHTML = "";
        }
        //I N C R E M E N T
        ++i;
    }
}

//This was going to be called clear(), but I guess that function is reserved.
function erase() 
{
    //Same deal as above, I don't think we've learned for loops yet (which is a WAY better way of doing this)
    let i=0;
    while (i < MAX_ITEMS) 
    {
        //Remove every item in local storage. If the item doesn't exist it doesn't break because nothing happens.
        localStorage.removeItem("item" + i);
        document.getElementById("item" + i).innerHTML = "";
        ++i;
    }
}
