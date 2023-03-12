import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import HeaderComponent from '../components/Header';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <HeaderComponent
        title="Login"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        }
      />
    </View>
  );
}
