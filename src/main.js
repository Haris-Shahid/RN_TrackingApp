import React,{Component} from 'react' ;
import { Router , Scene } from 'react-native-router-flux' ;
import Login from './container/login' ;
import Signup from './container/signup' ;
import Dashboard from './container/dashboard/dashboard' ;
import CreateCircle from './container/dashboard/createCircle' ;
import Members from './container/dashboard/members' ;
import MembersMap from './container/dashboard/membersmap' ;
import JoinGroup from './container/dashboard/joingroup' ;

class Home extends Component{
  constructor(){
    super();
    console.disableYellowBox = true;
    
  }
  
  render(){
      return(
        <Router>
          <Scene key="root">
            <Scene initial key="Login" component={Login} hideNavBar />
            <Scene key="Signup" component={Signup} hideNavBar />
            <Scene key="dashboard" component={Dashboard} hideNavBar />
            <Scene titleStyle={{marginLeft: 60 , fontSize: 20  }} key="createCircle" component={CreateCircle} title="Create Circle" />
            <Scene titleStyle={{marginLeft: 60 , fontSize: 20  }} key="members" component={Members} title="Group Members" />
            <Scene titleStyle={{marginLeft: 60 , fontSize: 20  }} key="membersinmap" component={MembersMap} title="Members" />
            <Scene titleStyle={{marginLeft: 60 , fontSize: 20  }} key="joingroup" component={JoinGroup} title="Join Group" />
          </Scene>
        </Router>
      )
    }
  }
export default Home ;