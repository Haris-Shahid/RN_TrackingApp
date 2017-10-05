import React , { Component } from 'react' ;
import { View } from 'react-native';
import { Text } from 'react-native-elements' ;

class Head extends Component{
    render(){
        return(
            <View style={{marginTop:10,alignItems:'center'}} >
                <Text h4>{this.props.text}</Text>
            </View>
        )
    }
}

export default Head ;