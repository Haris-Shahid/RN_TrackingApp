
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, Dimensions, ListView } from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios' ;
import List from '../components/common/places' ;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class NearBy extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1 ,r2)=> r1 !== r2
  }) ;
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      latitude: LATITUDE ,
      longitude: LONGITUDE,
      details:[]
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
        this.getNearbyPlaces();
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  getNearbyPlaces() {
    const { latitude , longitude} = this.state ;
    // console.log(latitude , longitude) ;
   
    let completeUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=cruise&key=AIzaSyC4VS9AdgDFFwC4XP6_AdLPGlq58OF0WfI`

    // console.log('url', completeUrl)
    axios.get(completeUrl)
    .then(
      response => {
          // console.warn('fetch nearby success', response.data.results);
          this.setState({
            details: response.data.results
          })
    })

    .catch(
    error => {
        console.log('fetch nearby error', error)
    })
  }


  render() {
    let dataSource = this.ds.cloneWithRows(this.state.details)
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
        <View style={styles.container1}>
        <ListView 
                dataSource = {dataSource}
                enableEmptySections={true}
                renderRow = {(details)=>(
                    <List seedetails={(name) => navigate('PlaceDetails' , name ) } name={details} />   
                ) }
             >
            </ListView>
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
    paddingLeft: 10 ,
    width: width - 50 ,
  }
});
