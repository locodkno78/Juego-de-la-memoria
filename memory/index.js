// Array de simbolos para las fichas
const cardSymbols = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼',
  '🐯', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧'
];

// Crear un nuevo tablero de fichas
const createDeck = () => {
  const deck = [...cardSymbols, ...cardSymbols];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Variables globales
let deck = [];
let flippedCards = [];
let matchedCards = [];
let isBoardLocked = false;

// Funcion para hacer click en la ficha
const handleCardClick = (index) => {
    const card = document.getElementById(`card-${index}`);

    if (!card || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (deck[card1] === deck[card2]) {
            matchedCards.push(card1, card2);
            alert('Correcto!')

            if (matchedCards.length === deck.length) {
                setTimeout(() => {
                    alert('¡Felicidades! ¡Ganaste el juego!');
                }, 500);
            }
        } else {
            setTimeout(() => {
                const card1Elem = document.getElementById(`card-${card1}`);
                const card2Elem = document.getElementById(`card-${card2}`);
                card1Elem.classList.remove('flipped');
                card2Elem.classList.remove('flipped');
                alert('Incorrecto :( Vuelve a intentarlo')
            }, 1000);
        }

        flippedCards = [];
    }
};

// Funcion para crear el tablero
const createGameBoard = () => {
    const gameBoard = document.querySelector('.game-board'); 
    deck = createDeck();

    deck.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${index}`;

        const front = document.createElement('div');
        front.className = 'front';

        const back = document.createElement('div');
        back.className = 'back';
        back.innerHTML = symbol;

        card.appendChild(front);
        card.appendChild(back);

        // Asignar evento de clic a cada carta individualmente
        card.addEventListener('click', () => handleCardClick(index));

        gameBoard.appendChild(card);
    });
};

// Initializar el juego
createGameBoard();
