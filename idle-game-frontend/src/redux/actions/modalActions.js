import {
    // HERO_MODAL,
    // MONSTER_MODAL,
    // USER_SETTING_MODAL,
    HERO_SELECTION,
    SHOW_MODAL,
    HIDE_MODAL
} from '../actionTypes/modalTypes';

export const showModal = (info) => dispatch => {
    dispatch({
        type: SHOW_MODAL,
        payload: true,
        selectedModal: info.selectedModal
    })
}

export const hideModal = () => dispatch => {
    dispatch({
        type: HIDE_MODAL,
        payload: false
    })
}

export const setHero = (hero) => dispatch => {
    dispatch({
        type: HERO_SELECTION,
        payload: hero
    })
}

