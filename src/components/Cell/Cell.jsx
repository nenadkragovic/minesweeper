import { React, useState, useContext } from 'react';
import './Cell.scss'
import { ExplodeContext } from '../ExplodeContext/ExplodeContext'

export default function Cell(props) {
    const [flag, setFlag] = useState(false);
    const [checked, setChecked] = useState(false);
    const { exploded, triggerExplosion } = useContext(ExplodeContext);
    //useEffect({}[exploded]);

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
            triggerExplosion();
        else {
            if (props.numberOfNeighbouringBombs === 0)
                props.triggerNeighbouringFields();
        }
    };
      
    return (
        <button 
            id={'cell-'+props.index}
            className={`cell ${checked && (!flag || props.containsBomb) || (exploded && props.containsBomb) ? 'checked' : ''}`}
            disabled={exploded}
            onClick={handleLeftClick} onContextMenu={handleRightClick} >
                {
                    props.containsBomb && exploded ?
                        <div>&#128163;</div> : 
                        flag ?
                            <div className='flag'>&#128681;</div> :
                            checked ? props.numberOfNeighbouringBombs : null
                }
        </button>
    );
}
