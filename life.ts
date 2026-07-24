const populated = "██";
const unpopulated = "░░";

const defaultCells = [
	[0, 1, 0],
	[0, 0, 1],
	[1, 1, 1],
];

function initalState(gameSize: number = 50, initalCells: number[][] = defaultCells) {
	let gameArea = Array.from({ length: gameSize }, () => Array(gameSize).fill(0));

	const patternHeight = initalCells.length;
	const patternWidth = initalCells[0].length;
	const rowOffset = Math.floor((gameSize - patternHeight) / 2);
	const colOffset = Math.floor((gameSize - patternWidth) / 2);

	for (let r = 0; r < patternHeight; r++) {
		for (let c = 0; c < patternWidth; c++) {
			gameArea[rowOffset + r][colOffset + c] = initalCells[r][c];
		}
	}

	return gameArea;
}

function simulate(initalState: number[][], gameDuration: number = 50) {
	const states = [];
	states.push(initalState);

	return states;
}

function display(states: number[][][]) {
	states.forEach((state) => {
		for (let i = 0; i < state.length; i++) {
			let row = "";
			for (let j = 0; j < state[i].length; j++) {
				if (state[i][j] === 1) {
					row += populated;
				} else {
					row += unpopulated;
				}
			}
			console.log(row);
		}
	});
}

const start = initalState();
const states = simulate(start, 0);
display(states);
