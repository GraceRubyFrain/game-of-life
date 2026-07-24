// console.log("▁▂▃▄▅▆▇█");

const populated = "██";
const unpopulated = "░░";

const grid = [
	[0, 0, 0],
	[0, 1, 0],
	[0, 0, 0],
];

for (let i = 0; i < grid.length; i++) {
	let row = "";
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] === 1) {
			row += populated;
		} else {
			row += unpopulated;
		}
	}
	console.log(row);
}
