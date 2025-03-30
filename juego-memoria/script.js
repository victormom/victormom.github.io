const gameBoard = document.querySelector('.game-board');
const turnIndicator = document.getElementById('turn-indicator');
const gameMessage = document.getElementById('game-message');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');

// Colores para las cartas
const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF',
  '#33FFFF', '#FF8C00', '#8A2BE2', '#00FF00', '#FF4500'
];
let cards, firstCard, secondCard, isPlayerTurn, playerPoints, computerPoints;

// Inicializar juego
function initializeGame() {
  cards = [...colors, ...colors]; // Crear pares de cada color
  cards = cards.sort(() => Math.random() - 0.5); // Barajar las cartas

  // Reiniciar variables
  gameBoard.innerHTML = '';
  firstCard = null;
  secondCard = null;
  isPlayerTurn = true;
  playerPoints = 0;
  computerPoints = 0;
  document.getElementById('player-points').innerText = playerPoints;
  document.getElementById('computer-points').innerText = computerPoints;
  gameMessage.classList.add('hidden');
  updateTurnIndicator();

  // Renderizar cartas
  cards.forEach(color => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.setAttribute('data-color', color);
    card.style.backgroundColor = '#CCCCCC'; // Color inicial (boca abajo)
    gameBoard.appendChild(card);
  });
}

// Actualizar el indicador de turno
function updateTurnIndicator() {
  if (isPlayerTurn) {
    turnIndicator.textContent = 'Tu turno';
    turnIndicator.classList.remove('computer-turn');
  } else {
    turnIndicator.textContent = 'Turno de la computadora';
    turnIndicator.classList.add('computer-turn');
  }
}

// Verificar si el juego ha terminado
function checkGameOver() {
  const hiddenCards = document.querySelectorAll('.card.hidden');
  if (hiddenCards.length === 0) {
    // Mostrar mensaje de ganador
    if (playerPoints > computerPoints) {
      winnerMessage.textContent = '¡Ganaste!';
    } else if (computerPoints > playerPoints) {
      winnerMessage.textContent = 'La computadora ganó.';
    } else {
      winnerMessage.textContent = '¡Es un empate!';
    }
    gameMessage.classList.remove('hidden');
  }
}

// Manejar turnos y lógica del juego
function handleTurn(clickedCard) {
  if (!clickedCard.classList.contains('card') || !clickedCard.classList.contains('hidden')) {
    return; // Ignorar clics en cartas ya descubiertas
  }

  clickedCard.classList.remove('hidden');
  clickedCard.style.backgroundColor = clickedCard.getAttribute('data-color'); // Mostrar el color de la carta

  if (!firstCard) {
    firstCard = clickedCard;
  } else if (!secondCard) {
    secondCard = clickedCard;

    // Bloquear el tablero temporalmente
    gameBoard.style.pointerEvents = 'none';

    // Verificar si las cartas coinciden
    if (firstCard.getAttribute('data-color') === secondCard.getAttribute('data-color')) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      if (isPlayerTurn) {
        playerPoints++;
        document.getElementById('player-points').innerText = playerPoints;
      } else {
        computerPoints++;
        document.getElementById('computer-points').innerText = computerPoints;
      }

      // Reiniciar selección de cartas
      firstCard = null;
      secondCard = null;

      // Liberar el tablero y continuar
      setTimeout(() => {
        gameBoard.style.pointerEvents = 'auto';
        checkGameOver();
        if (!isPlayerTurn) {
          setTimeout(computerTurn, 1000);
        }
      }, 500);
    } else {
      // No coinciden: voltearlas de nuevo y cambiar turno
      setTimeout(() => {
        firstCard.style.backgroundColor = '#CCCCCC';
        secondCard.style.backgroundColor = '#CCCCCC';
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard = null;
        secondCard = null;

        // Cambiar turno
        isPlayerTurn = !isPlayerTurn;
        updateTurnIndicator(); // Cambiar el indicador visual
        if (!isPlayerTurn) {
          setTimeout(computerTurn, 1000); // Turno de la computadora
        } else {
          gameBoard.style.pointerEvents = 'auto'; // Liberar el tablero para el jugador
        }
      }, 1000);
    }
  }
}

// Turno de la computadora
function computerTurn() {
  updateTurnIndicator(); // Cambiar el indicador visual
  const hiddenCards = Array.from(document.querySelectorAll('.card.hidden'));

  if (hiddenCards.length < 2) return; // Final del juego si no hay suficientes cartas

  // Elegir dos cartas aleatorias
  const firstIndex = Math.floor(Math.random() * hiddenCards.length);
  const firstCard = hiddenCards[firstIndex];
  hiddenCards.splice(firstIndex, 1); // Eliminar la carta seleccionada

  const secondIndex = Math.floor(Math.random() * hiddenCards.length);
  const secondCard = hiddenCards[secondIndex];

  // Mostrar las cartas que elige la computadora
  firstCard.classList.remove('hidden');
  firstCard.style.backgroundColor = firstCard.getAttribute('data-color');
  setTimeout(() => {
    secondCard.classList.remove('hidden');
    secondCard.style.backgroundColor = secondCard.getAttribute('data-color');

    // Verificar si las cartas coinciden
    setTimeout(() => {
      if (firstCard.getAttribute('data-color') === secondCard.getAttribute('data-color')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        computerPoints++;
        document.getElementById('computer-points').innerText = computerPoints;
      } else {
        // Voltear las cartas de nuevo
        firstCard.style.backgroundColor = '#CCCCCC';
        secondCard.style.backgroundColor = '#CCCCCC';
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
      }

      // Cambiar turno de vuelta al jugador
      isPlayerTurn = true;
      updateTurnIndicator();
      gameBoard.style.pointerEvents = 'auto';
      checkGameOver();
    }, 1000);
  }, 1000);
}

// Manejar clics del jugador
gameBoard.addEventListener('click', (e) => {
  if (isPlayerTurn) {
    handleTurn(e.target);
  }
});

// Manejar el reinicio del juego
restartButton.addEventListener('click', initializeGame);

// Inicializar el juego al cargar
initializeGame();
