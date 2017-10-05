import React, { Component } from 'react'
import {TextInput,Button, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import getDirections from 'react-native-google-maps-directions'
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Geocoder from 'react-native-geocoder';
import RNGooglePlaces from 'react-native-google-places';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapSc extends Component {
  static navigationOptions = {
    header : false
  }
  constructor(props) {
    super(props);
    // console.disableYellowBox = true;
    this.getDirections = this.getDirections.bind(this);
    this.getDirectionRoute = this.getDirectionRoute.bind(this);
    this.getLatLong = this.getLatLong.bind(this);
    this.getDirectin_handler = this.getDirectin_handler.bind(this);
    
    this.state = {
      region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
      destlat:null,
      destlong: null,
      srclat: LATITUDE,
      srclong: LONGITUDE,
      dest: '',
      address: '' ,
      coords: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var srclat = position.coords.latitude ;
        var srclong = position.coords.longitude ; 
        var region = {
            latitude: srclat ,
            longitude: srclong,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
      this.setState({ region, srclat, srclong })
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getDirectionRoute() {
    let arr1 = `${this.state.srclat}`+','+`${this.state.srclong}`
    let arr2 = `${this.state.destlat}`+','+`${this.state.destlong}`
    this.getDirections(arr1, arr2);
    this.getDirectin_handler(arr1, arr2);
    // console.log(arr1, arr2)
  }


  getLatLong() {
      const {address} = this.state ;
    //   console.log(address) ;
    Geocoder.geocodeAddress(address).then(res => {
      console.log(res[0].position.lat,res[0].position.lng)
        this.setState({
        destlat: res[0].position.lat,
        destlong: res[0].position.lng
      });
    
     
    })
      .catch(err => console.log(err))
  }

  async getDirections(startLoc, destinationLoc) {
    console.log(startLoc,destinationLoc)
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      return coords
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getDirectin_handler() {
    // console.log('get direc success')
        try {
          let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
          let completeUrl = `${url}${this.state.srclat},${this.state.srclong}&destination=${this.state.destlat},${this.state.destlong}`;
          console.log('url', completeUrl)    
          let resp = await fetch(completeUrl)
          let respJson = await resp.json();
          let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          let coords = points.map((point, index) => {
            return {
              latitude: point[0],
              longitude: point[1]
            }
          })
    
          this.setState({
            coords: coords
          })
          // this.props.success_direction(coords);
    
          return coords
        } catch (error) {
          console.log('get dir error', error);
        }
      }
    

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
            destlat: place.latitude,
            destlong: place.longitude
        })
      // console.log('nav state', this.state )
      })
      .then(() =>  {
        this.getDirectin_handler();
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View>
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
        />
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red" />
        </MapView>
        <View>
        <TextInput
                value={this.state.address}
                placeholder= {'type your Destination and please use first letter in Capital'}
                onChangeText={(address)=> this.setState({address}) }
                onSubmitEditing={() => this.getLatLong() }
            />
        <Button onPress={this.getDirectionRoute} title='Get Direction Route' ></Button>
        <Button title="Give your destination" onPress={() => this.openSearchModal()} 
          color="#373F46"
            />
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
    map: {
        marginTop:10,
        height: 350 ,
        width:Dimensions.get('window').width-50
      },
  
});

