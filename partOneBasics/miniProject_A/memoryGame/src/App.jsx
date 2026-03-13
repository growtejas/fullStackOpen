import { useState } from "react"
import { GameHeader } from "./components/GameHeader"
import { Card } from "./components/Card"
import { useEffect } from "react"
const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
]
function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  
  const initialzeGame = () =>{

    // console.log(cardValues);
    const shuffledValues = shuffle(cardValues);
    const finalCards = shuffledValues.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,

      }));
      // console.log(cardValues);
        setFlippedCards([]);
        setScore(0);
        setMoves(0);
        setCards(finalCards);
  };
  useEffect(() =>{
    initialzeGame();
  },[])

  const handleCardClick =(card) =>{
    if (card.isFlipped || card.isMatched) {
      return;
    }

    if (flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((m) => m + 1);

      const firstCard = newCards.find((c) => c.id === newFlippedCards[0]);
      const secondCard = newCards.find((c) => c.id === newFlippedCards[1]);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        setScore((s) => s + 1);
        const matchedCards = newCards.map((c) =>
          newFlippedCards.includes(c.id) ? { ...c, isMatched: true } : c
        );
        setCards(matchedCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) =>
            newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
          );
          setCards(flippedBackCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
  <div className='app'>  
    <GameHeader score={score} moves={moves} onRestart={initialzeGame} />

    <div className ="cards-grid">
      {cards.map((card) =>(
        <Card key={card.id} card={card} onClick={handleCardClick}/>
      ))}
    </div>
</div>  
  );
}

export default App
