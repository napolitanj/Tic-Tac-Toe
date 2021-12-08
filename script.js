const createPlayer = (playerName, sign) => {
    return {playerName, sign};
}

const createBoard = (() => {
    
    //Create board array
    let gameBoard = [];
    for(i = 0; i < 9; i++) 
        gameBoard.push("");
    
    //Create board graphic
    const board = document.getElementById("board");
    console.log(gameBoard);
    gameBoard.forEach((element) => {
        console.log(element);
        const square = document.createElement("div");
        square.className = "square";
        board.appendChild(square);
    });

    //Event listener for squares.
    const squares = document.querySelectorAll(".square")
    squares.forEach(item => {
        item.addEventListener('click', () => {
            item.innerText = "X";
        });
    });

    //Reset button
    document.getElementById("restart").addEventListener("click", ()=> {
        squares.forEach(item => {
            item.innerText = "";
            gameBoard[i] = "";
        })
    });

})();

const gameController = (() => {
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let gameOver = false;
    let turns = 9;
    let turn = playerOne;
    console.log(playerTwo);

    //Continuously updating display
    let display = document.getElementById("display");
    display.innerText = "It is " + turn.sign + "'s turn. Choose a square";
     
    //Winning combos
    

    //Game Over
   

})();