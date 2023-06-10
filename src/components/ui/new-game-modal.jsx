import React from 'react';
import './new-game-modal.scss'
import { useState } from 'react';

export default function NewGameModal(props) {

    const [fieldWidth, setFieldWidth] = useState(6);
    const [filedHeight, setFieldheight] = useState(7);
    const [numberOfMines, setNumberOfMines] = useState(10);

    const handleInputChangeWidth = (event) => {
        setFieldWidth(event.target.value);
    };

    const handleInputChangeHeight = (event) => {
        setFieldheight(event.target.value);
    };

    const handleInputChangeNumberOfMines = (event) => {
        setNumberOfMines(event.target.value);
    };

    const handleSubmit = () => {
        props.toggleStartNewGame(fieldWidth, filedHeight, numberOfMines);
    }   

    return (
        <form onSubmit={handleSubmit} className="new-game-form">
            <ul>
                <li>
                    <label>
                        Field Width:
                        <input type="text" value={fieldWidth} onChange={handleInputChangeWidth} />.
                    </label>
                </li>
                <li>
                    <label>
                        Field Height:
                        <input type="text" value={filedHeight} onChange={handleInputChangeHeight} />.
                    </label>
                </li>
                <li>
                    <label>
                        Number of mines:
                        <input type="text" value={numberOfMines} onChange={handleInputChangeNumberOfMines} />.
                    </label>
                </li>
                <li>
                    <input type="submit" value="Start game" className="submit-button" onSubmit={handleSubmit}/>
                </li>
            </ul>
        </form>
    );
}
