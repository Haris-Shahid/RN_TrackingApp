import React, { Component } from 'react' ;
import { View, StyleSheet } from 'react-native' ;
import { Button } from 'react-native-elements' ;

import Head from './components/common/header';

class App extends Component {
    render(){
        const { navigate } = this.props.navigation ;
        return(
            <View style={Styles.container} >
                <Head text="Tourist Guide" />
                <View style={[Styles.container,Styles.button]} >
                <Button
                    title='Login'
                    backgroundColor = 'blue'
                    borderRadius = {10}
                    containerViewStyle={{borderRadius:10}}
                    onPress={() => navigate('Login')} />
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button: {
        justifyContent: 'center'
    }
})

export default App ;