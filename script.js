const MALDICION_CLASS = "maldicion";
const ANTITODO_CLASS = "antitodo";
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(MALDICION_CLASS);
		cell.classList.remove(ANTITODO_CLASS);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove("show");
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? ANTITODO_CLASS : MALDICION_CLASS;
	//PlaceMark
	placeMark(cell, currentClass);
	//Check for win and draw
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		//Switch turns
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "¡Empate!";
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "¡Maldición" : "¡Antitodo "} gana!`;
	}
	winningMessageElement.classList.add("show");
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return cell.classList.contains(MALDICION_CLASS) || cell.classList.contains(ANTITODO_CLASS);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(MALDICION_CLASS);
	board.classList.remove(ANTITODO_CLASS);
	if (circleTurn) {
		board.classList.add(ANTITODO_CLASS);
	} else {
		board.classList.add(MALDICION_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
