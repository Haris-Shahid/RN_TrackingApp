import React, {Component} from 'react' ;
import { Container, Spinner, Content, Text, Item, Input, Button,} from 'native-base' ;
import {Dimensions} from 'react-native' ; 
import * as firebase from 'firebase' ;
import {Actions} from 'react-native-router-flux';

const { height, width} = Dimensions.get('window') ;

class JoinGroup extends Component{
    constructor(){
        super(); 
        this.state={
            circleName: '' ,
            loading: false ,
        }
    }

    componentWillMount() {
        alert('dkmsf')
        firebase.database().ref('Circle/').once('value' ,(snap) => {
            var obj = snap.val() ;
            alert(obj)
      
        })
    }

    addcircle(){
        this.setState({loading: true })
        console.log(this.state.circleName);
    }

    render(){
        return(
            <Container style={{flex: 1,backgroundColor: 'white',paddingTop: 50 , alignItems: 'center' ,}} >
                <Content>
                    <Text style={{fontSize: 23, fontWeight: 'bold',paddingLeft: 70}}>Type The Key</Text>
                    <Item style={{marginTop: 30,paddingLeft: 50 }} rounded >
                        <Input onChangeText={(circleName)=> this.setState({circleName})} placeholder='Type the key in here'/>
                    </Item>
                    <Button onPress={this.addcircle.bind(this)} style={{marginTop: 30, backgroundColor: 'pink',marginLeft: 50 }} rounded large >
                        <Text>Add Yourself</Text>
                    </Button>
                    { this.state.loading ? <Spinner /> : <Text /> }
                </Content>
            </Container>
        )
    }
}

export default JoinGroup ;