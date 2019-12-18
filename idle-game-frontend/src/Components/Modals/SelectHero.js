import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHero } from '../../redux/actions/modalActions';

class SelectHero extends Component {
    
    theChosenOne = (event) => {
        let hero = event.target.innerHTML;
        this.props.setHero(hero);
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                Select Your Hero
                <button onClick={this.theChosenOne}>Iron Man</button>
                <button onClick={this.theChosenOne}>Thor</button>
                <button onClick={this.theChosenOne}>Black Widow</button>
                <button onClick={this.theChosenOne}>Scarlet Witch</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.modal
})

export default connect(mapStateToProps, { setHero })(SelectHero);