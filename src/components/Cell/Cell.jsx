import React from 'react';
import './Cell.scss'

export default function Cell(props) {
    return (
        <div className="cell">{props.index}</div>
    );
}
