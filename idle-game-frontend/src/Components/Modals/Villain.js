import React, { Component } from 'react'

export default class Villain extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.closeModal}>Attack</button>
                <button onClick={this.props.closeModal}>Magic Spell</button>
            </div>
        )
    }
}
