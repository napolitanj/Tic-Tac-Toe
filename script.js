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
    theBoard.forEach((element) => {
        element.addEventListener('click', () => {
            console.log(gameController.player.sign)
            element.innerText = gameController.player.sign,
            gameController.gameWon(theBoard, element.innerText),
            gameController.takeTurn();
        });
    });
    
    
})();

const gameController = (() => {
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let gameOver = false;
    let turns = 9;
    this.player = playerOne;
    let display = document.getElementById("display");
    display.innerText = "It is " + player.sign + "'s turn. Choose a square";

    //Takes a players turn and switches player.
    this.takeTurn = function() {
        if (this.player === playerOne) {
            this.player = playerTwo
        }
        else if (this.player === playerTwo) {
            this.player = playerOne
        }
        display.innerText = "It is " + this.player.sign + "'s turn. Choose a square";
        console.log(player)
    }

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
    const gameWon = (array, sign)=> {
        for (i = 0; i < array.length; i++)
            if (array[i] = sign && winningCombo != "" && array[i] == winningCombo)
        console.log("win!");
    }


    //Game Over
   return {
       player,
       gameWon,
       takeTurn
   }

})();