import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

import Home from './src/main' ;
import * as firebase from 'firebase';

import { Provider } from 'react-redux' ;
import store from './src/store' ;

store.subscribe(() => console.log("store",store.getState())) ;

export default class touristGuide extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBxd-SzHHYlVL1Nwi6DhocPMs9b2ORfBKY",
      authDomain: "patient-tracker-8bfac.firebaseapp.com",
      databaseURL: "https://patient-tracker-8bfac.firebaseio.com",
      projectId: "patient-tracker-8bfac",
      storageBucket: "patient-tracker-8bfac.appspot.com",
      messagingSenderId: "1011939244962"
    };
    firebase.initializeApp(config);
}
  
  render() {
    return (
      <Provider store={store} >
          <View style={styles.container}>
            <Home />
          </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  
});

AppRegistry.registerComponent('touristGuide', () => touristGuide);