class Board {
  constructor(){
    this.size = 0
    this.turn = 0 // Player 1
    this.mode = 0 // PVC
    this.matrix = []
    this.end = false;
    this.firstPlayer = 0; // Should have two
    this.secondPlayer = 1; // Should have two
    this.score = [
      {  // Human Player #1
         win: 0,
         loss:0
      },
      {  // Human Player #2
         win: 0,
         loss:0
      },
      {  // NPC #1
         win: 0,
         loss:0
      },
      {  // NPC #2
         win: 0,
         loss:0
      }
    ]
  }
  printScore(){
    for (var i = 0; i < this.score.length; i++){
      console.log(this.score[i]);
    }
  }
  clearBoard(){
    this.matrix = []
    this.end = false;
    document.getElementById("board").innerHTML = "";
  }

  changeMode(mode){
    this.mode = parseInt(mode);
    console.log("Changing to the following mode: " + mode);
    switch(mode){
      case "0":  // PvP
        this.firstPlayer = 0
        this.secondPlayer = 1
        break;
      case "1":  // P1vC
        this.firstPlayer = 0
        this.secondPlayer = 2
        break;
      case "2":  // CvC
        this.firstPlayer = 2
        this.secondPlayer = 3
        this.npcGame();
        break;
      default:
        console.log("What is going on" + mode);
    }
  }

  setVictory(turn){
    this.end = true;
    if (turn){
      this.score[this.firstPlayer] = this.score[this.firstPlayer].win + 1
      this.score[this.secondPlayer] = this.score[this.secondPlayer].loss + 1
    }
    else {
      this.score[this.firstPlayer] = this.score[this.firstPlayer].loss + 1
      this.score[this.secondPlayer] = this.score[this.secondPlayer].win + 1
    }
    this.printScore();
  }

  setMove(i, j){
    if (this.end) return; // End Game

    var validMove = true;
    var elem = this.matrix[i][j].elem, value = this.matrix[i][j].value;
    if (value == 0){ // Unassigned board gets assigned
      if (this.turn){
        elem.style.backgroundColor = "black";
        this.matrix[i][j].value = 1;
      }
      else {
        elem.style.backgroundColor = "red";
        this.matrix[i][j].value = 2;
      }
      if(this.checkVictory(i,j)){ // Victory Condition
        this.setVictory();
        var player1 = (turn) ? this.firstPlayer : this.secondPlayer;
        var player2 = (!turn) ? this.firstPlayer : this.secondPlayer;
        alert("Player #" + player1 + "won!");
        alert("Player #" + player2 + "lost!");
        return true;
      }
    } else {
      console.log("Invalid Move :(");
      return false; // To bypass turn assigning
    }

    this.turn = !this.turn;
    return validMove;
  }

  /* Fill Matrix */
  /* Fill Dom and attach events */
  initializeBoard(n, mode, frameDom){
    this.size = n
    this.matrix = []
    this.changeMode(mode);
    var boardDom =  document.getElementById("board");
    boardDom.style.width = boardDom.style.height = parseInt(n * 100) + "px";
    boardDom.innerHTML = ""; // Clear Current Board

    var cell, coordinates;
    var i = n, j= n, temp = [];

    var t = this;

    for (i = 0; i < n; i++){
      for (j = 0; j < n; j++){
        coordinates = { i: i, j: j };
        cell = document.createElement("div");  // HTML Appending Code
        cell.className = "cell";
        cell.addEventListener("click", (function(coordinates, elem){
          return function(){
            t.setMove(coordinates.i, coordinates.j);
          }
        })(coordinates));
        boardDom.append(cell); // Add Cell To Board
        temp.push({elem: cell, value: 0});
      }
        this.matrix.push(temp);
        temp = [];
    }
    console.log("Generated Board: " + n);
  }


  randomMove(){
    if (this.end) return; // End Victory

    var i, j, value;
    do {
        i = Math.floor(Math.random() * 30) % this.size;
        j = Math.floor(Math.random() * 30) % this.size;
        value = this.matrix[i][j].value;
        console.log(i,j);

        if (value == 0){
          this.setMove(i,j);
          break;
        }
    }
    while (true);
    return [i, j];
  }

  leftDiagonalTraversal(val){
    var i = 0, j = 0, tally = 0;
    for ( ; i < this.size; i+=1, j+=1){
      if (this.matrix[i][j].value == val) tally++;
    }
    // alert("What is the value" + val + "this size:" + this.size + "tally: " + tally);
    return tally == this.size;
  }
  /* Right Left Traversal */
  rightDiagonalTraversal(val){
    var i = this.size - 1, j = 0, tally = 0;
    for (; i >= 0; i-=1, j+=1){
      if (this.matrix[i][j].value == val) tally++;
    }
    return tally == this.size;
  }

  /* Is on the Right Diagonal */
  isRightDiagonal(x, y){
    var i = this.size - 1, j = 0, tally = 0;
    for (; i >= 0; i-=1, j+=1){
      if ((x == i) && (y == j)) return true;
    }
    return false;
  }

  checkVictory(i, j){
    var bool = true, val = this.matrix[i][j].value; // The Current Value
    var n = this.size;
    var horizonTally = 0, verticalTally = 0;

    // Horizontal And Vertical Check
    for (var c = 0; c  < n; c++){
      if (this.matrix[c][j].value == val) horizonTally++;
      if (this.matrix[i][c].value == val) verticalTally++;
    }
    if (horizonTally == n || verticalTally == n){
      alert("Victory!");
      return true;
    }

    // If its odd, and in the middle, do a double check
    // Corner Check (if its a corner element)
    if ((i == j) && ( i == Math.floor(n/2))){
      if (this.leftDiagonalTraversal(val)){
        alert("Left Diagonal Victory!");
        return true;
      } else if (this.rightDiagonalTraversal(val)){
        alert("Right to Left Diagonal Victory!");
        return true;
      }
    }
    if (i == j){ // Left Side
      if (this.leftDiagonalTraversal(val)){
        alert("HERE");
        alert("Left to Right Diagonal Victory!");
        return true;
      }
    }

    else if (this.isRightDiagonal(i,j)) {
        // alert("isRight and Left to Right Diagonal Victory!");
      if (this.rightDiagonalTraversal(val)){
        alert("isRight and Left to Right Diagonal Victory!");
        return true;
      }
    }
    return false;
  }

  npcGame(){
    while (!this.end) {
      this.randomMove();
    }
  }
}
