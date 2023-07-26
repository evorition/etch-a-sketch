const DEFAULT_GRID_SIZE = 16;
const DEFAULT_MODE = "rainbow";

const gridElement = document.getElementById("grid");
const gridSizeDisplay = document.getElementById("grid-size");
const resizeRangeInputElement = document.getElementById("resize-range");
const colorPicker = document.getElementById("color-picker");
const modeButtons = document.querySelectorAll(".mode-btn");
const clearGridButton = document.getElementById("clear-btn");

const coloredSquares = [];

let isMouseDown = false;
let selectedMode = DEFAULT_MODE;
let selectedColor = colorPicker.value;

colorPicker.addEventListener("change", handleColorPickerChange);
modeButtons.forEach((modeButton) =>
  modeButton.addEventListener("click", handelModeChange)
);
clearGridButton.addEventListener("click", clearColoredSquares);

if ("ontouchstart" in window) {
  gridElement.addEventListener("touchstart", handleTouchStart);
  gridElement.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", () => {
    isMouseDown = false;
  });
} else {
  gridElement.addEventListener("mousedown", handleMouseDown);
  gridElement.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
}

function handleMouseDown(event) {
  event.preventDefault();
  isMouseDown = true;
  if (event.target.classList.contains("square")) {
    changeColor.call(event.target);
  }
}

function handleMouseOver(event) {
  if (isMouseDown && event.target.classList.contains("square")) {
    changeColor.call(event.target);
  }
}

function handleTouchStart(event) {
  event.preventDefault();
  isMouseDown = true;
  if (event.target.classList.contains("square")) {
    changeColor.call(event.target);
  }
}

function handleTouchMove(event) {
  const coordinates = event.changedTouches[0];
  const element = document.elementFromPoint(
    coordinates.clientX,
    coordinates.clientY
  );
  if (isMouseDown && element.classList.contains("square")) {
    changeColor.call(element);
  }
}

function deselectAllButtons() {
  modeButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

function handleColorPickerChange(event) {
  selectedColor = event.target.value;
}

function handelModeChange(event) {
  deselectAllButtons();
  selectedMode = event.target.dataset.mode;
  event.target.classList.add("selected");
}

function changeColor() {
  if (selectedMode === "color") {
    this.style.backgroundColor = selectedColor;
    coloredSquares.push(this);
  } else if (selectedMode === "rainbow") {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.style.backgroundColor = `#${randomColor}`;
    coloredSquares.push(this);
  } else if (selectedMode === "eraser") {
    this.style.backgroundColor = "#FFFFFF";
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
