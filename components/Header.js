import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const AppHeader = ({ handleSearchIconPress }) => {
  return (
    <Header
      containerStyle={styles.header}
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{
        text: 'Find Places to go!',
        style: { color: '#fff' },
      }}
      rightComponent={
        <Icon name="search" color="#fff" onPress={handleSearchIconPress} />
      }
    />
  );
};

const styles = {
  header: {
    backgroundColor: '#f4511e',
    justifyContent: 'space-around',
    marginTop: StatusBar.currentHeight + 32, // move the header up
  },
};

export default AppHeader;
