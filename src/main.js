import React from 'react' ;
import { StackNavigator } from 'react-navigation' ;

import App from './App' ;
import Login from './container/login' ;
import Signup from './container/signup' ;
import Map from './container/map' ;
import PlaceDetails from './components/placedetails' ;
import NearBy from './container/nearby' ;
import MapNav from './container/mapnav' ;

const Home = StackNavigator({
    Home: { screen: App } ,
    Login: { screen: Login },
    Signup: { screen: Signup },
    Map: { screen: Map },
    PlaceDetails: { screen: PlaceDetails },
    NearBy: { screen: NearBy },
    MapNav: { screen: MapNav }
})

export default Home ;
