// GLOBALS
const gridSize = 512;
let cellNumber = 16;
let maxCellNumber = 48;

// Generates a grid with the input cell Numbers per side
const generateGrid = () => {
	deleteGrid();

	// Check if cellNumber is appropriate and adjust it if necessary
	if (cellNumber > maxCellNumber) cellNumber = maxCellNumber;
	else if (cellNumber <= 0) cellNumber = 1;

	//
	cellSize = gridSize / cellNumber;

	//
	const gridContainer = document.getElementById('grid-container');

	gridContainer.style.gridTemplateColumns = `repeat(${cellNumber}, ${cellSize}px)`;
	gridContainer.style.gridAutoRows = `${cellSize}px`;

	for (let i = 0; i < cellNumber * cellNumber; i++) {
		const cell = document.createElement('div');
		gridContainer.appendChild(cell);
	}
};

const deleteGrid = () => {
	const gridContainer = document.getElementById('grid-container');
	let child = gridContainer.lastElementChild;
	while (child) {
		gridContainer.removeChild(child);
		child = gridContainer.lastElementChild;
	}
};

// Toggles the grid lines on or off on the sketch pad
const toggleGridLines = () => {
	const elements = document.querySelectorAll('#grid-container div');

	elements.forEach((el) => {
		if (el.style.borderWidth === '0px') el.style.borderWidth = '1px';
		else el.style.borderWidth = '0px';
	});
};

//
const setGridSize = () => {
	//
	const result = parseInt(
		prompt('Please choose the number of cells per side!', 16)
	);

	//
	if (result && result != NaN) {
		// Entered number is valid
		cellNumber = result;
		return true;
	}

	return false;
};

// Declare the colors for the brush
let tempColor = 'white';
let brushColor = 'black';

// Setup the event listeners for the grid container
const gridContainer = document.getElementById('grid-container');

// Holds the current mouse state
let mouseClicked = false;

gridContainer.addEventListener('mouseover', (e) => {
	tempColor = e.target.style.backgroundColor;
	e.target.style.backgroundColor = brushColor;
	if (mouseClicked) {
		tempColor = brushColor;
	}
});

gridContainer.addEventListener(
	'mouseout',
	(e) => (e.target.style.backgroundColor = tempColor)
);

gridContainer.addEventListener('mousedown', () => {
	mouseClicked = true;
	tempColor = brushColor;
});

gridContainer.addEventListener('mouseup', () => (mouseClicked = false));

gridContainer.addEventListener('mouseleave', () => (mouseClicked = false));

// Set up the event listeners for the buttons
//
const gridSizeBtn = document.querySelector('#header .buttons .size');
gridSizeBtn.addEventListener('click', () => {
	if (setGridSize()) generateGrid();
});

// Event listener for clearing the grid.
const clearGridBtn = document.querySelector('#header .buttons .clear');
clearGridBtn.addEventListener('click', (e) => {
	const elements = document.querySelectorAll('#grid-container div');
	elements.forEach((el) => {
		el.style.backgroundColor = 'white';
	});

	generateGrid();
});

// Event listener for toggling the grid lines
const toggleGridBtn = document.querySelector('#header .buttons .toggleGrid');
toggleGridBtn.addEventListener('click', (e) => toggleGridLines());

//Run the code
const header = document.querySelector('#header');
header.style.width = `${gridSize}px`;

generateGrid();
