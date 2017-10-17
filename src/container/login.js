import React from 'react' ;
import { View , TextInput, Dimensions , StyleSheet , TouchableOpacity,} from 'react-native' ;

import { Button, Text } from 'react-native-elements' ;

import Head from '../components/common/header' ;
import { ButtonLoginAction } from '../store/actions/action' ;
import {connect} from 'react-redux';

import * as firebase from 'firebase' ;
import { Actions } from 'react-native-router-flux' ;

class Login extends React.Component{
constructor(){
    super() ;
    this.state = {
        email: "" ,
        password: "" ,
        check: null ,
    }
}

componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
        if(firebase.auth().currentUser){
            Actions.dashboard()
        }
    });
}

adddata(){
    const { email, password } = this.state ;
    if( !email ){
        alert('Please type your email')
    }else if( !password ){
        alert('Please type your password')
    } else{
        let user = { email, password }
        this.props.ButtonLoginAction(user)
    }
}

renderComponent(){
        const { ErrorMessage } = this.props;
        const { input ,container ,button ,childcontainer ,textbutton, errorStyle } = styles
        return(
            <View>
                <Head text="Login" />
               <View style= {container} >
                    <TextInput
                        ref="1"
                        style={input}
                        value={this.state.email}
                        placeholder= {'Email...'}
                        onChangeText={(email)=> this.setState({email})} 
                        onSubmitEditing={() => this.refs['2'].focus()}
                        returnKeyType="next"
                    /> 
                    <TextInput
                        ref="2"
                        style={input}
                        value={this.state.disease}
                        placeholder= {'Password...'}
                        onChangeText={(password)=> this.setState({password})}
                        onSubmitEditing={() => this.adddata.bind(this)}
                        returnKeyType="done"
                        secureTextEntry
                    />
               </View>
               <View style={childcontainer} >
               <Button
                    title='Login'
                    backgroundColor = 'blue'
                    borderRadius = {10}
                    containerViewStyle={{borderRadius:10}}
                    onPress={this.adddata.bind(this)} />
                <TouchableOpacity style={textbutton} onPress={() => Actions.Signup()} >
                    <Text>Don't have an Account?</Text>
                </TouchableOpacity>
                
               </View>
               <Text style={errorStyle}>
                        {(ErrorMessage) ? (
                            <Text style={errorStyle}>
                                {this.props.ErrorMessage}
                            </Text>

                        ) : (
                                <Text></Text>
                            )}
                </Text>
           </View>
        )
}


    render(){
        return(
            <View>
                {
                     this.renderComponent()
                }
            </View>
        )
    }
}


const { height, width} = Dimensions.get('window') ;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 30 ,
    },
    input: {
      height: 60,
      width: width - 50 ,
    },
    childcontainer: {
        flexDirection: "row" ,
        justifyContent: 'space-around'
    },
    textbutton: {
        marginTop: 10
    },
    
    errorStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        margin: 12
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        ButtonLoginAction: (userLogin) => {
            dispatch(ButtonLoginAction(userLogin));
        }
    };
}

const mapStateToProps = (state) => {
    return {
        ErrorMessage: state.AuthReducer.ErrorMess1,
        auth: state.AuthReducer.auth , 
    };
}

export default connect(mapStateToProps , mapDispatchToProps )(Login) ;
