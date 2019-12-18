import React, { Component } from 'react'
import './Signin.css'
import Spinner from '../../Factory/Spinner/Spinner';
import formArray from './SigninConfig';
import { ValidatorForm } from 'react-material-ui-form-validator';
import ButtonClass from '../../Factory/Button/ButtonClass';
import Input from '../../Factory/Input/InputClass';
import { connect } from 'react-redux';
import { signin, handleErrorSignup } from '../../redux/actions/authUserActions';
import MessageBar from '../../Factory/MessageBar/MessageBar';
import { showModal, hideModal } from '../../redux/actions/modalActions';

import ModalRoot from '../Modals/ModalRoot'

class Signin extends Component {

    state = {
        formData: {
            username: '',
            password: '',
        },
        submitted: false,
    }

    componentDidMount() {
        if (this.props.authUser.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    successfullySignedUp = () => {
        this.setState({
            submitted: false,
            formData: {
                username: '',
                password: ''
            }
        })
    }

    openSignupModal = () => {
        this.props.showModal({
            open: true,
            selectedModal: 'Signup'
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            this.props.signin(this.state.formData)
                .then(() => {
                    this.successfullySignedUp();
                    this.props.history.push('/')
                })
                .catch(error => {
                    console.log(error, 'line 59')
                    this.props.handleErrorSignup(error.response.data.message)
                    this.setState({
                        submitted: false
                    })
                })

        });

    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    render() {

        const { submitted } = this.state;

        let form = (
            formArray.map((field, index) => {

                return (
                    <div key={field.input.label}>
                        <Input
                            {...field}
                            {...this.state.formData}
                            handleInputChange={this.handleChange}
                        />
                        <br />
                    </div>
                )
            })
        )

        return (
            <>
                {this.props.message.serverMessage !== null ? <MessageBar
                    fontColorStyle={this.props.message.messageStyle.fontColorStyle}
                    dynamicClassName={this.props.message.messageStyle.dynamicClassName}
                >{this.props.message.serverMessage}</MessageBar> : ''}
                <div className="App">
                    <h1 className='banner'>Sign in hero to begin your Quest of Epicness!!</h1>
                    <ValidatorForm className='Form' onSubmit={this.handleSubmit}>
                        {
                            submitted ? <Spinner /> : form
                        }
                        <br />
                        <div className='redirect'>
                            <button onClick={this.openSignupModal}
                            >Signup</button>
                            <ModalRoot hideModal={this.props.hideModal} />
                            <ButtonClass
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={submitted}
                            >
                                {
                                    (submitted && 'Your form is submitted!')
                                    || (!submitted && 'Submit')
                                }
                            </ButtonClass>
                        </div>


                    </ValidatorForm>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        authUser: state.authUser,
        modal: state.modal
    }
}

export default connect(mapStateToProps, { signin, handleErrorSignup, showModal, hideModal })(Signin);