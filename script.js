/* n can be 3, 4, or 5 */
/* mode can be 0, 1, or 2 */
/* Player has their own certain value (create players!) */
var mode = 0; // can be 0 pvp, 1 pvc, or 2 cvc
var turn = true; // 0 is p1, 1 is p2
var board = [];
var nElements = 0;
var players = [
  {
    type: 0 ,
    value: 1,
  },
  {
    type: 1 ,
    value: 2,
  }
]

/* Left Right Traversal */
function leftDiagonalTraversal(val){
  var i = 0, j = 0, tally = 0;
  while (i < nElements){ // Left to Right Traversal
    if (board[i][j].value == val){
      tally++;
    }
    i+=1;
    j+=1;
  }
  return tally == nElements;
}
/* Right Left Traversal */
function rightDiagonalTraversal(val){
  var i = nElements - 1, j = 0, tally = 0;
  while (i >= 0){ // Left to Right Traversal
    if (board[i][j].value == val){
      tally++;
    }
    console.log("i,j: " + i  + j);
    i-=1;
    j+=1;
  }
  return tally == nElements;
}
/* Is on the Right Diagonal */
function isRightDiagonal(x, y){
  var i = nElements - 1, j = 0, tally = 0;
  while (i >= 0){ // Left to Right Traversal
    if ((x == i) && (y == j)) return true;
    i-=1;
    j+=1;
  }
  return false;
}

function randomMove(player){
  var i, j, value;
  do{
    i = Math.floor(Math.random() * 30) % 3;
    j = Math.floor(Math.random() * 30) % 3;
    value = board[i][j].value;
    console.log(i,j);
    // if (setMove(i,j)) break;
    if (value == 0){
      setMove(i,j);
      break;
    }
  }
  while (true);
  return [i, j]
  // turn = !turn;
}

function printBoard(){
  console.log(board);
}
// function clearBoard(){
//   board = [];
//
// }
function checkVictory(i,j, player){
  var bool = true;
  var val = board[i][j].value; // The Current Value
  console.log("val is: " + val);
  var n = nElements;
  var tally = 0;
  // Row Check
  for (var c = 0; c  < n; c++){
    console.log("Comparing Current" + board[c][j].value + " hrm" + val);
    if (board[c][j].value == val){
      tally++;
    }
    else {
      break;
    }
  }
  if (tally == n){
    alert("Victory!");
    return true;
  }

  // Column Check
  tally = 0; // Reset
  for (var c = 0; c  < n; c++){
    if (board[i][c].value == val){
      tally++;
    }
    else {
      break;
    }
  }
  if (tally == n){
    alert("Victory!");
    return true;
  }
  // If its odd, and in the middle, do a double check
  // Corner Check (if its a corner element)
  if ((i == j) && ( i == Math.floor(n/2))){
    if (leftDiagonalTraversal(val)){
      alert("Left Diagonal Victory!");
      return true;
    } else if (rightDiagonalTraversal(val)){
      alert("Right to Left Diagonal Victory!");
      return true;
    }
  }
  if (i == j){ // Left Side
    if (leftDiagonalTraversal(val)){
      alert("Left to Right Diagonal Victory!");
      return true;
    }
  }

  else if (isRightDiagonal(i,j)) {
    if (rightDiagonalTraversal(val)){
      alert("Left to Right Diagonal Victory!");
      return true;
    }
  }
  return false;
}

// Checks if valid move
// Fills in Square
// Determines if victory or not
function setMove(i, j){
  var bool = true; // All moves are valid until proven false
  // var elem = e.target;
  var elem = board[i][j].elem;
  var value = board[i][j].value;

  if (value == 0){
    if (turn){
      elem.style.backgroundColor = "black";
      board[i][j].value = 1;
    }
    else {
      elem.style.backgroundColor = "red";
      board[i][j].value = 2;
    }
  } else {
    console.log("Invalid Move :(");
    bool = false;
  }
  if(checkVictory(i,j)){
    return true;
  }
  turn = !turn;

  if (!turn){
    randomMove(1);
  }
  // Robot move
  return bool;
}

function computerPlayoff(){
  while(true){
    var coordinates = randomMove();
    if (checkVictory(coordinates[0],coordinates[1])){
      break;
    }
  }
}

function generateBoard(n, mode){
  var boardDom =  document.getElementById("board");
  boardDom.style.width = boardDom.style.height = parseInt(n * 100) + "px";
  var cell;
  var i = j = n;
  /* Need to fix this */
  /* Clear the board*/
  boardDom.innerHTML = ""; // Clear Current Board
  board = [];
  nElements = n;
  var coordinates;
  var temp = [];

  for (i = 0; i < n; i++){
    for (j = 0; j < n; j++){
      // HTML Appending Code
      cell = document.createElement("div");
      cell.className = "cell";
      coordinates = { i: i, j: j };
      cell.addEventListener("click",
      (function(coordinates, elem){
        return function(){
          setMove(coordinates.i, coordinates.j);
        }
      })(coordinates));
      boardDom.append(cell); // Add Cell To Board
      temp.push({elem: cell, value: 0});
    }
      board.push(temp);
      temp = [];
  }
  console.log("Generated Board: " + n);
}






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
