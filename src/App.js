import './App.css';
import Field from './components/Field/Filed';
import NewGameModal from './components/ui/new-game-modal'
import { useState } from 'react';

function App() {

  const [gameActive, setGameActive] = useState(false);
  const [gameProps, setGameProps] = useState({
    width: 10,
    height: 10,
    numberOfMines: 10
  });

  const startNewGame = (w, h, m) => {
    setGameProps({
      width: w,
      height: h,
      numberOfMines: m
    });
    setGameActive(true);
  }

  return (
      <div className="content">
        <div className="header">
          <h3>
            <nav>
            <span>Score: <div className="score">0</div></span>
              <span><button className="new-game-btn" onClick={() => setGameActive(false)}>New Game</button></span>
            </nav>
          </h3>
        </div>

        <div className="main">
            {
              gameActive ?
                <Field width={gameProps.width} height={gameProps.height} numberOfMines={gameProps.numberOfMines} /> :
                <NewGameModal toggleStartNewGame={startNewGame}/>
            }
        </div>
      </div>
  );
}

export default App;
