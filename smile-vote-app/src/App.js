import React, { useState } from 'react';
import './App.css';

function App() {
  const initialSmileys = [
    { id: 1, icon: "😊", votes: 0 },
    { id: 2, icon: "😄", votes: 0 },
    { id: 3, icon: "🥰", votes: 0 },
    // Додайте більше смайлів за потреби
  ];

  const [smileys, setSmileys] = useState(initialSmileys);

  const handleVote = (id) => {
    setSmileys(prevSmileys => prevSmileys.map(smiley => (
      smiley.id === id ? { ...smiley, votes: smiley.votes + 1 } : smiley
    )));
  };

  const resetVotes = () => {
    setSmileys(initialSmileys);
    setWinningSmiley(null);
    setShowWinner(false);
  };

  const [showWinner, setShowWinner] = useState(false);
  const [winningSmiley, setWinningSmiley] = useState(null);

  const showResults = () => {
    const maxVotes = Math.max(...smileys.map(smiley => smiley.votes));
    const winners = smileys.filter(smiley => smiley.votes === maxVotes);

    if (winners.length === smileys.length) {
      setWinningSmiley(null); // Результат однаковий
    } else if (winners.length === 1) {
      setWinningSmiley(winners[0]);
    } else {
      setWinningSmiley(null);
    }

    setShowWinner(true);
  };

  return (
    <div className="App">
      <h1>Голосование за лучший смайлик</h1>
      <ul>
        {smileys.map(smiley => (
          <li key={smiley.id}>
            {smiley.icon} - {smiley.votes} голосов
            <button onClick={() => handleVote(smiley.id)}>Голосовать</button>
          </li>
        ))}
      </ul>
      <button onClick={showResults}>Показать результаты</button>
      <button onClick={resetVotes}>Сбросить голоса</button>
      {showWinner && (
        <div>
          {winningSmiley ? (
            <p>Победитель: {winningSmiley.icon}</p>
          ) : (
            <p>Результат одинаковый</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
