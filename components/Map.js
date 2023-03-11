import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import BarMarker from './BarMarker';

const Map = ({ region, bars, selectedBarCoordinate }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLocationAsync();
  }, []);

  return (
    <MapView style={styles.map} region={selectedBarCoordinate || region}>
      <Marker
        coordinate={region}
        title={'your location'}
        description={'go to your nearest bar and get a drink!'}
      />
      <BarMarker />
    </MapView>
  );
};

const styles = {
  map: {
    flex: 1,
  },
};

export default Map;
