import React, { createContext, useState } from 'react';

// Create a shared context
export const GameContext = createContext();

// Create a provider component
export const GameContextProvider = ({ children }) => {

  const [exploded, setExploded] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [matrix, setMatrix] = useState([]);

  const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]
  ]; 

  const generateField = (width, height, numberOfMines, callback) => {
      // create empty matrix
      let fieldMatrix = [];
      for (let row = 0; row < height; row++) {
        const rowArray = [];
        for (let col = 0; col < width; col++) {
          rowArray.push({
              containsBomb: false,
              checked: false,
              flag: false
          });
        }
        fieldMatrix.push(rowArray);
      }

      // populate matrix with bombs
      let generatedBombsCount = 0;
      while (generatedBombsCount < numberOfMines) {
          const randomIndex = Math.floor(Math.random() * width * height);
          let i = Math.floor(randomIndex / width);
          let j = randomIndex % width;

          if (fieldMatrix[i][j].containsBomb)
              continue;

          fieldMatrix[i][j].containsBomb = true;
          generatedBombsCount++;
      }

    setMatrix(fieldMatrix);
    callback();
  }

  const triggerExplosion = () => {
    setExploded(true);
  };

  const newGame = (width, height, numberOfMines, callback) => {
    setExploded(false);
    setGameWon(false);
    generateField(width, height, numberOfMines, callback);
  };

  const calculateNumberOfNeighbouringBombs = (row, col) => {

      if (matrix[row][col].containsBomb)
          return <div>&#128163;</div>;

      let count = 0;

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
    
        if (
          newRow >= 0 &&
          newRow < matrix.length &&
          newCol >= 0 &&
          newCol < matrix[0].length &&
          matrix[newRow][newCol].containsBomb
        ) {
          count++;
        }
      }
    
      return count;
  }

  const triggerNeighbouringFields = (row, col) => {
      for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
      
          if (
            newRow >= 0 &&
            newRow < matrix.length &&
            newCol >= 0 &&
            newCol < matrix[0].length
          ) {
              let copy = [...matrix];
              copy[newRow][newCol].checked = true;
              setMatrix(copy);
          }
        }
  }

  const setChecked = (i,j) => {
      let copy = [...matrix];
      copy[i][j].checked = true;
      setMatrix(copy);
  }

  const setFlag = (i,j, value) => {
    let copy = [...matrix];
    copy[i][j].flag = value;
    setMatrix(copy);
    if (checkGameStatus())
      setGameWon(true);
  }

  const checkGameStatus = () => {
    let allBombsMarked = true, allCheked = true;
    for(let i =0;i<matrix.length;i++)
      for(let j=0;j<matrix[0].length; j++) {
        if (matrix[i][j].containsBomb && !matrix[i][j].flag)
          allBombsMarked = false;
        if (!matrix[i][j].checked && !matrix[i][j].containsBomb)
          allCheked = false;
      }

    return allBombsMarked && allCheked;
  }

  return (
    <GameContext.Provider 
      value={{ 
        exploded,
        gameWon,
        matrix,
        newGame,
        triggerExplosion,
        calculateNumberOfNeighbouringBombs,
        triggerNeighbouringFields,
        setChecked,
        setFlag
        }}>
      {children}
    </GameContext.Provider>
  );
};
