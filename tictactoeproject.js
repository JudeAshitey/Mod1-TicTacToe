
let board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
let gameOver = false;

const click = new Audio('sounds_click.wav');
const gameOverSound = new Audio('sounds_game_over.wav');


window.onload = function () {
  boardGame();
} // This loads the functions after the HTML and CSS have been loaded by the page

function boardGame() {
    let sub_board = new Array(3)
      sub_board.fill(' ')
      
    let sub_board1 = new Array(3)
       sub_board1.fill(' ')

    let sub_board2= new Array(3)
      sub_board2.fill(' ')

    board =[  
              sub_board,  
              sub_board1,
              sub_board2,
           ]
           //This represents the game board in an array form

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      //<div id="0-0"><div> This function creates a div for every row and column and assigns it an id starting wih [0-0]
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line"); //This adds css to the row
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");//This adds css to the column
      }
      tile.addEventListener("click", setTile);
      
      document.getElementById("table").append(tile); //This inserts the tile div under the board div 
    }
  }
}

function setTile() {
    if (gameOver){
        return;
    }
    let coords = this.id.split("-") //"1-1" ----> ["1","1"] this splits the id from setGame
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
 
    if (board[r][c] != ' '){
        return;
    } //Checks to see if the board is empty
 
    board[r][c] = currPlayer; //This updates the board array
    this.innerText = currPlayer;//This updates the HTML
 
 
    if (currPlayer == playerO) {
     currPlayer = playerX;
    }
    else {
       currPlayer = playerO;
    }
    checkWinner();
    click.play();
 }


 function checkWinner() {// Checks if there is a winner and assigns a CSS style to indicate so
    //horizontally

    for (let r = 0; r < 3; r++) {
       if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' '){
          for (let i = 0; i < 3 ; i++){
            let tile = document.getElementById(r.toString()+ '-' + i.toString());
             tile.classList.add('winner');
          }
          gameOver = true;
          gameOverSound.play();
          return;
          
        }
        
    } 

  //vertically
  for (let c = 0; c < 3; c++) {
    if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' '){
          for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + '-' + c.toString());
            tile.classList.add('winner');  
          }
          gameOver = true;
          gameOverSound.play();
          return;
        }

  }

  // diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){

       for (let i = 0; i < 3 ; i++){
        let tile = document.getElementById(i.toString() + '-' + i.toString());
        tile.classList.add('winner');
       }
       gameOver = true;
       gameOverSound.play();
       return;
    }

    // anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
  
      let tile = document.getElementById('0-2'); 
      tile.classList.add('winner');
      
      tile = document.getElementById('1-1');
      tile.classList.add('winner');

      tile = document.getElementById('2-0');
      tile.classList.add('winner');
      

      gameOver = true;
      gameOverSound.play();
      return;
    }
  }