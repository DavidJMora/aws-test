import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authUserActions'

class Settings extends Component {

    logout = () => {
        this.props.logout();
        this.props.closeModal();
    }
    render() {
        return (
            <div>
                <button onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
    }
}

export default connect(null, { logout })(Settings)