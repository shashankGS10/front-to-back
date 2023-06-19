import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PokemonListSF from './src/screens/PokemonScreenSyncFetch';
import PokemonListAF from './src/screens/PokemonScreenAsyncFetch';
import PokemonListAA from "./src/screens/PokemonScreenAsyncAxios"; 
import PokemonListSA from "./src/screens/PokemonScreenSyncAxios"; 
import ErrorHandle from './src/screens/ErrorHandling'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Fetch" component={PokemonListSF} />
        <Stack.Screen name="Axios" component={PokemonListSA} />
        <Stack.Screen name="AsyncFetch" component={PokemonListAF} />
        <Stack.Screen name="AsyncAxios" component={PokemonListAA} />
        <Stack.Screen name="ErrorDay" component={ErrorHandle} />
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

export default App;