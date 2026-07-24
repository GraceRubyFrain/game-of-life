const populated = "██";
const unpopulated = "░░";

const defaultCells = [
	[0, 1, 0],
	[0, 0, 1],
	[1, 1, 1],
];

function initalState(gameSize: number = 50, initalCells: number[][] = defaultCells): number[][] {
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

function countNeighbors(cells: number[][]): number {
	let count = 0;

	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length; j++) {
			if (i === 1 && j === 1) continue;
			if (cells[i][j] === 1) count++;
		}
	}

	return count;
}

function simulate(initalState: number[][], gameDuration: number = 50): number[][][] {
	function itterate(state: number[][]): number[][] {
		const newState: number[][] = Array.from({ length: state.length }, () => Array(state.length).fill(0));

		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state[i].length; j++) {
				//calculate the neighbors
				const slices = state.slice(i - 1, i + 1);
				const cells: number[][] = [];
				slices.forEach((row) => cells.push(row.slice(j - 1, j + 1)));
				const neighbors = countNeighbors(cells);

				//calculate the cells fate
				if ((state[i][j] === 0 && neighbors === 3) || (state[i][j] === 1 && (neighbors === 2 || neighbors === 3))) {
					newState[i][j] = 1;
				} else {
					newState[i][j] = 0;
				}
			}
		}

		return newState;
	}

	const states = [initalState];

	for (let i = 1; i < gameDuration; i++) {
		const state = itterate(states[i - 1]);
		states.push(state);
	}

	return states;
}

function display(states: number[][][]): void {
	states.forEach((state, count) => {
		console.log("State[" + count.toString() + "]");
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
const states = simulate(start, 2);
display(states);
