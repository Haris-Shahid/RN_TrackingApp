import React from 'react' ;
import { View , TextInput, Dimensions , StyleSheet , TouchableOpacity, Text } from 'react-native' ;

import { Button } from 'react-native-elements' ;

import Head from '../components/common/header' ;
import { ButtonSignUpAction } from '../store/actions/action' ;
import {connect} from 'react-redux';

class Signup extends React.Component{
constructor(){
    super() ;
    this.state = {
        name : "" ,
        email: "" ,
        password: ""
    }
    console.disableYellowBox = true
}

adddata(){
    const { name, email, password } = this.state ;
    if( !name ){
        alert('Please type your name')
    }else if( !email ){
        alert('Please type your email')
    }else if( !password ){
        alert('Please type your password')
    } else{
        let user = { name, email, password }
        this.props.ButtonSignUpAction(user)
        this.setState({
            name: '' ,
            email: '' ,
            password: ''
        })
    }
}

    render(){
        const { ErrorMessage } = this.props;

        const { navigate } = this.props.navigation ;
        const { input ,container ,button ,childcontainer ,textbutton, errorStyle } = styles
        return(
            <View>
                <Head text="Signup" />
               <View style= {container} >
                    <TextInput
                        ref="1"
                        style={input}
                        value={this.state.name}
                        placeholder= {'Your Name...'}
                        onChangeText={(name)=> this.setState({name})}
                        onSubmitEditing={() => this.refs['2'].focus()}
                        returnKeyType="next"
                    />
                    <TextInput
                        ref="2"
                        style={input}
                        value={this.state.email}
                        placeholder= {'Email...'}
                        onChangeText={(email)=> this.setState({email})} 
                        onSubmitEditing={() => this.refs['3'].focus()}
                        returnKeyType="next"
                    /> 
                    <TextInput
                        ref="3"
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
                            title='Signup'
                            backgroundColor = 'blue'
                            borderRadius = {10}
                            containerViewStyle={{borderRadius:10}}
                            onPress={this.adddata.bind(this)} />
                        <TouchableOpacity style={textbutton} onPress={() => navigate('Login')} >
                            <Text>Already have an Account?</Text>
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
        ButtonSignUpAction: (userSignUp) => {
            dispatch(ButtonSignUpAction(userSignUp));
        }
    };
}

const mapStateToProps = (state) => {
    return {
        ErrorMessage: state.AuthReducer.ErrorMess,
    };
}

export default connect(mapStateToProps , mapDispatchToProps )(Signup) ;
