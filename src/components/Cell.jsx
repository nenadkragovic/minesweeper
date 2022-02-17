import React from 'react';

export default class Cell extends React.Component {
    index = 0;

    render() {
        return (
            <div className="cell">{this.index}</div>
        );
    }
}
