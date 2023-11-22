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
  if (event.target === event.currentTarget || event.target.textContent !== "") {
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
    showWinner(currentPlayer);
  }

  // Нічия
  if (!isWinner && historyX.length + historyO.length === 9) {
    console.log("finish");
    const instance = basicLightbox.create(`	<h1>Нічия</h1>`, {
      onClose: () => {
        clearField();
      },
    });
    instance.show();
  }

  // Змінюємо гравця - Якщо був Х стане O, і навпаки:
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function winnerCheck(history) {
  let winningCombination = [];
  // Якщо хочаб один(some) масив  із виграшних комбінацій повністю (every) includes в historyX або historyO, то є переможець!!!!!
  if (
    combinations.some((arr) => arr.every((number) => history.includes(number)))
  ) {
    result = combinations.filter((arr) =>
      arr.every((number) => history.includes(number))
    );
    winningCombination = result[0];
    console.log(`winningCombination: ${winningCombination}`);

    winningCombination.map(
      (i) =>
        (content.querySelector(`[data-id='${i}']`).style.backgroundColor =
          "rgb(65, 230, 65)")
    );
    return true;
  }

  return false;
}

function createField() {
  let arrayOfCells = [];
  for (let i = 1; i <= 9; i += 1) {
    const itemEl = document.createElement("div");
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

function showWinner(player) {
  // Створюємо Лайтбокс
  const instance = basicLightbox.create(
    `
	<h1>Виграв ${player}</h1>
`,
    // Додаємо в параметри закриття функцію що очищає поле для гри
    {
      onClose: (instance) => {
        clearField();
      },
    }
  );
  instance.show();
}
