const grid = document.querySelector("#grid");
const resize = document.querySelector("#resize");

resize.addEventListener("click", resizeGrid);

function changeColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  this.style.backgroundColor = `#${randomColor}`;
}

function resizeGrid() {
  let gridSize;

  do {
    gridSize = +prompt("Enter a number of squares per side\nAllowed numbers between 1 and 100");
    console.log(gridSize);
  } while ((gridSize < 0 || gridSize > 100));

  if (gridSize === 0) {
    createGrid();
    return;
  }

  createGrid(gridSize);
}

function removeGrid() {
  while (grid.lastChild) {
    grid.removeChild(grid.lastChild);
  }
}

function createGrid(gridSize = 16) {
  removeGrid();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.className = "square";

    grid.appendChild(square);
  }

  grid.style.setProperty("grid-template-columns", `repeat(${gridSize}, 1fr)`);
  grid.style.setProperty("grid-template-rows", `repeat(${gridSize}, 1fr)`);

  grid.childNodes.forEach(square => square.addEventListener("mouseover",
    changeColor));
}

createGrid();
