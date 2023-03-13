import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import Autocomplete from 'react-native-autocomplete-input';

export default function SearchBar(props) {
  const {
    searchQuery,
    setSearchQuery,
    setSearchTerm,
    searchTerm,
    setSuggestions,
    suggestions,
    setSelectedBarCoordinate,
    setBars,
    setShowSearchBar,
  } = props;

  const [suggestionsHeight, setSuggestionsHeight] = useState(0);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.1.108:3001/api/bars?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setSuggestionsHeight(data.length * 40);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
      setSuggestionsHeight(0);
    }
  }, [searchTerm]);

  const handleSuggestionPress = (item) => {
    const { coordinates } = item.location;
    setSelectedBarCoordinate(coordinates);
    // filter the bars based on the selected music type
    const filteredBars = bars.filter((bar) =>
      bar.musictype.includes(selectedMusicType)
    );
    setBars(filteredBars);
    setSearchQuery(item.companyname);
    setShowSearchBar(false);
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
        handleSearchBarCancel();
      })
      .catch((error) => console.error(error));
  };

  return (
    <View
      style={[styles.searchBarContainer, { height: 50 + suggestionsHeight }]}
    >
      <Autocomplete
        placeholder="Search for your next drink spot"
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
              }}
            >
              <View style={styles.suggestionItem}>
                <Text style={styles.companyName}>{item.companyname}</Text>
                <Text style={styles.address}>
                  {item.location.streetnumber} {item.location.streetname},{' '}
                  {item.location.suburb}, {item.location.city}{' '}
                  {item.location.postcode}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
}

const styles = {
  searchBarContainer: {
    backgroundColor: '#fff',
    height: 100,
  },
  searchBarInput: {
    borderRadius: 5,
  },
  searchBarInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 999,
  },
  suggestionItem: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  companyName: {
    fontWeight: 'bold',
  },
  address: {
    color: '#888',
  },
};
