//GLOBALS
const GridSize = 512;

//generates a grid with the input cell Numbers per side
function generateGrid(cellNumber) {
    if(cellNumber>128) cellNumber = 128;
    cellSize = GridSize / cellNumber;

    const gridContainer = document.getElementById("grid-container");
    gridContainer.style.gridTemplateColumns = `repeat(${cellNumber}, ${cellSize}px)`;
    gridContainer.style.gridAutoRows = `${cellSize}px`;

    for (let i = 0; i<cellNumber*cellNumber; i++){
        const cell = document.createElement('div');      
        gridContainer.appendChild(cell);
    }
}

//toggles grid lines on or off on the sketch pad
function toggleGridLines(){
    const elements = document.querySelectorAll("#grid-container div");
    elements.forEach(el => {
        console.log(el.style.borderWidth);
        if (el.style.borderWidth === "0px") 
            el.style.borderWidth = "1px";
        else 
            el.style.borderWidth = "0px";
    });
}


function changeCellColor(cell, newColor = "white"){
    cell.target.style.backgroundColor = newColor;
    tempColor = newColor;
    console.log("painted!");
}


//event to switch colors on a square
const gridContainer = document.getElementById("grid-container");
let tempColor = "white";
let brushColor = "black";
let paintTimer = null;
let mouseClicked = false;

gridContainer.addEventListener('mouseover', function(e){
    tempColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = brushColor;
    if(mouseClicked) tempColor = brushColor; 
});

gridContainer.addEventListener('mouseout', function(e){
    e.target.style.backgroundColor = tempColor;
});

gridContainer.addEventListener('mousedown', function(){ 
    mouseClicked =true;
    console.log(mouseClicked);
});

gridContainer.addEventListener('mouseup', function(){ 
    mouseClicked = false;
    console.log(mouseClicked);
});

gridContainer.addEventListener('mouseleave', function(){
    mouseClicked = false;
    console.log("mouse left screen");
});


//Run the code
generateGrid(16);
//toggleGridLines();

