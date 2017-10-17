import React, { Component } from 'react';
import { Container, Card, CardItem, Content, Spinner, Text, Item, Icon, Body, Input, Button, ListItem, List, Right, } from 'native-base';
import { Dimensions } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window');

class Members extends Component {
    constructor() {
        super();
        this.state = {
            members: [],
            groupKey: '',
            rndmno: '',
            loading: true,
        }
    }

    componentWillMount() {
        this.setState({
            groupKey: this.props.key1,
        })
        // console.log(this.props.circleName)
        const arr = [];
        this.props.members.map((v, i) => {
            firebase.database().ref('FamilyTracker/' + v).on('value', (snap) => {
                const keys = snap.val()
                console.log(keys, 'swkefh'    )
                arr.push(snap.val())
                    this.setState({
                    members: arr,
                    loading: false,
                })
                this.groupid();
            })
            // .then(() => {
            // })
        });
    }

    groupid() {
        var gk = this.state.groupKey;
        var gkl = this.state.groupKey.length;
        var res = gk.slice(1, 7);
        this.setState({
            rndmno: res
        })

    }

    render() {
        const { members } = this.state ;
        return (
            <Container style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }} >
                
                <Card style={{ width: width - 50 , height: height - 200 }} >
                    {
                        this.state.loading ? <Spinner color='red' /> :
                            members.map((v, i) => {
                                return (
                                    <CardItem key={i} >
                                        <Icon name="person" />
                                        <Text>{v.name}</Text>
                                    </CardItem>
                                )
                            })
                    }
                <Text style={{ fontSize: 23, color: 'gray', opacity: .5 ,paddingLeft: 30 }} >Type {this.state.rndmno} To Join Group</Text>
                <Button block onPress={()=> Actions.membersinmap({members}) } >
                    <Text>Go To Map</Text>
                </Button>
                </Card>
                
            </Container>
        )
    }
}

export default Members;