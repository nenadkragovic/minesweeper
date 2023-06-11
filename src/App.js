import './App.css';
import Field from './components/Field/Filed';
import NewGameModal from './components/ui/new-game-modal'
import { useState, useContext } from 'react';
import { GameContext } from './components/GameContextProvider/GameContextProvider'

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
    newGame(fieldWidth, filedHeight, numberOfMines, function() {
      setGameActive(true);
    });
  }

  const { exploded, gameWon, newGame } = useContext(GameContext);

  return (
      <div className="content">
        
          <div className="header">
            <nav className="nav">
                <div className="message">
                  {
                    exploded ? <span style={{ color: "red"}}>You lost!</span> : null
                  }
                  {
                    gameWon ? <span style={{ color: "green"}}>You won!</span> : null
                  }
                </div>
                <div className='new-game-btn-container'>
                  <button className="new-game-btn" onClick={() => setGameActive(false)}>New Game</button>
                </div>
              </nav>
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
