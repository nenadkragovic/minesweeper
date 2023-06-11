import { React, useState, useContext, useEffect } from 'react';
import './Cell.scss'
import { GameContext } from '../GameContextProvider/GameContextProvider'

export default function Cell(props) {

    const {
        exploded,
        gameWon,
        triggerExplosion,
        calculateNumberOfNeighbouringBombs,
        triggerNeighbouringFields,
        setChecked,
        setFlag
    } = useContext(GameContext);

    let numberOfNeighbouringBombs = calculateNumberOfNeighbouringBombs(props.row, props.col);
    
    useEffect(() => {
        if (props.checked && numberOfNeighbouringBombs == 0)
            triggerNeighbouringFields(props.row, props.col);
      }, [props.checked]);

    const handleRightClick = (event) => {
        event.preventDefault();
        if (props.checked || exploded)
            return;

        setFlag(props.row, props.col, !props.flag);
    };

    const handleLeftClick = (event) => {
        event.preventDefault();

        if (exploded)
            return;

        setChecked(props.row, props.col);
        setFlag(props.row, props.col, false);

        if (props.containsBomb)
            triggerExplosion();
        else {
            if (props.numberOfNeighbouringBombs === 0)
                props.triggerNeighbouringFields(props.row, props.col);
        }
    };
      
    return (
        <button
            className={
                `cell 
                ${props.checked && (!props.flag || props.containsBomb) || (exploded && props.containsBomb) ? 'checked' : ''}
                number-${numberOfNeighbouringBombs}`}
            disabled={exploded || gameWon}
            onClick={handleLeftClick} onContextMenu={handleRightClick} >
                {
                    props.containsBomb && exploded ?
                        <div>&#128163;</div> : 
                        props.flag ?
                            <div className='flag'>&#128681;</div> :
                            props.checked ? numberOfNeighbouringBombs : null
                }
        </button>
    );
}
