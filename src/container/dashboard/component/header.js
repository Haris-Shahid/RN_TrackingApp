import React,{ Component } from 'react' ;
import * as firebase from 'firebase' ;
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content, ActionSheet, } from 'native-base' ;
import {Actions} from 'react-native-router-flux';

class Head extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }  


  logout(){
    firebase.auth().signOut().then((user)=> {
      console.log(user) ; 
      Actions.Login();
    })  
  }

  render(){
    return(
      <Header hasTabs style={{backgroundColor: 'green'}} >
        <Left>
           <Button transparent onPress={()=> this.logout()} >
              <Icon name='close' />
           </Button>
        </Left>
        <Body style={ {marginLeft: 60}} >
            <Title>Family Tracker</Title>
        </Body>
        <Right>
        </Right>
      </Header>
    )
  }
}

export default Head ;