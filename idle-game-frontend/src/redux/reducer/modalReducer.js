import {
    // HERO_MODAL,
    // MONSTER_MODAL,
    // USER_SETTING_MODAL,
    // SIGNUP_MODAL,
    SHOW_MODAL,
    HIDE_MODAL
} from '../actionTypes/modalTypes';



const initialState = {
    selectedModal: null,
    open: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:

            return {
                open: action.payload,
                selectedModal: action.selectedModal
            }
        case HIDE_MODAL:

            return {
                type: action.payload
            }          
        default:
            return state;
    }
}