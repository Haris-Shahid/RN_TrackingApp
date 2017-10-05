import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/signupusr';

const store = createStore(
                  combineReducers({
                                    AuthReducer,
                                 }),{},(applyMiddleware(thunk))
);

export default store ;

