let WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

let cells = document.querySelectorAll('.cell');
let turnDisplay = document.getElementById('turn-display');
let winnerDisplay = document.getElementById('winner-display');
let scoreDisplay = document.getElementById('score-display');
let replayBtn = document.getElementById('replay-btn');

let playerScore = 0;
let computerScore = 0;
let draws = 0;

let board = Array(9).fill(null);
let playerSymbol = null;
let computerSymbol = null;
let currentTurn = null; // 'player' or 'computer'
let gameOver = false;

let darkToggle = document.getElementById("dark-mode-toggle");
let delayToggle = document.getElementById("delay-toggle");

function startNewGame() {
    board = Array(9).fill(null);
    gameOver = false;

    playerSymbol = Math.random() < 0.5 ? 'X' : 'O';
    computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    currentTurn = Math.random() < 0.5 ? 'player' : 'computer';

    renderBoard();
    winnerDisplay.textContent = "";
    replayBtn.classList.add('hidden');
    updateTurnDisplay();

    if (currentTurn === "computer") {
        if (delayToggle.checked) {
            turnDisplay.textContent = "Computer is thinking...";
            setTimeout(computerMove, 1500); // 2.5 seconds
        } else {
            computerMove();
        }
    }
}

function renderBoard() {
    cells.forEach((cell, i) => {
        cell.textContent = board[i] ?? '';
        cell.disabled = board[i] !== null || gameOver;
    });
}

function updateTurnDisplay() {
    if (gameOver) return;
    let whoseTurn = currentTurn === 'player' ? 'Your' : "Computer's";
    let symbol = currentTurn === 'player' ? playerSymbol : computerSymbol;
    turnDisplay.textContent = `${whoseTurn} turn (${symbol}) - You are ${playerSymbol}`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore} | Draws: ${draws}`;
}


function checkResult(currentBoard) {
    for (let [a, b, c] of WIN_LINES) {
        if (currentBoard[a] && currentBoard[a] == currentBoard[b] && currentBoard[b] == currentBoard[c]) {
            return currentBoard[a];
        }
    }
    if (currentBoard.every(cell => cell != null)) return 'draw'
    return null;
}

function playerMove(e) {
    let index = Number(e.target.dataset.index);

    if (gameOver || currentTurn != 'player' || board[index] != null) return;
    board[index] = playerSymbol;
    renderBoard();

    let result = checkResult(board);
    if (result) {
        endGame(result);
        return;
    }

    currentTurn = 'computer';
    updateTurnDisplay();
    if (delayToggle.checked) {
        turnDisplay.textContent = "Computer is thinking...";
        setTimeout(computerMove, 1500); // 2.5 seconds
    } else {
        computerMove();
    }
}

function computerMove() {
    let bestIndex = getBestMove(board);
    board[bestIndex] = computerSymbol;
    renderBoard();

    let result = checkResult(board);
    if (result) {
        endGame(result);
        return;
    }

    currentTurn = 'player';
    updateTurnDisplay();
}

function getBestMove(currentBoard) {
    let bestScore = -Infinity;
    let bestIndex = -1;

    for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
            currentBoard[i] = computerSymbol;
            let score = minimax(currentBoard, 0, -Infinity, Infinity, false);
            currentBoard[i] = null;

            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }
    }
    return bestIndex;
}

function minimax(currentBoard, depth, alpha, beta, isMaximizing) {
    let result = checkResult(currentBoard);
    if (result !== null) {
        if (result === computerSymbol) return 10 - depth;
        if (result === playerSymbol) return depth - 10;
        return 0;
    }

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = computerSymbol;
                let score = minimax(currentBoard, depth + 1, alpha, beta, false);
                currentBoard[i] = null;
                best = Math.max(best, score);
                alpha = Math.max(alpha, score)
                if (beta <= alpha) break; // prune
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = playerSymbol;
                let score = minimax(currentBoard, depth + 1, alpha, beta, true);
                currentBoard[i] = null;
                best = Math.min(best, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) break; // prune
            }
        }
        return best;
    }
}

function endGame(result) {
    gameOver = true;
    renderBoard();

    if (result === 'draw') {
        winnerDisplay.textContent = "It's a draw!";
        draws++;
    } else if (result === playerSymbol) {
        winnerDisplay.textContent = "You Win!, Nissi Lost";
        playerScore++;
    } else {
        winnerDisplay.innerHTML = "Take that in your Face !! <br> Computer WINS";
        computerScore++;
    }

    turnDisplay.textContent = '';
    updateScoreDisplay();
    replayBtn.classList.remove('hidden');
}

cells.forEach(cell => cell.addEventListener('click', playerMove));
replayBtn.addEventListener('click', startNewGame);

if (darkToggle.checked) {
    document.body.classList.add("dark");
}

darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
});

updateScoreDisplay();
startNewGame();
