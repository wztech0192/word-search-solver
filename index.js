const searchBtnEl = document.getElementById("search");
const inputGridEl = document.getElementById("letter-grid");
const inputWordsEl = document.getElementById("words");
const resultEl = document.getElementById("result");

const directions = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 0],
  [0, 1],
  [1, 1],
];

function solveGrid() {
  const grid = inputGridEl.value
    .toUpperCase()
    .split("\n")
    .map((p) => p.split(""));
  const words = inputWordsEl.value
    .toUpperCase()
    .split("\n")
    .map((v) => v);

  const wordResults = new Set();

  const n = grid.length;
  const m = grid[0].length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      for (const word of words) {
        for (const [dr, dc] of directions) {
          for (const result of detectWord(grid, word, r, c, dr, dc)) {
            wordResults.add(result);
          }
        }
      }
    }
  }
  displayResult(grid, wordResults);
}

function detectWord(grid, word, r, c, dr, dc) {
  const result = [];

  for (let i = 0; i < word.length; i++) {
    if (grid[r]?.[c] === word[i]) {
      result.push(`${r}-${c}`);
      r += dr;
      c += dc;
    } else {
      return [];
    }
  }

  return result;
}

function displayResult(grid, wordResults) {
  resultEl.innerHTML = "";

  const n = grid.length;
  const m = grid[0].length;

  for (let r = 0; r < n; r++) {
    const rowEl = document.createElement("div");
    for (let c = 0; c < m; c++) {
      const cellEl = document.createElement("span");
      cellEl.textContent = grid[r][c];
      cellEl.title = `${r}-${c}`;
      if (wordResults.has(`${r}-${c}`)) {
        cellEl.className = "match";
      }

      rowEl.appendChild(cellEl);
    }
    resultEl.appendChild(rowEl);
  }
}

searchBtnEl.addEventListener("click", solveGrid);
