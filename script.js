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

    //Reset
    function reset() {
        gameBoard[i] = "";
        theBoard[i] = "";    
    }

    //Reset button listener
    const squares = document.querySelectorAll(".square")
    document.getElementById("restart").addEventListener("click", ()=> {
        squares.forEach(item => {
                item.innerText = "";
                reset();
                gameController.reset();
        })
    });
    
    //Event listener for squares - prevents selecting an occupied space.
    let theBoard = Array.from(board.children)
    theBoard.forEach((element,index) => {
        element.addEventListener('click', () => {
            if (element.innerText != "" || gameController.gameOver === true) {
                console.log("Game Over")
                return;
            }
            else
                element.innerText = gameController.player.sign;
                theBoard[index] = gameController.player.sign;
                console.log(theBoard[index])
                gameController.gameWon(gameController.player);
                console.log(gameController.gameOver)
                gameController.takeTurn(gameController.player);
        });
    });

    return {
        theBoard
    }
    
})();

const gameController = (() => {
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let gameOver = false;
    let turn = 0;
    let player = playerOne;
    let display = document.getElementById("display");
    display.innerText = "It is " + player.sign + "'s turn. Choose a square.";


    //Takes a players turn and switches player.
    takeTurn = function(currentPlayer) {
        turn++;
        console.log(turn)
        if (gameOver === true) {
            return this.gameOver = true;
        }
        else if (turn === 9) {
            console.log("draw")
            display.innerText = "Game over: Draw!"
            return this.gameOver = true;
        }
        else if (currentPlayer === playerOne) {
            this.player = playerTwo;
            display.innerText = "It is " + this.player.sign + "'s turn. Choose a square.";
        }
        else if (currentPlayer === playerTwo) {
            this.player = playerOne;
            display.innerText = "It is " + this.player.sign + "'s turn. Choose a square.";
        }
    }

    //Reset
    function reset() {
        player = playerOne;
        display.innerText = "It is " + player.sign + "'s turn. Choose a square";
        gameOver = false;
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
    function gameWon(currentPlayer) {
        console.log(this.player.sign)
        winningCombo.forEach(function(element) {  
            if (createBoard.theBoard[element[0] -1] === currentPlayer.sign && createBoard.theBoard[element[1] -1] === currentPlayer.sign && createBoard.theBoard[element[2] -1 ] === currentPlayer.sign) {
                gameOver = true;
                display.innerText = "Game over! " + currentPlayer.sign + " has won!";
                console.log("win");
                console.log(turns)
            }
        })   
    }

    //Game Over
   return {
        player,
        gameWon,
        takeTurn,
        gameOver,
        reset
   }

})();