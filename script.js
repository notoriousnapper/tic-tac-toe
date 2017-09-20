/*
 * 1. Prompt User for Setting Input
 * 2. Generate Board
 * 3. Start with your turn first
 */
// generateBoard(3);
var b = new Board();
b.initializeBoard(4, 0, document.getElementById("board"));
// b.npcGame();

/* Attaching Buttons */
var options = document.getElementsByClassName("options");
var modes = document.getElementsByClassName("modes");
for (var i = 0; i < options.length; i++){
  // Careful ^ 3 modes and 3 settings
  var value = options[i].value;
  var value2 = modes[i].value;
  console.log("Initial val is: " + value);

  options[i].addEventListener("click",
  (function(value, e){
    return function(e){
      // generateBoard(e.target.value);
      b.initializeBoard(value, 0, e.target.value);
      console.log("Value is " + e.target.value)
    }
  }) // Callback
  (value));

  modes[i].addEventListener("click",
  (function(value2){
    return function(){
      b.changeMode(value2);
    }
  }) // Callback
  (value2)
);
}
