import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { GameContextProvider } from './components/GameContextProvider/GameContextProvider'

const store = createStore(() => ({
    newGameModalOpen: false,
    fieldWidth: 0,
    filedHeight: 0,
    numberOfMines: 0,
    field: [],
}));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
