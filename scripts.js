//GLOBALS
const gridSize = 512;
let cellNumber = 16;
let maxCellNumber = 48;

//generates a grid with the input cell Numbers per side
function generateGrid() {
    deleteGrid();
    //check if cellNumber is appropriate and adjust it if necessary
    if(cellNumber > maxCellNumber) cellNumber = maxCellNumber;
    else if (cellNumber <=0) cellNumber = 1;
    //
    cellSize = gridSize / cellNumber;
    //
    const gridContainer = document.getElementById("grid-container");
    gridContainer.style.gridTemplateColumns = `repeat(${cellNumber}, ${cellSize}px)`;
    gridContainer.style.gridAutoRows = `${cellSize}px`;

    for (let i = 0; i<cellNumber*cellNumber; i++){
        const cell = document.createElement('div');    
        gridContainer.appendChild(cell);
    }
}

//delete entire grid
function deleteGrid(){
    const gridContainer = document.getElementById("grid-container");
    let child = gridContainer.lastElementChild;
    while(child){
        gridContainer.removeChild(child);
        child = gridContainer.lastElementChild;
    }
    console.log("deleted grid cells");

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

//
function setGridSize(){
    let result = parseInt(prompt("Please choose the number of cells per side!", 16));
    //if user didnt press cancel perform the change
    //if it's a number we can atribute
    
    if(result && result!= NaN){             
        cellNumber = result;
        console.log(`cellNumber is now ${cellNumber}`);
        return true;
        
    }
    return false;
    
}

let tempColor = "white";
let brushColor = "black";

//EVENT LISTENERS
//EVENT LISTENERS FOR DRAWING
const gridContainer = document.getElementById("grid-container");
let mouseClicked = false;

gridContainer.addEventListener('mouseover', function(e){
    tempColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = brushColor;
    if(mouseClicked) tempColor = brushColor; 
});

gridContainer.addEventListener('mouseout', function(e){
    e.target.style.backgroundColor = tempColor;
});

gridContainer.addEventListener('mousedown', function(e){ 
    mouseClicked = true;
    tempColor = brushColor;
    e.preventDefault();   
});

gridContainer.addEventListener('mouseup', function(e){ 
    mouseClicked = false;
});

gridContainer.addEventListener('mouseleave', function(e){
    mouseClicked = false;
});
//BUTTON EVENT LISTENERS

let buttonElement = document.querySelector("#header .buttons .size");
buttonElement.addEventListener('click', function(e){
    console.log(`we clicked at ${e.target}`);
    if(setGridSize()) generateGrid();
});

buttonElement = document.querySelector("#header .buttons .clear");
buttonElement.addEventListener('click', function(e){
    const elements = document.querySelectorAll("#grid-container div");
    elements.forEach(el=>{
        el.style.backgroundColor = "white";
    })
    
    console.log(`we clicked at ${e.target}`);
    generateGrid();
});

buttonElement = document.querySelector("#header .buttons .toggleGrid");
buttonElement.addEventListener('click', function(e){
    console.log(`we clicked at ${e.target}`);
    toggleGridLines();
});

//Run the code
const header = document.querySelector("#header");
header.style.width = `${gridSize}px`;
generateGrid();


