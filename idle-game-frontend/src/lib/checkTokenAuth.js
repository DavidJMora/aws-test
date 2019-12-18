import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setUserSuccessful, logout } from '../redux/actions/authUserActions';

const checkTokenAuth = (store) => {

    let jwtToken = localStorage.getItem('jwtToken');

    let decoded;
    if(jwtToken) {
        setAuthToken(jwtToken);
        decoded = jwt_decode(jwtToken);
        store.dispatch(setUserSuccessful(jwtToken));
        const currentTime = Date.now() / 1000
        if(decoded.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/signin'
        }
    }
};

export default checkTokenAuth;