import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import BarInfoCard from '../components/BarInfoCard';

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

  const [selectedBar, setSelectedBar] = useState(null);

  return (
    <>
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
            setSelectedBar={setSelectedBar}
          />
        ))}
      </MapView>
      {selectedBar && (
        <BarInfoCard bar={selectedBar} onClose={() => setSelectedBar(null)} />
      )}
    </>
  );
}

const styles = {
  map: {
    flex: 1,
  },
};
