import { React, useState, useContext, useEffect } from 'react';
import './Cell.scss'
import { ExplodeContext } from '../ExplodeContext/ExplodeContext'

export default function Cell(props) {
    const [flag, setFlag] = useState(false);
    const { exploded, triggerExplosion } = useContext(ExplodeContext);

    
    useEffect(() => {
        if (props.checked && props.numberOfNeighbouringBombs == 0)
            props.triggerNeighbouringFields();
      }, [props.checked]);

    const handleRightClick = (event) => {
        event.preventDefault();
        if (props.checked || exploded)
            return;
        setFlag(true);
    };

    const handleLeftClick = (event) => {
        event.preventDefault();

        if (exploded)
            return;

        props.setChecked();
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
            className={
                `cell 
                ${props.checked && (!flag || props.containsBomb) || (exploded && props.containsBomb) ? 'checked' : ''}
                number-${props.numberOfNeighbouringBombs}`}
            disabled={exploded}
            onClick={handleLeftClick} onContextMenu={handleRightClick} >
                {
                    props.containsBomb && exploded ?
                        <div>&#128163;</div> : 
                        flag ?
                            <div className='flag'>&#128681;</div> :
                            props.checked ? props.numberOfNeighbouringBombs : null
                }
        </button>
    );
}
