const gameBoard = (() => {

    const createGrid = (() => {
        const grid = [];
        const board = document.getElementById("board");
        board.className="board";

        for (let i = 0; i < 3; i++) {
            let row = document.createElement("div");
            row.className="row";
            grid.push("");

            for (let x = 0; x < 3; x++) {
                let square = document.createElement("div");
                square.className="square";
                row.appendChild(square);
                console.log(x);
                grid.push("");
            }  
            board.appendChild(row);
            console.log(grid); 
        }
    })();
})();
