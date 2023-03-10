import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

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
    <MapView
      style={styles.map}
      region={selectedBarCoordinate || currentLocation || region}
    >
      <Marker
        coordinate={region}
        title={'Marker Title'}
        description={'Marker Description'}
      />
      {bars.map((bar) => (
        <Marker
          key={bar._id}
          coordinate={{
            latitude: bar.location.coordinates[0],
            longitude: bar.location.coordinates[1],
          }}
          title={bar.companyname}
          description={bar.bio}
          onPress={() => {
            setSelectedBarCoordinate({
              latitude: bar.location.coordinates[0],
              longitude: bar.location.coordinates[1],
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0221,
            });
          }}
        />
      ))}
    </MapView>
  );
};

const styles = {
  map: {
    flex: 1,
  },
};

export default Map;
