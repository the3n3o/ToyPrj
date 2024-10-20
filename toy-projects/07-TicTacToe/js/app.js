const cells = document.querySelectorAll("td");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const startBox = document.querySelector(".start-box");
const randomStart = document.querySelector("#random-start");
const normalStart = document.querySelector("#normal-start");
const goMain = document.querySelector("#go-main");

let currentPlayer = "O";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// 모달
function modalOn() {
  modal.style.display = "flex";
}

function modalOff() {
  modal.style.display = "none";
}

// 시작 버튼 (랜덤시작 / 순차시작)
// 랜덤시작
randomStart.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 2);
  startBox.classList.add("hidden");
  modalTitle.style.marginBottom = "0";

  if (random == 0) {
    currentPlayer = "O";
    modalTitle.innerText = "Player 1 (O) First!";
    player1.classList.add("turn");
  } else if (random == 1) {
    currentPlayer = "X";
    modalTitle.innerText = "Player 2 (X) First!";
    player2.classList.add('turn');
  }
  setTimeout(() => {
    modalOff();
    startBox.classList.remove('hidden');
    modalTitle.style.marginBottom = "40px";
  }, 2000);
});
// 순차시작
normalStart.addEventListener("click", () => {
  modalOff();
  player1.classList.add("turn");
});

// 승리 조건
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // 가로
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // 세로
  [0, 4, 8],
  [2, 4, 6], // 대각선
];

// 셀 클릭 이벤트 리스너
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClicked(cell, index));
});

// 셀 클릭 시 동작
function cellClicked(cell, index) {
  if (cell.innerText === "" && gameActive) {
    cell.innerText = currentPlayer;
    board[index] = currentPlayer;
    checkWinner();
    // currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    if (currentPlayer === "O" && gameActive) {
      currentPlayer = "X";
      player2.classList.add("turn");
      player1.classList.remove("turn");
    } else if (currentPlayer === 'X' && gameActive) {
      currentPlayer = "O";
      player1.classList.add("turn");
      player2.classList.remove("turn");
    }
  }
}

// 승자 확인
function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      modalOn();
      randomStart.classList.add("hidden");
      normalStart.classList.add("hidden");
      goMain.classList.remove("hidden");
      
      const winnerPlayer = currentPlayer === "O" ? 1 : 2;
      modalTitle.innerText = `Player ${winnerPlayer} wins!`;
      gameActive = false;

      return;
    }
  }

  // 무승부
  if (!board.includes("")) {
    modalOn();
    modalTitle.innerText = 'It\'s a draw!';
    randomStart.classList.add('hidden');
    normalStart.classList.add('hidden');
    goMain.classList.remove('hidden');
    gameActive = false;
  }
}

// 게임 리셋
function resetGame() {
  currentPlayer = "O";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.innerText = '');

  randomStart.classList.remove("hidden");
  normalStart.classList.remove("hidden");
  goMain.classList.add("hidden");
  modalTitle.innerText = 'Tic Tac Toe!';
}

goMain.addEventListener("click", resetGame);
