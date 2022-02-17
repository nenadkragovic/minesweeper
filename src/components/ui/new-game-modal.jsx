import React from 'react';
import './new-game-modal.scss'
import { useSelector } from 'react-redux';

export default class NewGameModal extends React.Component {

    constructor(props) {
        super(props);
        this.fieldWidth = useSelector(state => state.fieldWidth);
        this.filedHeight = useSelector(state => state.filedHeight);
        this.numberOfMines = useSelector(state => state.numberOfMines);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="new-game-form">
                <ul>
                    <li>
                        <label>
                            Field Width:
                            <input type="text" value={this.state.fieldWidth} onChange={this.handleChange} />.
                        </label>
                    </li>
                    <li>
                        <label>
                            Field Height:
                            <input type="text" value={this.state.filedHeight} onChange={this.handleChange} />.
                        </label>
                    </li>
                    <li>
                        <label>
                            Number of mines:
                            <input type="text" value={this.state.numberOfMines} onChange={this.handleChange} />.
                        </label>
                    </li>
                    <li>
                        <input type="submit" value="Start game" className="submit-button"/>
                    </li>
                </ul>
            </form>
        );
    }
}
