import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Signup.css';
import Input from '../../../Factory/Input/InputClass';
import ButtonClass from '../../../Factory/Button/ButtonClass';
import { ValidatorForm } from 'react-material-ui-form-validator';
import formArray from './SignupConfig';
import { signup, handleErrorSignup } from '../../../redux/actions/authUserActions';
import Spinner from '../../../Factory/Spinner/Spinner'
import MessageBar from '../../../Factory/MessageBar/MessageBar';


class Signup extends Component {

    state = {
        formData: {
            username: '',
            password: '',
            confirmPassword: '',
            redirectSecond: null,
            redirectToggle: false
        },
        submitted: false,
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.authUser.isAuthenticated) {
            this.props.history.push('/');
        }
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { formData } = this.state;
            if (value !== formData.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    successfullySignedUp = () => {
        this.setState({
            submitted: false,
            formData: {
                username: '',
                password: '',
                confirmPassword: ''
            }
        })
    }

    countDownRedirect = () => {
        let timeleft = 4;
        let downloadTimer = setInterval(function () {

            timeleft -= 1;
            console.log(timeleft)
            this.setState({
                redirectSecond: timeleft
            })

            if (timeleft === 0) {
                clearInterval(downloadTimer);
                this.props.closeModal();
            }
        }.bind(this), 750);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true,
        }, () => {

            this.props.signup(this.state.formData)
                .then(() => {
                    this.successfullySignedUp();

                    // setTimeout(() => {
                    //   this.props.history.push('/sign-in') 
                    // }, 3000) 

                    this.setState({
                        redirectToggle: true
                    })
                    this.countDownRedirect();

                })
                .catch(error => {
                    this.props.handleErrorSignup(error.response.data.message)
                    this.setState({
                        submitted: false
                    })
                })
        });
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
                >{this.props.message.serverMessage} {this.state.redirectToggle ? `Redirecting in ${this.state.redirectSecond}` : ''}</MessageBar> : ''}


                <ValidatorForm className='Form' onSubmit={this.handleSubmit}>
                    {
                        submitted ? <Spinner /> : form
                    }
                    <br />

                    <button onClick={this.props.closeModal}>X</button>
                    <ButtonClass
                        color="primary"
                        letiant="contained"
                        type="submit"
                        disabled={submitted}
                    >
                        {
                            (submitted && 'Your form is submitted!')
                            || (!submitted && 'Submit')
                        }
                    </ButtonClass>
                </ValidatorForm>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        authUser: state.authUser
    }
}

export default connect(mapStateToProps, { signup, handleErrorSignup })(Signup)