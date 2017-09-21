/*
 * 1. Prompt User for Setting Input
 * 2. Generate Board
 * 3. Start with your turn first
 */
// generateBoard(3);
var b = new Board();
b.initializeBoard(document.getElementById("board"));
// b.npcGame();

/* Attaching Buttons */
// Attaching Start Button
document.getElementById("start").addEventListener("click",
  function(e){
    b.initializeBoard(document.getElementById("board"));
    b.startGame();
    console.log("Starting Game!");
});

// Attaching Setting Submit Button
document.getElementById("setting-submit").addEventListener("click",
  function(e){
    b.initializeBoard(document.getElementById("board"));
    console.log("Settings Set!");
});

// Clearing Board
document.getElementById("clear").addEventListener("click",
  function(e){
    b.clearBoard();
    console.log("Clearing Board");
});


var options = document.getElementsByClassName("options");
var modes = document.getElementsByClassName("modes");
for (var i = 0; i < options.length; i++){
  // Careful ^ 3 modes and 3 settings
  var value = i + 3;
  var value2 = i;
  console.log("Initial val is: " + value);


  options[i].addEventListener("click",
  (function(value, e){
    return function(e){
      // b.initializeBoard(value,  e.target.value);
      b.changeSize(value);
      for (var i = 0; i < options.length; i++)
        options[i].className = "options";
      e.target.className += " selected";
    }
  }) // Callback
  (value));

  modes[i].addEventListener("click",
  (function(value2, e){
    return function(e){
      b.changeMode(value2);
      for (var i = 0; i < options.length; i++)
        modes[i].className = "modes";
      e.target.className += " selected";
    }
  }) // Callback
  (value2)
);
}

b.printScore();
// Attach Setting Submit Button
// Attach StartGame Button
