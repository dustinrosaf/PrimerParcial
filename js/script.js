const cards = document.querySelectorAll('.carta-memoria');

let seVolteoCarta = false;
let Tablero = false;
let primeraCarta , segundaCarta;

function flipCard() {
  if (Tablero) return;
  if (this === primeraCarta) return;

  this.classList.add('flip');

  if (!seVolteoCarta) {
    seVolteoCarta = true;
    primeraCarta = this;

    return;
  }

  segundaCarta = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = primeraCarta.dataset.framework === segundaCarta.dataset.framework;

  isMatch ? desactivarCarta() : deseleccionarCarta();
}

function desactivarCarta() {
  primeraCarta.removeEventListener('click', flipCard);
  segundaCarta.removeEventListener('click', flipCard);

  resetBoard();
}

function deseleccionarCarta() {
  Tablero = true;

  setTimeout(() => {
    primeraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [seVolteoCarta, Tablero] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));