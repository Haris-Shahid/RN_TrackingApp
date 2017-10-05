
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, ListView } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements' ;
import getDirections from 'react-native-google-maps-directions' ;
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoder';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
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
      latitude: LATITUDE ,
      longitude: LONGITUDE,
      latitudedes: 0,
      longitudedes: 0 ,
      address: '' 
    }
  }

  componentDidMount() {
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
          latitude ,
          longitude ,
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
findplace(){
  const { address } = this.state ;
  Geocoder.geocodeAddress(address).then(res => {
    console.log(res)
    var latitude = res[0].position.lat ;
    var longitude = res[0].position.lng ;
  
    this.setState({
      region:{
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      latitudedes: latitude ,
      longitudedes: longitude
    })
  })
    .catch(err => console.log(err))
}

direction(){
  const {latitude, longitude ,latitudedes, longitudedes } = this.state ;
    const data = {
                  source: {
                  latitude,
                  longitude
                },
                destination: {
                  latitude: latitudedes ,
                  longitude: longitudedes
                },
                params: [
                  {
                    key: "dirflg",
                    value: "w"
                  }
                ]
   }
      getDirections(data) ;
}


  render() {
    const { navigate } = this.props.navigation;
     return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsPointOfInternet={false}
          toolbarEnabled={true}
          style={styles.map}
          region={this.state.region}
          provider= "google"
          mapType="standard"
         >
          <MapView.Marker
            coordinate={this.state.region}
          >
          </MapView.Marker>
        </MapView>
        <View>
        <TextInput
                style={styles.input}
                value={this.state.address}
                placeholder= {'type your Destination and please use first letter in Capital'}
                onChangeText={(address)=> this.setState({address}) }
                onSubmitEditing={() => this.findplace() }
            />
            <Button
                    title='Get Direction in Browser'
                    backgroundColor = 'blue'
                    borderRadius = {10}
                    containerViewStyle={{borderRadius:10}}
                    onPress={this.direction.bind(this)} />
            <Button
                    title='Get Near By Places'
                    backgroundColor = 'blue'
                    borderRadius = {10}
                    containerViewStyle={{borderRadius:10}}
                    onPress={() => navigate('NearBy')} />
            <Button
                    title='For Navigation'
                    backgroundColor = 'blue'
                    borderRadius = {10}
                    containerViewStyle={{borderRadius:10}}
                    onPress={() => navigate('MapNav')} />


        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
  },
  map: {
    marginTop:10,
    height: 350 ,
    width:width-50
  },
  container1:{
    flex:1,
   marginTop:10
  },
  pin: {
    backgroundColor: "#fffa",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  pinImage: {
    width: 20,
    height: 20
  },
  pinText: {
    color: 'red'
  },
  callout: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginRight: 10
  },
  calloutPhoto: {
    flex: 1,
    width: 200,
    height: 80
  },
  calloutTitle: {
    fontSize: 16
  },
  input: {
    height: 60,
    width: width - 50 ,
  },
});
