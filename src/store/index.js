import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/signupusr';
// import UserData from './reducers/userdata';

const store = createStore(
                  combineReducers({
                                    AuthReducer,
                                    // UserData,
                                 }),{},(applyMiddleware(thunk))
);

export default store ;

