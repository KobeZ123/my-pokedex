import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Pokeball from './components/Pokeball';
import PokemonSearchBar from './components/PokemonSearchBar';
import PokemonSearchTip from './components/PokemonSearchTip';
import PokemonCardView from './components/PokemonCardView';

export default function App() {
 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pokeball />
      <PokemonSearchBar/>
      <PokemonCardView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      {/* <PokemonListView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      <PokemonFullView data_url="https://pokeapi.co/api/v2/pokemon/garchomp"/> */}
      <PokemonSearchTip/>
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
