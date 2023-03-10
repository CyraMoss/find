import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

import { fetchBars } from '../services/api';

export default function Home() {
  const [showSearchBar, setShowSearchBar] = useState(false); // add state for search bar visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [bars, setBars] = useState([]);
  const [region, setRegion] = useState(null); // set initial region to null

  const handleSearch = async (query) => {
    try {
      const data = await fetchBars(query);
      setBars(data);
    } catch (error) {
      console.error(error);
    }
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

  const handleSearchIconPress = () => {
    setShowSearchBar(true); // show the search bar
  };

  const handleSearchBarCancel = () => {
    setShowSearchBar(false); // hide the search bar
  };

  return (
    <View>
      <Header handleSearchIconPress={handleSearchIconPress} />
      {showSearchBar && (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchBarCancel={handleSearchBarCancel}
          onSearch={handleSearch}
        />
      )}
      <Map bars={bars} />
    </View>
  );
}
