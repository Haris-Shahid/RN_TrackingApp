import * as firebase from 'firebase';
import { Alert, ToastAndroid, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux' ;

export const SiginUpdate= 'SINGIN_UPDATE';
export const ErrorMessages= 'ErrorMessages';
export const ErrorMessages1= 'ErrorMessages1';


export function ButtonSignUpAction(userSignUp) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(userSignUp.email, userSignUp.password)
            .then((user) => {
                let firebaseData = {
                    name: userSignUp.name ,
                    email: userSignUp.email,
                    id: user.uid
                };

                console.log(firebaseData)
                firebase.database().ref('FamilyTracker/'+ user.uid).set(firebaseData)
                    .then(() => {
                        ToastAndroid.show('Account Created.', ToastAndroid.SHORT);
                        dispatch(ErrorMessageDispatch())
                        Actions.Login() ;
                    });
            })
            .catch((error) => {
                var errorMessage = error.message;
                dispatch(ErrorMessageDispatch(errorMessage))
            })
    }
}



export function ButtonLoginAction(userlogin) {
    return dispatch => {
        firebase.auth()
            .signInWithEmailAndPassword(userlogin.email, userlogin.password)
            .then((user) => {
                console.log('LOgin')
                ToastAndroid.show('Thanks For Login.', ToastAndroid.SHORT);
                dispatch(signInUpdate(user));
                dispatch(ErrorMessageDispatch1())
                Actions.dashboard();

            })
            .catch((error) => {
                var errorMessage = error.message;
                dispatch(ErrorMessageDispatch1(errorMessage))
            });
    }
}

// function UserDetails(data){
//     return{
//         type: 'UserDetails' ,
//         data
//     }
// }

function signInUpdate(payload) {
    return {
        type: SiginUpdate,
        payload
    }
}

function ErrorMessageDispatch(payload) {
    return {
        type: ErrorMessages,
        payload
    }
}
function ErrorMessageDispatch1(payload) {
    return {
        type: ErrorMessages1,
        payload
    }
}