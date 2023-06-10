import { React, useState  } from 'react';
import './Field.scss'
import Cell from '../Cell/Cell'
import { ExplodeContextProvider } from '../ExplodeContext/ExplodeContext'

export default function Field(props) {
    const styles = {
        display: 'grid',
        gridTemplateRows: `repeat(${props.height}, 0fr)`,
        gridTemplateColumns: `repeat(${props.width}, 0fr)`,
        alignItems: 'center',
        justifyContent: 'center',
        width: `calc(${props.width * 5}rem + 0.8rem)`,
        height: `calc(${props.height * 5}rem + 0.8rem)`
    };

    // create empty matrix
    const matrix = [];
    for (let row = 0; row < props.height; row++) {
      const rowArray = [];
      for (let col = 0; col < props.width; col++) {
        rowArray.push(0);
      }
      matrix.push(rowArray);
    }

    // populate matrix with bombs
    let generatedBombsCount = 0;
    while (generatedBombsCount < props.numberOfMines) {
        const randomIndex = Math.floor(Math.random() * props.width * props.height);
        let i = Math.floor(randomIndex / props.width);
        let j = randomIndex % props.width;

        if (matrix[i][j] === 1)
            continue;

        matrix[i][j] = 1;
        generatedBombsCount++;
    }

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];  

    const calculateNumberOfNeighbouringBombs = (row, col) => {

        if (matrix[row][col] === 1)
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
            matrix[newRow][newCol] === 1
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
                // TODO: try to find a way to trigger a click in react without manipulating DOM directly
                document.getElementById(`cell-${newRow*props.width +newCol}`).click();
            }
          }
    }

    const cells = []
    for (let i = 0; i < matrix.length; i++)
        for (let j =0; j< matrix[0].length; j++)
            cells.push(
                <Cell
                    key={i*props.width +j}
                    index={i*props.width +j}
                    containsBomb={matrix[i][j] === 1}
                    numberOfNeighbouringBombs={calculateNumberOfNeighbouringBombs(i, j)}
                    triggerNeighbouringFields={() => triggerNeighbouringFields(i, j)}
                />);
    
    return (

        <div className="fieldContainer">
            <ExplodeContextProvider>
                <div className="field" style={styles}>{cells}</div>
            </ExplodeContextProvider>
        </div>
    );
}