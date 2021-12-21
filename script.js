const createPlayer = (score, sign) => {
    return {score, sign};
}

//Board interface
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

    //AI button listener
    document.getElementById("artificial").addEventListener("click", ()=> {
        gameController.artificialSwitch();
        reset();
        gameController.reset();
    })
    
    //Event listener for squares - prevents selecting an occupied space.
    let theBoard = Array.from(board.children)
    theBoard.forEach((element,index) => {
        element.addEventListener('click', () => {
            if (element.innerText != "" || gameController.retrieveGameOver() === true) {
                return;
            }
            else
                element.innerText = gameController.player.sign;
                theBoard[index] = gameController.player.sign;
                gameController.gameWon(gameController.player, theBoard);
                gameController.takeTurn(gameController.player);
                if (gameController.retrieveArt() === true) {
                    artificialMove();
                }
        });
    });

    //AI "Artificial Idiot" move
    function artificialMove() {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let move = getRandomInt(0,8);
        let game = theBoard;
    
        function artificialTurn(array, index) {
            if (gameController.retrieveGameOver() === true) {
                return;
            }
            else if (array[index].innerText === "") {
                array[index].innerText = "O";
                theBoard[index] = "O"
                gameController.gameWon(gameController.player, theBoard);
                gameController.takeTurn(gameController.player);
            }
            else {
                artificialMove();
            }
        }
        artificialTurn(game, move)
    }

    //Updates Score
    function updateScore(one,two,draw) {
        document.getElementById("playerOne").innerText="X: " + one + " wins";
        document.getElementById("playerTwo").innerText="O: " + two + " wins";
        document.getElementById("draws").innerText="Draws: " + draw;
    }

    return {
        theBoard,
        reset,
        updateScore
    }
})();


const gameController = (() => {
    const playerOne = createPlayer(0, "X");
    const playerTwo = createPlayer(0, "O");
    let arti = false;
    let gameOver = false;
    let turn = 0;
    let draws = 0;
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
            display.innerText = "Game over: Draw!"
            draws += 1;
            console.log(draws)
            createBoard.updateScore(playerOne.score,playerTwo.score,draws);
            return gameOver = true;
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
        this.player = playerOne;
        display.innerText = "It is " + player.sign + "'s turn. Choose a square.";
        gameOver = false;
        turn = 0;
        arti - retrieveArt();
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
                currentPlayer.score += 1;
                createBoard.updateScore(playerOne.score,playerTwo.score,draws);
            }
        })   
    }

    //Exports updated Game Over status to other module.
    const retrieveGameOver = () => {
        return gameOver;
    };

    //Switches between artificial and human opponent
    function artificialSwitch() {
        if (arti === true) {
            document.getElementById("artificial").innerText = "Play vs. AI";
            arti=false;
        } 
        else {
            document.getElementById("artificial").innerText = "Play vs. Human";
            arti=true;
        }
    }

    //Exports updated status of AI/Human opponent
    function retrieveArt() {
        return arti;
    }
    
   return {
        player,
        gameWon,
        takeTurn,
        retrieveGameOver,
        reset,
        artificialSwitch,
        retrieveArt,
        playerOne,
        playerTwo,
        draws
   }
})();