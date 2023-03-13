import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Home from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import Filter from './screens/FilterOptionsScreen';

import HeaderComponent from './components/Header';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              header: () => <HeaderComponent navigation={navigation} />,
            })}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Filter" component={Filter} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
