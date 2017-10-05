import React from 'react' ;
import { View , TextInput, Dimensions , StyleSheet , TouchableOpacity,} from 'react-native' ;

import { Button, Text } from 'react-native-elements' ;

import Head from '../components/common/header' ;
import { ButtonLoginAction } from '../store/actions/action' ;
import {connect} from 'react-redux';


class Login extends React.Component{
constructor(){
    super() ;
    this.state = {
        email: "" ,
        password: ""
    }
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
        this.setState({
            email: '' ,
            password: ''
        })
    }
}

    render(){
        
        const { ErrorMessage , auth } = this.props;
        
        const { navigate } = this.props.navigation ;
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
                <TouchableOpacity style={textbutton} onPress={() => navigate('Signup')} >
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
                <View>
                    {
                      auth ? <Button
                                title='Map'
                                backgroundColor = 'blue'
                                borderRadius = {10}
                                containerViewStyle={{borderRadius:10}}
                                onPress={() => navigate('Map')} /> : <View></View>
                    }
                </View>
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
