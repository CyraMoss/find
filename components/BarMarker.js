import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BarMarker = () => {
  return (
    <View>
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
            setSearchQuery(bar.companyname); // set search query to bar's name
            setShowSearchBar(false);
          }}
        />
      ))}
    </View>
  );
};

export default BarMarker;

const styles = StyleSheet.create({});
