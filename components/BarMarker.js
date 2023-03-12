import React from 'react';
import { Marker } from 'react-native-maps';

const BarMarker = ({
  bar,
  setSelectedBarCoordinate,
  setSearchQuery,
  setShowSearchBar,
}) => {
  return (
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
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        });
        setSearchQuery(bar.companyname);
        setShowSearchBar(false);
      }}
    />
  );
};

export default BarMarker;
