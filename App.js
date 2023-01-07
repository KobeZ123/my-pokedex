import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pokeball from './components/Pokeball';
import { SearchPokemon } from './features/api_requests';
import PokemonSearcher from './components/PokemonSearcher';
import PokemonList from './components/PokemonList';
import PokemonListView from './components/PokemonListView';
import PokemonFullView from './components/PokemonFullView';

export default function App() {
 

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Pokeball />
      <PokemonSearcher/>
      {/* <PokemonList/> */}
      <PokemonListView data_url="https://pokeapi.co/api/v2/pokemon/piplup"/>
      <PokemonFullView data_url="https://pokeapi.co/api/v2/pokemon/garchomp"/>
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
