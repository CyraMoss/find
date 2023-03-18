import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import geolib from 'geolib';

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
    region,
  } = props;

  const [suggestionsHeight, setSuggestionsHeight] = useState(0);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.1.108:3001/api/bars?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setSuggestionsHeight(data.length * 60);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
      setSuggestionsHeight(0);
    }
  }, [searchTerm]);

  const handleDistanceCalculation = (barLocation) => {
    const R = 6371; // earth radius in km
    const dLat =
      ((barLocation.coordinates[1] - region.latitude) * Math.PI) / 180;
    const dLon =
      ((barLocation.coordinates[0] - region.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((region.latitude * Math.PI) / 180) *
        Math.cos((barLocation.coordinates[1] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

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
          keyboardShouldPersistTaps: 'handled',
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
                <View style={styles.profilePictureContainer}>
                  <Avatar
                    size={40}
                    rounded
                    source={{ uri: item.profilepic }} // Add the profile picture source here
                    key={item.companyname}
                  />
                </View>
                <View style={styles.suggestionTextContainer}>
                  <Text style={styles.companyName}>{item.companyname}</Text>
                  <Text style={styles.address}>
                    {item.location.streetnumber} {item.location.streetname},{' '}
                    {item.location.suburb}, {item.location.city}
                  </Text>
                  {region && (
                    <Text style={styles.distance}>
                      {handleDistanceCalculation(item.location)} km away
                    </Text>
                  )}
                </View>
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
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  companyName: {
    fontWeight: 'bold',
  },
  address: {
    color: '#888',
  },
  suggestionItem: {
    height: 60,
    flexDirection: 'row', // Use flexbox to display profile picture on the left and text on the right
    alignItems: 'center', // Center the items vertically
    paddingHorizontal: 10,
  },
  profilePictureContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
  },
  suggestionTextContainer: {
    flex: 1, // Use flexbox to expand the text container to fill the remaining space
  },
  companyName: {
    fontWeight: 'bold',
  },
  address: {
    color: '#888',
  },
};
