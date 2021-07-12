//First JQuery program. Doesn't do much


$(document).ready(function(){
    //When the button is clicked
  $("#clickme").click(function(){
      //Toggle sliding the message in-out
    $("#message").slideToggle("slow");
  });
});