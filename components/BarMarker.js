import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { Avatar, Text } from 'react-native-elements';

const BarMarker = ({
  bar,
  setSelectedBarCoordinate,
  setSearchQuery,
  setShowSearchBar,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handlePress = () => {
    if (showDescription) {
      setShowDescription(false);
      setSearchQuery('');
    } else {
      setSelectedBarCoordinate({
        latitude: bar.location.coordinates[0],
        longitude: bar.location.coordinates[1],
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      });
      setSearchQuery(bar.companyname);
      setShowSearchBar(false);
      setShowDescription(true);
    }
  };

  return (
    <Marker
      key={bar._id}
      coordinate={{
        latitude: bar.location.coordinates[0],
        longitude: bar.location.coordinates[1],
      }}
      title={bar.companyname}
      description={bar.bio}
      onPress={handlePress}
    >
      <Avatar
        size={40}
        rounded
        source={{ uri: bar.profilepic }} // Add the profile picture source here
        key={bar.companyname}
      />
      {showDescription && <Text style={{ fontSize: 16 }}>{bar.bio}</Text>}
    </Marker>
  );
};

export default BarMarker;
