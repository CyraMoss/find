import { View, StatusBar, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Menu } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';

export default function HeaderComponent(props) {
  const {
    showSearchBar,
    setShowClearIcon,
    setShowSearchBar,
    setSearchTerm,
    setSearchQuery,
    setShowFilterOptions,
    showFilterOptions,
  } = props;

  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);

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

  const handleMenuIconPress = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleLoginPress = () => {
    navigation.navigate('BarSignUp');
    setMenuVisible(false);
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
    setMenuVisible(false);
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter');
    setShowClearIcon(false);
    setShowSearchBar(false);
  };

  return (
    <View>
      <Header
        containerStyle={{
          backgroundColor: 'black',
          justifyContent: 'space-around',
        }}
        leftComponent={
          <Icon
            name="menu"
            type="feather"
            color="#fff"
            onPress={handleMenuIconPress}
          />
        }
        centerComponent={{
          text: 'Find Places to go!',
          style: { color: '#fff' },
        }}
        rightComponent={
          <>
            {showSearchBar ? (
              <>
                <Icon
                  name="close"
                  color="#fff"
                  onPress={() => {
                    setShowSearchBar(!showSearchBar);
                    setShowFilterOptions(false); // <-- add this line
                  }}
                />
                <Icon
                  name="filter-list"
                  color="#fff"
                  onPress={() => {
                    setShowFilterOptions(!showFilterOptions); // <-- add this line
                    setShowSearchBar(false);
                  }}
                />
              </>
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
      <Menu
        visible={menuVisible}
        onDismiss={handleMenuClose}
        anchor={
          <Icon
            name="x"
            type="feather"
            color="#fff"
            onPress={handleMenuIconPress}
          />
        }
      >
        <Menu.Item onPress={handleHomePress} title="Home" />
        <Menu.Item onPress={handleLoginPress} title="Login" />
      </Menu>
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
