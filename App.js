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

import HeaderComponent from './components/Header';
import SearchBar from './components/SearchBar';

export default function App() {
  const [region, setRegion] = useState(null); // set initial region to null
  const [bars, setBars] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // add state for search bar visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showClearIcon, setShowClearIcon] = useState(false);

  const [selectedBarCoordinate, setSelectedBarCoordinate] = useState(null);

  const handleSearchBarCancel = () => {
    setShowSearchBar(false); // hide the search bar
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
      <View>
        <HeaderComponent
          showSearchBar={showSearchBar}
          setSearchQuery={setSearchQuery}
          setSearchTerm={setSearchTerm}
          setShowSearchBar={setShowSearchBar}
          setShowClearIcon={setShowClearIcon}
        />
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchBarCancel={handleSearchBarCancel}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              setSuggestions={setSuggestions}
              suggestions={suggestions}
              setSelectedBarCoordinate={setSelectedBarCoordinate}
              setBars={setBars}
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
  map: {
    flex: 1,
  },
});
