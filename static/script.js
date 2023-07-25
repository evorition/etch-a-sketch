const DEFAULT_GRID_SIZE = 16;

const gridElement = document.getElementById("grid");
const gridSizeDisplay = document.getElementById("grid-size");
const resizeRangeInputElement = document.getElementById("resize-range");
const coloredSquares = [];
let isMouseDown = false;

gridElement.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

function changeColor() {
  if (isMouseDown) {
    console.log("I'm here");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.style.backgroundColor = `#${randomColor}`;
    coloredSquares.push(this);
  }
}

function clearColoredSquares() {
  coloredSquares.forEach((square) => {
    square.style.backgroundColor = "";
  });
  coloredSquares.length = 0;
}

function adjustGridSize(gridSize) {
  gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  const totalSquares = gridElement.childElementCount;
  const squaresNeeded = gridSize * gridSize;

  if (squaresNeeded > totalSquares) {
    const squaresToAdd = squaresNeeded - totalSquares;
    const squaresHtml = '<div class="square"></div>'.repeat(squaresToAdd);
    gridElement.insertAdjacentHTML("beforeend", squaresHtml);
  } else if (squaresNeeded < totalSquares) {
    const squaresToRemove = totalSquares - squaresNeeded;
    for (let i = 0; i < squaresToRemove; i++) {
      gridElement.removeChild(gridElement.firstChild);
    }
  }

  gridElement.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("square")) {
      changeColor.call(event.target);
    }
  });
}

function handleGridSizeChange(event) {
  const gridSize = event.target.value;
  gridSizeDisplay.innerHTML = `${gridSize} x ${gridSize}`;

  clearColoredSquares();
  adjustGridSize(gridSize);
}

// Initialization
resizeRangeInputElement.value = DEFAULT_GRID_SIZE;
resizeRangeInputElement.addEventListener("input", handleGridSizeChange);
handleGridSizeChange({ target: { value: DEFAULT_GRID_SIZE } });
