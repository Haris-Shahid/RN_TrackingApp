import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ListView } from 'react-native';
import MapView from 'react-native-maps';
// import { Button } from 'react-native-elements' ;
import RNGooglePlaces from 'react-native-google-places';
import {Actions} from 'react-native-router-flux' ;
import * as firebase from 'firebase' ;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 24.813509;
const LONGITUDE = 67.048319;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
   
  }}

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude ;
        var longitude =  position.coords.longitude ;
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
    (error) => console.warn(error.message),
    { enableHighAccuracy: true , timeout: 20000, maximumAge: 1000 },
    );
  }

  
  render() {
     return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsPointOfInternet={false}
          toolbarEnabled={true}
          region={this.state.region}
          provider= "google"
          mapType="standard"
         >

         {
            this.props.members.map( (map , v) => {
              return (
                <MapView.Marker key={v}
                  coordinate={{latitude: map.latitude,
                               longitude: map.longitude,
                               latitudeDelta: LATITUDE_DELTA,
                               longitudeDelta: LONGITUDE_DELTA,
                               }}
               title = { map.name } >
                </MapView.Marker>
              )
            })
         }

        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    
  },
  map: {
    height ,
    width
  },
});
