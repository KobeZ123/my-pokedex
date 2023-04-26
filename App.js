import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Pokeball from './components/Pokeball';
import SearchBar from './components/SearchBar';
import SearchTip from './components/SearchTip';
import CardView from './components/CardView';

export default function App() {
 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pokeball />
      <SearchBar/>
      <CardView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      {/* <PokemonListView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      <PokemonFullView data_url="https://pokeapi.co/api/v2/pokemon/garchomp"/> */}
      <SearchTip/>
    </View>
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
