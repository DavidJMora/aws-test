import React, { Component } from 'react'

class Hero extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.closeModal}>Attack</button>
                <button onClick={this.props.closeModal}>Magic Spell</button>
                <button onClick={this.props.closeModal}>Heal Potion</button>
                <button onClick={this.props.closeModal}>Elixir Potion</button>
            </div>
        )
    }
}

export default Hero