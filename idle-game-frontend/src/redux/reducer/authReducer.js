import { AUTH_USER_SUCCESSFUL, AUTH_USER_LOGOUT } from '../actionTypes/actionTypes';
import { HERO_SELECTION } from '../actionTypes/modalTypes';
import { jwtDecodeTokenAndSetUser } from './authReducerHelper'

import ironManImage from './heros/ironman.jpg';
import thorImage from './heros/thor.jpg';
import witchImage from './heros/witch.jpg';
import widowImage from './heros/widow.jpg';

const initialState = {
    isAuthenticated: false,
    user: {},
    selectedHero: null,
    selectedHeroImage: null
};



export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER_SUCCESSFUL:
            return jwtDecodeTokenAndSetUser(state, action.payload)
        case AUTH_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: {}
            }
        case HERO_SELECTION: 
            let ironMan = 'Iron Man'
            let thor = 'Thor'
            let blackWidow ='Black Widow'
            let scarletWitch = 'Scarlet Witch'
        

        if (ironMan === action.payload) {
            state.selectedHeroImage = ironManImage;
        } else if (thor === action.payload) {
            state.selectedHeroImage = thorImage;
        } else if (scarletWitch === action.payload) {
            state.selectedHeroImage = witchImage;
        } else if (blackWidow === action.payload) {
            state.selectedHeroImage = widowImage;
        }

    
            return {
                ...state,
                selectedHero: action.payload,
                selectedHeroImage: state.selectedHeroImage
            }
        default:
            return state;
    }
}


