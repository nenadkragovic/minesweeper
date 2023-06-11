import React from 'react';
import './new-game-modal.scss'
import { useState } from 'react';

export default function NewGameModal(props) {

    const handleSubmit = () => {
        props.toggleStartNewGame();
    }   

    return (
        <form onSubmit={handleSubmit} className="new-game-form">
            <ul>
                <li>
                    <label>
                        Field Width:
                        <input type="text" value={props.fieldWidth} onChange={props.handleInputChangeWidth} />.
                    </label>
                </li>
                <li>
                    <label>
                        Field Height:
                        <input type="text" value={props.filedHeight} onChange={props.handleInputChangeHeight} />.
                    </label>
                </li>
                <li>
                    <label>
                        Number of mines:
                        <input type="text" value={props.numberOfMines} onChange={props.handleInputChangeNumberOfMines} />.
                    </label>
                </li>
                <li>
                    <input type="submit" value="Start game" className="submit-button" onSubmit={handleSubmit}/>
                </li>
            </ul>
        </form>
    );
}
