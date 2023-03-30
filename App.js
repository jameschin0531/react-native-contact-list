import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { PRIMARY_COLOR } from './assets/constant';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Contacts',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="search"
                size={30}
                color={PRIMARY_COLOR}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="add"
                size={30}
                color={PRIMARY_COLOR}
              />
            ),
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
