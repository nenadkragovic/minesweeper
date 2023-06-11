import { React, useContext  } from 'react';
import './Field.scss'
import Cell from '../Cell/Cell'
import { GameContext } from '../GameContextProvider/GameContextProvider';

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

    const { matrix } = useContext(GameContext);

    const cells = []
    for (let i = 0; i < props.height; i++)
        for (let j =0; j < props.width; j++)
            cells.push(
                <Cell
                    key={i*props.width +j}
                    col={j}
                    row={i}
                    containsBomb={matrix[i][j].containsBomb}
                    checked={matrix[i][j].checked}
                    flag={matrix[i][j].flag}
                />);
    
    return (
        <div className="fieldContainer">
            <div className="field" style={styles}>{cells}</div>
        </div>
    );
}