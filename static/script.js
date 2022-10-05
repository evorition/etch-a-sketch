const squares = [];
const grid = document.querySelector(".grid");

for (let i = 0; i < 256; i++) {
  const square = document.createElement("div");
  square.className = "square";

  grid.appendChild(square);
  squares.push(square);
}

squares.forEach(square => square.addEventListener("mouseover", () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  square.style.backgroundColor = `#${randomColor}`;
}));
