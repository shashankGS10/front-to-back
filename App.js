import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PokemonListSF from './src/screens/PokemonScreenSyncFetch';
import PokemonListAF from './src/screens/PokemonScreenAsyncFetch';
import PokemonListAA from "./src/screens/PokemonScreenAsyncAxios"; 
import PokemonListSA from "./src/screens/PokemonScreenSyncAxios"; 
import ErrorHandle from './src/screens/ErrorHandling';
import ChatApp from './src/screens/chatApp';
import CrudComponent from './src/screens/CurdComponent'

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
        <Stack.Screen name="Chat" component={ChatApp} />
        <Stack.Screen name="Crud" component={CrudComponent} />
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
// Component Hierarchy => App.js is entry point where we are creating Routs to navigate over app
// Data Fetching and Rendering Data => Show API call on codes and explain how Data is being used to generate UI. File - src/screens/PokemonScreenSyncAxios.js
// State Management and Event handling => explain how useState works and go throught code to explain how we are canging state
// Styling => Explain StyleSheet and Inline styling