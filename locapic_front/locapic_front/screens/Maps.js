import React from 'react';
import { Location, Permissions } from 'expo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { StyleSheet, Text, View } from 'react-native';

//bonjour c'est yoan j'espere quez vous allez bien

export default class App extends React.Component {

  constructor(){
    super()
//position par defaut de la map
    this.state=({
      location:{
        latitude: 43.78825,
        longitude: 2.4324,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    })
  }
//avant le chargement de l'appli lance la fonction _getLocationAsync
  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    //demande au user la permission
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {}

   //position du user via le gps
   let location = await Location.getCurrentPositionAsync({});
   this.setState({location: location.coords});
   Expo.Location.watchPositionAsync({}, (location) => {
     this.setState({location: location.coords});
   });

   //mise en place d'un objet pour ajouter "latitudeDelta: 1,longitudeDelta: 1" en plus des position recup par la variable 'location'

   var region = {
     latitude: location.coords.latitude,
     longitude: location.coords.longitude,
     latitudeDelta: 1,
     longitudeDelta: 1,
   }

   //mise ajour de l'etat avec la new position
   this.setState({ location:region });

   //mise a jour du meme etat de maniere reguliere grace au "watchPositionAsync"
  Location.watchPositionAsync({}, (location)=>{
      this.setState({ location:location.coords });
   })
  };



  render() {
    var  mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
    ]
    return (

      <MapView
      style={{ flex: 1 }}
        initialRegion={this.state.location}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={this.state.location}>

        <MapView.Marker
          coordinate={this.state.location}
        />

        </MapView>
    );
  }
}
