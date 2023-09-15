let cellNumber = 32;
let cellSize = 0;//px
const GridSize = 512;
//BEGIN generate grid FUNCTION
//container.appendChild(grid);
//
//generate grid

if(cellNumber>128) cellNumber = 128;
cellSize = GridSize / cellNumber;

const gridContainer = document.getElementById("grid-container");
gridContainer.style.gridTemplateColumns = `repeat(${cellNumber}, ${cellSize}px)`;
gridContainer.style.gridAutoRows = `${cellSize}px`;

for (let i = 0; i<cellNumber*cellNumber; i++){
    const cell = document.createElement('div');  
    cell.classList.add('cell');
    gridContainer.appendChild(cell);
}


