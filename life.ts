const populated = "██";
const unpopulated = "░░";

const defaultCells = [
	[0, 1, 0],
	[0, 0, 1],
	[1, 1, 1],
];

const bomb = [
	[0, 1, 0],
	[1, 1, 1],
	[1, 1, 1],
];

function initalState(initalCells: number[][] = defaultCells, gameSize: number = 50): number[][] {
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

function simulate(initalState: number[][], gameDuration: number = 50): number[][][] {
	function itterate(state: number[][]): number[][] {
		const newState: number[][] = Array.from({ length: state.length }, () => Array(state.length).fill(0));

		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state[i].length; j++) {
				//calculate the neighbors
				let neighbors = 0;
				for (let di = -1; di <= 1; di++) {
					for (let dj = -1; dj <= 1; dj++) {
						if (di === 0 && dj === 0) continue;
						const ni = i + di,
							nj = j + dj;
						if (ni >= 0 && ni < state.length && nj >= 0 && nj < state[i].length && state[ni][nj] === 1) {
							neighbors++;
						}
					}
				}

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

const start = initalState(bomb);
const states = simulate(start, 10);
display(states);
