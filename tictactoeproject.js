
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
//This also saves the users choices

    const reset = document.getElementById("restart");

   

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      //<div id="0-0"><div> This function creates a div for every row and column and assigns it an id starting wih [0-0]
      let tile = document.createElement("div");
      tile.id = row.toString() + "-" + column.toString();
      tile.classList.add("tile");
      if (row == 0 || row == 1) {
        tile.classList.add("horizontal"); //This adds css to the row
      }
      if (column == 0 || column == 1) {
        tile.classList.add("vertical");//This adds css to the column
      }
      tile.addEventListener("click", setTile);
      
      document.getElementById("table").append(tile); //This inserts the tile div under the table div 
      reset.addEventListener("click", reStart);  
    }
  }
  
}

function setTile() { //This function lets either X and or O be used in the game
    if (gameOver){
        return;
    }
    let cods = this.id.split("-") //"1-1" ----> ["1","1"] this splits the id from setGame
    let row = parseInt(cods[0]);
    let column = parseInt(cods[1]);
 
    if (board[row][column] != ' '){
        return;
    } //Checks to see if the board is empty
 
    board[row][column] = currPlayer; //This updates the board array
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

    for (let row = 0; row < 3; row++) {
       if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != ' '){
          for (let i = 0; i < 3 ; i++){
            let tile = document.getElementById(row.toString()+ '-' + i.toString());
             tile.classList.add('winner');
          }
          gameOver = true;
          gameOverSound.play();
          return;
          
        }
        
    } 

  //vertically
  for (let column = 0; column < 3; column++) {
    if (board[0][column] == board[1][column] && board[1][column] == board[2][column] && board[0][column] != ' '){
          for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + '-' + column.toString());
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
  };

 



function reStart (){

     
   window.location.reload(true);


}
