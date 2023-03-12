import { View, StatusBar, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HeaderComponent(props) {
  const {
    showSearchBar,
    setShowClearIcon,
    setShowSearchBar,
    setSearchTerm,
    setSearchQuery,
    navigation,
  } = props;

  const handleClearIconPress = () => {
    setSearchQuery('');
    setSearchTerm('');
    setShowClearIcon(false);
    setShowSearchBar(false);
  };

  const handleSearchIconPress = () => {
    setShowSearchBar(true); // show the search bar
    setShowClearIcon(true); // show search icon or x icon
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ marginTop: StatusBar.currentHeight + 32 }}>
      <Header
        containerStyle={{
          backgroundColor: '#f4511e',
          justifyContent: 'space-around',
        }}
        leftComponent={{ icon: 'menu', onPress: () => navigation.openDrawer() }}
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
});
