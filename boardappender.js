import * as Chessboard from './libs/chessboardjs/js/chessboard-1.0.0.js';

let board = Chessboard('board1', 'start')

function appendBoard() {
    let boards = document.getElementById("boards");
    let oneBoard = document.createElement("div");
    oneBoard.setAttribute('id', 'board1');
    oneBoard.setAttribute('style', 'width:400px');
    
    // let testText = document.createTextNode('Tesst');
    oneBoard.appendChild(board);
    boards.appendChild(oneBoard);
}

appendBoard();