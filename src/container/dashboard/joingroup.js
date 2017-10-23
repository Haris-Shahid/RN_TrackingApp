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
            keyval: '' ,
            loading: false ,
            circleList: [] ,
            availCircle: [] ,
            message: '' ,
        }
    }

    componentWillMount() {
        firebase.database().ref('Circle/').on('child_added' ,(snap) => {
            var obj = snap.val() ;
            // console.log(obj)
            var circleList = this.state.circleList ;
            circleList.push(obj) ;
            this.setState({
                circleList
            })
        })
    }

    joinCircle(){
        const { keyval, circleList } = this.state ;
        this.setState({loading: true })
        // console.log(this.state.keyval);
        var availCircle = [] ;
        let admin = firebase.auth().currentUser.uid ;
         this.state.circleList.map( (memkey , i) => {
            //    console.log(memkey);
               var a = memkey.key1.indexOf(keyval) ;
            //    console.log(a) ;
               if( a === -1 ){
                    this.setState({
                        // message: 'You Type Wrong Key' ,
                        loading: false
                    })
               }else{
                //    console.log('you are a member', memkey)
                   var check = memkey.members.indexOf(admin) ;
                   if( check === -1 ){
                    //    console.log(memkey)
                       let memberkey= memkey.key1 ;
                      let mem = memkey.members ;
                      mem.push(admin) ;
                       
                    //   console.log(mem)
                      var b = firebase.database().ref('Circle/'+ memberkey)
                            b.update({members: mem})
                            this.setState({
                                loading: false
                            })
                            Actions.dashboard() ;        

                }else{
                    this.setState({
                        message: 'You are Already a Member' ,
                        loading: false
                    })
                   }
               }
         })
   
    }

    render(){
        return(
            <Container style={{flex: 1,backgroundColor: 'white',paddingTop: 50 , alignItems: 'center' } } >
                <Content contentContainerStyle={{alignItems: 'center' ,}} >
                    <Text style={{fontSize: 23, fontWeight: 'bold',}}>Type The Key</Text>
                    <Item style={{marginTop: 30,}} rounded >
                        <Input onChangeText={(keyval)=> this.setState({keyval})} placeholder='Type the key in here'/>
                    </Item>
                    <Button onPress={this.joinCircle.bind(this)} style={{marginTop: 30, backgroundColor: 'pink',}} rounded large >
                        <Text>Add Yourself</Text>
                    </Button>
                    { this.state.loading ? <Spinner /> : 
                                            <Text style={{alignSelf: 'center', marginTop: 20, color: 'red' }} >
                                                {this.state.message}
                                            </Text> 
                    }  
                </Content>
            </Container>
        )
    }
}

export default JoinGroup ;