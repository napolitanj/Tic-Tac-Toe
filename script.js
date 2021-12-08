const createPlayer = (playerName, sign) => {
    return {playerName, sign};
}

const playerOne = createPlayer("Joe", "X");
console.log(playerOne);

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

})();