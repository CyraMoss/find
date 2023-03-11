import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import Autocomplete from 'react-native-autocomplete-input';

export default function SearchBar(props) {
  const {
    searchQuery,
    setSearchQuery,
    handleSearchBarCancel,
    setSearchTerm,
    searchTerm,
    setSuggestions,
    suggestions,
    setSelectedBarCoordinate,
    setBars,
  } = props;

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.1.108:3001/api/bars?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

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

  return (
    <View style={styles.searchBarContainer}>
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
              <Text>{item.companyname}</Text>
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
  },
  searchBarInput: {
    borderBottomWidth: 0,
  },
};
