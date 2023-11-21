const content = document.getElementById("content");

const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

// 1. Створюємо поле для гри та вішаємо обробник кліку
createField();
content.addEventListener("click", onCellClick);

// 2. Створюємо масиви куди будемо записувати ходи
let historyX = [];
let historyO = [];

let currentPlayer = "X";

function onCellClick(event) {
  if (event.target === event.currentTarget || event.target.textContent) {
    return;
    // Додати перевірку якщо клітинка зайнята
  }

  event.target.textContent = currentPlayer;
  const id = Number(event.target.dataset.id);
  let isWinner = false;

  if (currentPlayer === "X") {
    historyX.push(id);
    isWinner = winnerCheck(historyX);
  } else {
    historyO.push(id);
    isWinner = winnerCheck(historyO);
  }

  // якщо є переможець
  if (isWinner) {
    showWinner();
  }

  // Змінюємо гравця - Якщо був Х стане O, і навпаки:
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function winnerCheck(history) {
  // Якщо хочаб один(some) масив  із виграшних комбінацій повністю (every) includes в historyX або historyO, то є переможець!!!!!

  return combinations.some((arr) =>
    arr.every((number) => history.includes(number))
  );
}

function createField() {
  let arrayOfCells = [];
  for (let i = 1; i <= 9; i += 1) {
    const itemEl = document.createElement("li");
    itemEl.classList = "item";
    itemEl.setAttribute("data-id", i);
    arrayOfCells.push(itemEl);
  }

  content.append(...arrayOfCells);
}

function clearField() {
  historyX = [];
  historyO = [];
  currentPlayer = "X";
  content.innerHTML = "";
  createField();
}

// Створюємо Лайтбокс
const instance = basicLightbox.create(
  `
	<h1>Виграв ${currentPlayer}</h1>
`,
  // Додаємо в параметри закриття функцію що очищає поле для гри
  {
    onClose: (instance) => {
      clearField();
    },
  }
);

function showWinner() {
  instance.show();
}

// Якщо нічия виводимо повідомлення
