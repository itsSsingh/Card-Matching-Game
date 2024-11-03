const gameBoard = document.getElementById("gameBoard");

const cardValues = ["🍎", "🍊", "🍌", "🍇", "🍒", "🍍", "🥝", "🍉"];
let cardsArray = [...cardValues, ...cardValues]; // Duplicate for matching pairs

// Shuffle the cards
cardsArray.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<div class="card-content">${value}</div>`;

  card.addEventListener("click", () => {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      // Check for a match
      if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          resetBoard();
        }, 1000);
      }
    }
  });

  return card;
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Generate and display the cards on the board
cardsArray.forEach((value) => {
  const card = createCard(value);
  gameBoard.appendChild(card);
});
