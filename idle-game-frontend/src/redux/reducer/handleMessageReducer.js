import { AUTH_USER_FAILURE, AUTH_SIGNUP_SUCCESSFUL } from '../actionTypes/actionTypes';

const initialState = {
    serverMessage: null,
    messageStyle: {
        fontColorStyle: '',
        dynamicClassName: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER_FAILURE:
            return {
                serverMessage: action.payload,
                messageStyle: {
                    fontColorStyle: '#f44336',
                    dynamicClassName: 'App'
                }
            };
        case AUTH_SIGNUP_SUCCESSFUL:
            return {
                serverMessage: action.payload,
                messageStyle: {
                    fontColorStyle: '#3F51B5',
                    dynamicClassName: 'App'
                }
            };
        default:
            return state;
    }
}
