import { React, useState } from 'react';
import './Cell.scss'

export default function Cell(props) {
    const [flag, setFlag] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleRightClick = (event) => {
        event.preventDefault();
        if (checked)
            return;
        setFlag(true);
        setChecked(true);
    };

    const handleLeftClick = (event) => {
        event.preventDefault();
        setChecked(true);
        setFlag(false);
        if (props.containsBomb)
            props.explode()
        else {
            if (props.numberOfNeighbouringBombs === 0)
                props.triggerNeighbouringFields();
        }
    };
      
    return (
        <button 
            id={'cell-'+props.index}
            className={`cell ${checked && (!flag || props.containsBomb) || (props.exploded && props.containsBomb) ? 'checked' : ''}`}
            disabled={props.exploded}
            onClick={handleLeftClick} onContextMenu={handleRightClick} >
                {
                    props.containsBomb && props.exploded ?
                        <div>&#128163;</div> : 
                        flag ?
                            <div className='flag'>&#128681;</div> :
                            checked ? props.numberOfNeighbouringBombs : null
                }
        </button>
    );
}
