import React from 'react';
import './Field.scss'
import Cell from '../Cell/Cell'

export default function Field(props) {
    const styles = {
        display: 'grid',
        gridTemplateRows: `repeat(${props.width}, 0)`,
        gridTemplateColumns: `repeat(${props.height}, 0)`
    };

    const cells = [];
    for (let i = 0; i < props.width; i++){
        for(let j = 0; j < props.height; j++)
            cells.push(<Cell index={i * props.width + j} />);
    }

    return (
        <div style={styles}>{cells}</div>
    );
}