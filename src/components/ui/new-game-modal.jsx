import React from 'react';
import './new-game-modal.scss'
import { useState } from 'react';

export default function NewGameModal(props) {

    const [fieldWidth, setFieldWidth] = useState(10);
    const [filedHeight, setFieldheight] = useState(10);
    const [numberOfMines, setNumberOfMines] = useState(10);

    const handleSubmit = () => {
        console.log("Form submitted")
        props.toggleStartNewGame(fieldWidth, fieldWidth, numberOfMines);
    }   

    return (
        <form onSubmit={handleSubmit} className="new-game-form">
            <ul>
                <li>
                    <label>
                        Field Width:
                        <input type="text" value={fieldWidth} onChange={setFieldWidth} />.
                    </label>
                </li>
                <li>
                    <label>
                        Field Height:
                        <input type="text" value={filedHeight} onChange={setFieldheight} />.
                    </label>
                </li>
                <li>
                    <label>
                        Number of mines:
                        <input type="text" value={numberOfMines} onChange={setNumberOfMines} />.
                    </label>
                </li>
                <li>
                    <input type="submit" value="Start game" className="submit-button" onSubmit={handleSubmit}/>
                </li>
            </ul>
        </form>
    );
}
