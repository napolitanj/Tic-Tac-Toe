const createPlayer = (playerName, sign) => {
    return {playerName, sign};
}

const createBoard = (() => {
    const board = document.getElementById("board");
    let gameBoard = [];

    //Create board array and generate graphic
    for(i = 0; i < 9; i++) 
        gameBoard.push("");
    gameBoard.forEach(() => {
        const square = document.createElement("div");
        square.className = "square";
        board.appendChild(square);
    });

    //Reset
    function reset() {
        const squares = document.querySelectorAll(".square")
        theBoard = Array.from(board.children);
        squares.forEach((item) => {
            item.innerText = "";
        });  
    }

    //Reset button listener
    document.getElementById("restart").addEventListener("click", ()=> {
        reset();
        gameController.reset();
    })
    
    //Event listener for squares - prevents selecting an occupied space.
    let theBoard = Array.from(board.children)
    theBoard.forEach((element,index) => {
        element.addEventListener('click', () => {
            console.log(gameController.retrieveGameOver)
            if (element.innerText != "" || gameController.retrieveGameOver() === true) {
                return;
            }
            else
                element.innerText = gameController.player.sign;
                theBoard[index] = gameController.player.sign;
                gameController.gameWon(gameController.player, theBoard);
                gameController.takeTurn(gameController.player);
        });
    });

    return {
        theBoard,
        reset
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
        if (gameOver === true) {
            return gameOver = true;
        }
        else if (turn === 9) {
            console.log("draw")
            display.innerText = "Game over: Draw!"
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
        console.log("ran")
        this.player = playerOne;
        display.innerText = "It is " + player.sign + "'s turn. Choose a square.";
        gameOver = false;
        turn = 0; 
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
    function gameWon(currentPlayer, gameBoard) {
        winningCombo.forEach(function(element) {  
            if (gameBoard[element[0] -1] === currentPlayer.sign && gameBoard[element[1] -1] === currentPlayer.sign && gameBoard[element[2] -1 ] === currentPlayer.sign) {
                gameOver = true;
                display.innerText = "Game over! " + currentPlayer.sign + " has won!";
                console.log(gameOver)
            }
        })   
    }

    //Exports updated Game Over status to other module.
    const retrieveGameOver = () => {
        return gameOver;
    };
    
   return {
        player,
        gameWon,
        takeTurn,
        retrieveGameOver,
        reset
   }

})();