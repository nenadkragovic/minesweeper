import { React, useState  } from 'react';
import './Field.scss'
import Cell from '../Cell/Cell'
import * as matrixHelper from '../../helpers/matrixHelper'

export default function Field(props) {
    console.log("Creating new field.")

    const styles = {
        display: 'grid',
        gridTemplateRows: `repeat(${props.width}, 0fr)`,
        gridTemplateColumns: `repeat(${props.height}, 0fr)`,
        alignItems: 'center',
        justifyContent: 'center',
        width: `calc(${props.width * 5}rem + 0.8rem)`,
        height: `calc(${props.height * 5}rem + 0.8rem)`
    };

    const bombMatrix = matrixHelper.createMatrix(props.width, props.height, 0);
    let generatedBombsCount = 0;
    while (generatedBombsCount < props.numberOfMines) {
        const randomIndex = Math.floor(Math.random() * props.width * props.height);
        let i = Math.floor(randomIndex / props.width);
        let j = randomIndex % props.width;

        if (bombMatrix[i][j] === 1)
            continue;

        bombMatrix[i][j] = 1;
        generatedBombsCount++;
    }

    console.log('Generated: ', bombMatrix)

    const [exploded, setExploded] = useState(false);
    const explode = () => {
        setExploded(true);
        console.log('Game lost!');
        alert('You lost!');
    }

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];  

    const calculateNumberOfNeighbouringBombs = (row, col) => {

        if (bombMatrix[row][col] === 1)
            return -1;

        let count = 0;

        for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
      
          if (
            newRow >= 0 &&
            newRow < bombMatrix.length &&
            newCol >= 0 &&
            newCol < bombMatrix[0].length &&
            bombMatrix[newRow][newCol] === 1
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
              newRow < bombMatrix.length &&
              newCol >= 0 &&
              newCol < bombMatrix[0].length
            ) {
                // TODO: try to find a way to trigger a click in react without manipulating DOM directly
                document.getElementById(`cell-${newRow*props.width +newCol}`).click();
            }
          }
    }

    const cells = []
    console.log(bombMatrix);
    for (let i = 0; i< bombMatrix.length; i++)
        for (let j =0; j< bombMatrix[0].length; j++)
            cells.push(
                <Cell
                    key={i*props.width +j}
                    index={i*props.width +j}
                    containsBomb={bombMatrix[i][j] === 1}
                    numberOfNeighbouringBombs={calculateNumberOfNeighbouringBombs(i, j)}
                    explode={explode}
                    exploded={exploded}
                    triggerNeighbouringFields={() => triggerNeighbouringFields(i, j)}
                />);
    
    return (
        <div className="fieldContainer">
            <div className="field" style={styles}>{cells}</div>
        </div>
    );
}