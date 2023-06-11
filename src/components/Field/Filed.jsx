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
        width: `calc(${props.width * 3}rem + 0.8rem)`,
        height: `calc(${props.height * 3}rem + 0.8rem)`
    };

    // create empty matrix
    let mat = [];
    for (let row = 0; row < props.height; row++) {
      const rowArray = [];
      for (let col = 0; col < props.width; col++) {
        rowArray.push({
            containsBomb: false,
            checked: false
        });
      }
      mat.push(rowArray);
    }

    // populate matrix with bombs
    let generatedBombsCount = 0;
    while (generatedBombsCount < props.numberOfMines) {
        const randomIndex = Math.floor(Math.random() * props.width * props.height);
        let i = Math.floor(randomIndex / props.width);
        let j = randomIndex % props.width;

        if (mat[i][j].containsBomb)
            continue;

        mat[i][j].containsBomb = true;
        generatedBombsCount++;
    }

    // use State
    const [matrix, setMatrix] = useState(mat);

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];  

    const calculateNumberOfNeighbouringBombs = (row, col) => {

        if (matrix[row][col].containsBomb)
            return <div>&#128163;</div>;

        let count = 0;

        for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
      
          if (
            newRow >= 0 &&
            newRow < props.height &&
            newCol >= 0 &&
            newCol < props.width &&
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
              newRow < props.height &&
              newCol >= 0 &&
              newCol < props.width
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

    const cells = []
    for (let i = 0; i < props.height; i++)
        for (let j =0; j < props.width; j++)
            cells.push(
                <Cell
                    key={i*props.width +j}
                    containsBomb={matrix[i][j].containsBomb}
                    checked={matrix[i][j].checked}
                    setChecked={() => setChecked(i,j)}
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