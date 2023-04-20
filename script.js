//Default values
const DEFAULT_CANVAS_COLOR = "#ffffff"; //white background
const DEFAULT_PAINT_COLOR = "#000000";
const DEFAULT_GRID_SIZE = 16; //16 cells per side;
const DEFAULT_GRID_CONTAINER_SIZE =
   document.getElementById("grid-container").clientHeight; //pixels

//Components;
const grid = document.getElementById("grid-container");
const colorPicker = document.getElementById("color-picker");
const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");
const rainbowButton = document.getElementById("rainbow-button");
const paintButton = document.getElementById("paint-button");
const sizeSlider = document.getElementById("size-slider");
const sliderOutput = document.querySelector("#slider-value");
const fillButton = document.getElementById("fill-button");

//Input values
const DEFAULT_MODE = paintButton;
let currentColor = DEFAULT_PAINT_COLOR;
let currentMode = null;

clearButton.onclick = () => clearCanvas();
fillButton.onclick = () => fillCanvas();
colorPicker.oninput = (e) => {
   changeCurrentColor(e.target.value);
};
paintButton.onclick = () => {
   activateMode(paintButton);
};
eraserButton.onclick = () => {
   activateMode(eraserButton);
};
rainbowButton.onclick = () => {
   activateMode(rainbowButton);
};

sizeSlider.oninput = (e) => {
   sliderOutput.textContent = `(${sizeSlider.value} × ${sizeSlider.value}) `;
};

sizeSlider.onchange = (e) => {
   grid.innerHTML = "";
   drawGrid(e.target.value);
   activateMode(paintButton);
};

let mouseDown = false;
grid.onmousedown = () => {
   mouseDown = true;
};
grid.onmouseup = () => {
   mouseDown = false;
};

let changeCurrentColor = function (newColor) {
   currentColor = newColor;
};

//Calculate cellsize
let cellSize = function (gridSize) {
   return DEFAULT_GRID_CONTAINER_SIZE / gridSize;
};

function activateMode(mode) {
   deactivateCurrentMode(currentMode);
   mode.classList.add("active");
   currentMode = mode;
}

function deactivateCurrentMode(mode) {
   if (mode === null) {
      return;
   }
   mode.classList.remove("active");
}

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
   if (e.type === "mouseenter" && !mouseDown);
   else if (currentMode === paintButton) {
      e.target.style.backgroundColor = currentColor;
   } else if (currentMode === rainbowButton) {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      e.target.style["background-color"] = `rgb(${r}, ${g}, ${b})`;
   } else if (currentMode === eraserButton) {
      e.target.style.backgroundColor = DEFAULT_CANVAS_COLOR;
   }
}

function clearCanvas() {
   let cells = document.querySelectorAll(".cell");
   cells.forEach((cell) => (cell.style.backgroundColor = DEFAULT_CANVAS_COLOR));
}

function fillCanvas() {
   let cells = document.querySelectorAll(".cell");
   cells.forEach((cell) => (cell.style.backgroundColor = currentColor));
}

//IIFE
(() => {
   drawGrid(DEFAULT_GRID_SIZE);
   activateMode(paintButton);
})();
