import React from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'react-native-elements';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleSearchBarCancel,
}) => {
  return (
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
          <Icon name="close" color="#86939e" onPress={handleSearchBarCancel} />
        }
      />
    </View>
  );
};

const styles = {
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
};

export default SearchBar;
