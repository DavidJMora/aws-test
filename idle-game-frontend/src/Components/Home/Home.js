import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { showModal, hideModal } from '../../redux/actions/modalActions';

import ModalRoot from '../Modals/ModalRoot'

class Home extends Component {

    state = {
        hasHero: false,
        selectedHero: '',
        heroImage: null
    }

    componentDidMount() {

        if (!this.props.authUser.isAuthenticated) {
            this.props.history.push('/signin')
        }

        this.openSelectHeroModal();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.authUser.selectedHero !== this.props.authUser.selectedHero) {
            this.setState({
                hasHero: true,
                selectedHero: this.props.selectedHero
            })
        }
        
    }

    openSelectHeroModal = () => {
        this.props.showModal({
            open: true,
            selectedModal: 'Select Hero'
        })
    }

    openHeroMenuModal = () => {
        this.props.showModal({
            open: true,
            selectedModal: 'Hero'
        })
    }

    openVillainMenuModal = () => {
        this.props.showModal({
            open: true,
            selectedModal: 'Villain'
        })
    }

    openSettingsModal = () => {
        this.props.showModal({
            open: true,
            selectedModal: 'Settings'
        })
    }

    render() {

        return (
            <div className='App'>

                {this.props.authUser.isAuthenticated ?
                    <>
                        <button
                            onClick={this.openHeroMenuModal}
                        >Hero Actions</button>
                        <button
                            onClick={this.openVillainMenuModal}
                        >Villain Actions</button>
                        <button
                            onClick={this.openSettingsModal}
                        >Settings</button>
                        <ModalRoot hideModal={this.props.hideModal} />
                    </>
                    :
                    <Redirect to='/signin' />
                }

                {!this.state.hasHero ? 
                <>
                <button
                    onClick={this.openSelectHeroModal}
                >Select Your Hero</button>

            
                <ModalRoot hideModal={this.props.hideModal} />
                </>
                :
                <>
                'Enjoy your Journey!'
                <img src={this.props.authUser.selectedHeroImage} alt="something" />  
                </>
                }           
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser,
        modal: state.modal
    };
};


export default connect(mapStateToProps, { showModal, hideModal })(Home);