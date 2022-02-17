import logo from './logo.svg';
import './App.css';
import Field from './components/Filed';
import NewGameModal from './components/ui/new-game-modal'

function App() {
  return (
      <div className="content">
        <div className="header">
          <h>
            <p>/*=====================================================================================================================/</p>
            <p>
                <span>Score: <div className="score">0</div></span>
                <span><button className="new-game-btn">New Game</button></span>
            </p>
            <p>/=====================================================================================================================*/</p>
          </h>
          <NewGameModal/>
        </div>

      </div>
  );
}

export default App;
