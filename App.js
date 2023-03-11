import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { Feather } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import * as Location from 'expo-location';

export default function App() {
  const [region, setRegion] = useState(null); // set initial region to null
  const [bars, setBars] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // add state for search bar visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showClearIcon, setShowClearIcon] = useState(false);

  const [selectedBarCoordinate, setSelectedBarCoordinate] = useState(null);

  const handleSearchIconPress = () => {
    setShowSearchBar(true); // show the search bar
    setShowClearIcon(true); // show search icon or x icon
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

  const handleClearIconPress = () => {
    setSearchQuery('');
    setSearchTerm('');
    setShowClearIcon(false);
    setShowSearchBar(false);
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

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.1.108:3001/api/bars?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

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
            <>
              {showSearchBar ? (
                <Icon
                  name="x"
                  type="feather"
                  color="#fff"
                  onPress={handleClearIconPress}
                />
              ) : (
                <Icon
                  name="search"
                  color="#fff"
                  onPress={handleSearchIconPress}
                />
              )}
            </>
          }
        />
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <Autocomplete
              placeholder="Search for your next drink spot!"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setSearchTerm(text);
              }}
              onSubmitEditing={handleSearch}
              autoFocus={true}
              containerStyle={styles.searchBarInputContainer}
              inputContainerStyle={styles.searchBarInput}
              data={suggestions}
              flatListProps={{
                keyExtractor: (item, index) => index.toString(),
                keyboardShouldPersistTaps: 'always',
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery(item.companyname);
                      setSelectedBarCoordinate({
                        latitude: item.location.coordinates[0],
                        longitude: item.location.coordinates[1],
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0221,
                      });
                      setShowSearchBar(false);
                      3;
                    }}
                  >
                    <Text>{item.companyname}</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </View>
        )}
      </View>
      <MapView style={styles.map} region={selectedBarCoordinate || region}>
        <Marker
          coordinate={region}
          title={'your location'}
          description={'go to your nearest bar and get a drink!'}
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
              setSearchQuery(bar.companyname); // set search query to bar's name
              setShowSearchBar(false);
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
    height: 100,
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
