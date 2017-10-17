import React, { Component } from 'react' ;
import { Container, Spinner, Header, Content, Card, CardItem, Icon, Text, Right, Button, Body, List, ListItem, Thumbnail } from 'native-base' ;
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase' ;

class Circle extends Component {
  constructor(){
      super() ;
      this.state = {
          circleList: [],
          loading: true
      }
      
  }

  componentWillMount() {
    firebase.database().ref('Circle/').on('child_added' ,(snap) => {
        var obj = snap.val() ;
        // console.log(obj)
        var circleList = this.state.circleList ;
        circleList.push(obj) ;
        this.setState({
            circleList ,
            loading: false
        })
     
    })
    
  }
  
  
    render() {
        // console.log('final' , this.state.circleList)
        return(
            <Container>
                <Content>
                <Card>
                    <Button  onPress={() => Actions.createCircle() } block light >
                        <Icon name='add' />
                        <Text>Click Here To Create Your Circle</Text>
                        <Icon name="arrow-forward" />
                    </Button>
                </Card>
                    <Text style={{fontSize:20 ,fontWeight:'bold', paddingLeft:150 ,color : 'red',marginTop: 20}} >Circles List</Text>
                <List>
                    {
                        this.state.loading ? <Spinner color='red' /> :
                        this.state.circleList.map((li, i) => {
                           return( 
                               <ListItem key={i} >
                                    <Icon name='person' />
                                    <Body>
                                        <Text>{li.circleName}</Text>
                                    </Body>
                                    <Button onPress={() => Actions.members(li)} >
                                        <Icon name='add' />
                                    </Button>
                                </ListItem> 
                           )
                        })
                    }
                    <Button onPress={() => Actions.joingroup()} block>
                        <Text>Join Circle</Text>
                    </Button>
                </List>
                </Content>
            </Container>
        )
    }
}

export default Circle ; 