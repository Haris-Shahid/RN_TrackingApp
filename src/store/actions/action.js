import * as firebase from 'firebase';
import { Alert, ToastAndroid } from 'react-native';

export const SiginUpdate= 'SINGIN_UPDATE';
export const ErrorMessages= 'ErrorMessages';
export const ErrorMessages1= 'ErrorMessages1';


export function ButtonSignUpAction(userSignUp) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(userSignUp.email, userSignUp.password)
            .then((user) => {
                let firebaseData = {
                    email: userSignUp.email,
                    id: user.uid
                };
                firebase.database().ref('users/' + user.uid).set(firebaseData)
                    .then(() => {
                        ToastAndroid.show('Account Created.', ToastAndroid.SHORT);
                        dispatch(ErrorMessageDispatch())
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
                ToastAndroid.show('Thanks For Login.', ToastAndroid.SHORT);
                dispatch(signInUpdate(user));
                dispatch(ErrorMessageDispatch1())

            })
            .catch((error) => {
                var errorMessage = error.message;
                dispatch(ErrorMessageDispatch1(errorMessage))
            });
    }
}

// export function LogOutAction() {
//     return dispatch => {
//         firebase.auth().signOut()
//             .then(() => {
//                 // Sign-out successful.
//                 dispatch(signInUpdate());
//             })
//             .catch((error) => {
//                 var errorMessage = error.message;

//             });

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