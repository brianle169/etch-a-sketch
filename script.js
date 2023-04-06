const grid = document.getElementById("grid-container");
const DEFAULT_CANVAS_COLOR = "#ffffff"; //white background
const DEFAULT_GRID_SIZE = 64; //16 cells per side;
const modeSelected = false;
const DEFAULT_MODE = "paint-button";
const DEFAULT_GRID_CONTAINER_SIZE =
   document.getElementById("grid-container").clientHeight; //pixels

//Components;
const colorPicker = document.getElementById("color-picker");
const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");
const sizeSlider = document.getElementById("size-slider");

clearButton.onclick = () => clearCanvas();

//Calculate cellsize
let cellSize = function (gridSize) {
   return DEFAULT_GRID_CONTAINER_SIZE / gridSize;
};

let mouseDown = false;
grid.onmousedown = () => {
   mouseDown = true;
};
grid.onmouseup = () => {
   mouseDown = false;
};
//Implement grid
function drawGrid(size) {
   for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.cssText = `width: ${cellSize(size)}px; 
      height: ${cellSize(size)}px;`;
      cell.addEventListener("mouseenter", changeColor);
      cell.addEventListener("mousedown", changeColor);
      grid.appendChild(cell);
   }
}

function changeColor(e) {
   if (e.type === "mouseenter" && !mouseDown) return;
   else {
      e.target.style.backgroundColor = "black";
   }
}

function clearCanvas() {
   let cells = document.querySelectorAll(".cell");
   cells.forEach((cell) => (cell.style.backgroundColor = DEFAULT_CANVAS_COLOR));
}

drawGrid(DEFAULT_GRID_SIZE);
