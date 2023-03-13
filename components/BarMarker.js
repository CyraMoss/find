import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';

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
    >
      <Image
        source={{ uri: bar.profilepic }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    </Marker>
  );
};

export default BarMarker;
