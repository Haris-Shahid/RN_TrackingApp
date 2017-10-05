import { ErrorMessages, ErrorMessages1, SiginUpdate } from '../actions/action';

const AuthReducer = (state = {
    auth: false,
    ErrorMess: '',
    ErrorMess1: '',
}, action) => {
    switch (action.type) {
        case SiginUpdate: {
            return state = {
                ...state,
                auth: !state.auth
            };
        }
        case ErrorMessages: {
            return state = {
                ...state,
                ErrorMess: action.payload
            };
        }
        case ErrorMessages1: {
            return state = {
                ...state,
                ErrorMess1: action.payload
            };
        }
        default: {}
    }
    return state;
}
export default AuthReducer;
