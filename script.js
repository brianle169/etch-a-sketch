let grid = document.getElementById("grid-container");
const DEFAULT_CANVAS_COLOR = "#ffffff"; //white background
const DEFAUTL_GRID_SIZE = 16; //16 cells per side;
const modeSelected = false;
const DEFAULT_GRID_CONTAINER_SIZE =
   document.getElementById("grid-container").clientHeight; //pixels

//Calculate cellsize
let cellSize = function (gridSize) {
   return DEFAULT_GRID_CONTAINER_SIZE / gridSize;
};

//Implement grid
function drawGrid(size) {
   for (let i = 0; i < size * size; i++) {
      let cell = document.createElement("div");
      cell.style.cssText = `width: ${cellSize(size)}px; 
      height: ${cellSize(size)}px;`;
      //   cell.addEventListener("mouseenter", changeColor);
      grid.appendChild(cell);
   }
}

drawGrid(DEFAUTL_GRID_SIZE);
