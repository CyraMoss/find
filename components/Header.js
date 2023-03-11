import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import React, { useEffect } from 'react';

import Autocomplete from 'react-native-autocomplete-input';

export default function HeaderComponent(props) {
  const {
    showSearchBar,
    handleSearchIconPress,
    handleClearIconPress,
    searchQuery,
    setSearchQuery,
    handleSearchBarCancel,
    handleSearch,
    setSuggestions,
    suggestions,
    searchTerm,
    setSearchTerm,
    setSelectedBarCoordinate,
  } = props;

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.1.108:3001/api/bars?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          console.log(Array.isArray(data)); // check if data is an array
          console.log(data); // log the contents of data
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <View style={{ marginTop: StatusBar.currentHeight + 32 }}>
      <Header
        containerStyle={{
          backgroundColor: '#f4511e',
          justifyContent: 'space-around',
        }}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: StatusBar.currentHeight + 32, // move the header up
  },
  header: {
    backgroundColor: '#f4511e',
    justifyContent: 'space-around',
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    height: 100,
  },
  searchBarInputContainer: {
    backgroundColor: 'purple',
    borderRadius: 5,
  },
});
