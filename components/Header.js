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

import SearchBar from './SearchBar';

export default function HeaderComponent(props) {
  const {
    showSearchBar,
    handleSearchIconPress,
    setShowClearIcon,
    setShowSearchBar,
    searchQuery,
    setSearchQuery,
    handleSearchBarCancel,
    handleSearch,
    setSuggestions,
    suggestions,
    searchTerm,
    setSearchTerm,
    setSelectedBarCoordinate,
    setBars,
  } = props;

  const handleClearIconPress = () => {
    setSearchQuery('');
    setSearchTerm('');
    setShowClearIcon(false);
    setShowSearchBar(false);
  };

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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
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
