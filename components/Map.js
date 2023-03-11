import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import BarMarker from './BarMarker';

export default function BarMap(props) {
  const {
    bars,
    setSelectedBarCoordinate,
    setSearchQuery,
    setShowSearchBar,
    region,
    selectedBarCoordinate,
  } = props;

  return (
    <MapView style={styles.map} region={selectedBarCoordinate || region}>
      <Marker
        coordinate={region}
        title={'your location'}
        description={'go to your nearest bar and get a drink!'}
      />
      {bars.map((bar) => (
        <BarMarker
          key={bar._id}
          bar={bar}
          setSelectedBarCoordinate={setSelectedBarCoordinate}
          setSearchQuery={setSearchQuery}
          setShowSearchBar={setShowSearchBar}
        />
      ))}
    </MapView>
  );
}

const styles = {
  map: {
    flex: 1,
  },
};
