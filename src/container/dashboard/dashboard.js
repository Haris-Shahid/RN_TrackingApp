import React,{ Component } from 'react' ;
import { Container, } from 'native-base' ;
import {Actions} from 'react-native-router-flux';
import Head from './component/header';
import UpperTab from './component/tabs' ;

class Dashboard extends Component{
  render(){
    return(
      <Container>
        <Head />
        <UpperTab />
      </Container>
    )
  }
}

export default Dashboard ;