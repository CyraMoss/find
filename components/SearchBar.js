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
    </View>
  );
};

const styles = {
  searchBarContainer: {
    backgroundColor: '#fff',
  },
  searchBarInput: {
    borderBottomWidth: 0,
  },
};

export default SearchBar;
