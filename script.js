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
    gameBoard.forEach(() => {
        const square = document.createElement("div");
        square.className = "square";
        board.appendChild(square);
    });

    //Reset button
    const squares = document.querySelectorAll(".square")
    document.getElementById("restart").addEventListener("click", ()=> {
        squares.forEach(item => {
            item.innerText = "";
            gameBoard[i] = "";
        })
    });
    
    //Event listener for squares.
    let theBoard = Array.from(board.children)
    theBoard.forEach((element, i) => {
        element.addEventListener('click', () => {
            element.innerText = gameController.player.sign;
            console.log(theBoard[i])
        });
    });

    
    
})();

const gameController = (() => {
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let gameOver = false;
    let turns = 9;
    let player = playerOne;
    console.log(playerOne);

    //Continuously updating display
    let display = document.getElementById("display");
    display.innerText = "It is " + player.sign + "'s turn. Choose a square";
     
    //Winning Combos
    let winningCombo = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7],
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ];

    //Determine if the array matches a winning combo
    

    //Game Over
   return {
       player,
       winningCombo
   }

})();