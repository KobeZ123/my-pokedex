import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BASE_API_URL } from './utils/constants';
import Pokeball from './components/Pokeball';
import SearchBar from './components/SearchBar';
import SearchTip from './components/SearchTip';
import CardView from './components/CardView';
import PageView from './components/PageView';

export default function App() {
 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pokeball />
      <SearchBar />
      {/* <CardView data_url={`${BASE_API_URL}/pokemon/piplup`}/>
      <PageView data_url={`${BASE_API_URL}/pokemon/gallade`}/> */}
      {/* <FullView data_url="https://pokeapi.co/api/v2/pokemon/garchomp"/> */}
      {/* <PokemonListView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      <PokemonFullView data_url="https://pokeapi.co/api/v2/pokemon/garchomp"/> */}
      {/* trying ralts double evolution */}
      {/* <EvolutionView url="https://pokeapi.co/api/v2/evolution-chain/140/"/> */}
      
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
