import React, { Component } from 'react' ;
import { Container, Spinner, Header, Content, Card, CardItem, Icon, Text, Right, Button, Body, List, ListItem, Thumbnail } from 'native-base' ;
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase' ;

class Circle extends Component {
  constructor(){
      super() ;
      this.state = {
          circleList: [],
          loading: true ,
          availCircle: [] ,
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
        this.check();
        // this.check();
    })
    this.setState({
        loading: false
    })    
    firebase.database().ref('Circle/').on('child_changed' ,(snap) => {
        firebase.database().ref('Circle/').on('value' ,(snap) => {
           var circleList = this.state.circleList ;
             circleList=[] ;
            var obj = snap.val() ;
            // console.log(obj)
            for (var key in obj) {
              circleList.push(obj[key])
            }
            console.log('hello',circleList)
                      this.setState({
                          circleList
                      }, ()=> {
                          console.log('stateupdates')
                      })
                      this.check();

            // var circleList = this.state.circleList ;
            // circleList.push(obj) ;
            // this.setState({
            //     circleList ,
            //     // loading: false
            // })
            // this.check();
            // this.check();
        })
          
        
        // var obj = snap.val() ;
        // console.log('object', snap.val() )
    })
}
  
  check(){
    //   const { availCircle } = this.state ;
    var availCircle = [] ;
     let admin = firebase.auth().currentUser.uid ;
      this.state.circleList.map( (memkey , i) => {
            // console.log(memkey);
            var a = memkey.members.indexOf(admin) ;
            if( a === -1 ){
                // console.log("Not a Member")

            }else{
                // console.log('you are a member', memkey)
                availCircle.push(memkey) ;
                this.setState({
                    availCircle
                })
            }
      })

    //   console.log('details', this.state.circleList , admin)
    // this.state.circleList.map((mem , i ) => {
    //     mem.members.map((v , i) => {
    //         console.log(v)
    //     })
    // })
  }
  
    render() {
        // console.log('final' , this.state.availCircle)
        const { availCircle } = this.state ;
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
                        availCircle.map((li, i) => {
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