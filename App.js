import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import * as Location from 'expo-location';

export default function App() {
  const [region, setRegion] = useState(null); // set initial region to null
  const [bars, setBars] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // add state for search bar visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedBarCoordinate, setSelectedBarCoordinate] = useState(null);

  const handleSearchIconPress = () => {
    setShowSearchBar(true); // show the search bar
  };

  const handleSearchBarCancel = () => {
    setShowSearchBar(false); // hide the search bar
  };

  const handleSearch = () => {
    fetch(`http://192.168.1.108:3001/api/bars?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setBars(data);
        if (data.length > 0) {
          setSelectedBarCoordinate({
            latitude: data[0].location.coordinates[0],
            longitude: data[0].location.coordinates[1],
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0021,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221,
      });

      fetch('http://192.168.1.108:3001/api/bars')
        .then((response) => response.json())
        .then((data) => setBars(data))
        .catch((error) => console.error(error));
    })();
  }, []);

  // render the map only after the region state is set
  if (!region) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          containerStyle={styles.header}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: 'Find Places to go!',
            style: { color: '#fff' },
          }}
          rightComponent={
            <Icon name="search" color="#fff" onPress={handleSearchIconPress} />
          }
        />
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <Input
              placeholder="Search for your next drink spot!"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              autoFocus={true}
              containerStyle={styles.searchBarInputContainer}
              inputContainerStyle={styles.searchBarInput}
              leftIcon={<Icon name="search" color="#86939e" />}
              rightIcon={
                <Icon
                  name="close"
                  color="#86939e"
                  onPress={handleSearchBarCancel}
                />
              }
            />
          </View>
        )}
      </View>
      <MapView style={styles.map} region={selectedBarCoordinate || region}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: StatusBar.currentHeight + 32, // move the header up
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
  },
  searchBarInputContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
  },
  searchBarInput: {
    borderBottomWidth: 0,
  },
  header: {
    backgroundColor: '#f4511e',
    justifyContent: 'space-around',
  },
});
