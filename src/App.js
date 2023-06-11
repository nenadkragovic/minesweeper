import './App.css';
import Field from './components/Field/Filed';
import NewGameModal from './components/ui/new-game-modal'
import { useState } from 'react';

function App() {

  const [gameActive, setGameActive] = useState(false);
  const [fieldWidth, setFieldWidth] = useState(15);
  const [filedHeight, setFieldheight] = useState(10);
  const [numberOfMines, setNumberOfMines] = useState(20);

  const handleInputChangeWidth = (event) => {
      setFieldWidth(event.target.value);
  };

  const handleInputChangeHeight = (event) => {
      setFieldheight(event.target.value);
  };

  const handleInputChangeNumberOfMines = (event) => {
      setNumberOfMines(event.target.value);
  };

  const startNewGame = () => {
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
                <Field width={fieldWidth} height={filedHeight} numberOfMines={numberOfMines} /> :
                <NewGameModal
                   toggleStartNewGame={startNewGame}
                   fieldWidth={fieldWidth}
                   filedHeight={filedHeight}
                   numberOfMines={numberOfMines}
                   handleInputChangeWidth={handleInputChangeWidth}
                   handleInputChangeHeight={handleInputChangeHeight}
                   handleInputChangeNumberOfMines={handleInputChangeNumberOfMines}
                />
            }
        </div>
      </div>
  );
}

export default App;
