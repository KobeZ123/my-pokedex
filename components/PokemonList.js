import { useEffect, useState } from "react"
import axios from 'axios'
import { View, Text, StyleSheet } from "react-native";
import PokemonListView from "./PokemonListView";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
        const fetchPokemon = async () => {
            const response = await axios.get(BASE_URL);
            console.log(response.data.results);
            setPokemonList(response.data.results);
        }
        fetchPokemon();
    }, [])

    const numbers = [1, 2, 3, 4, 5]

    return (
        <View style={styles.container}>
            {pokemonList.length == 0 ? <Text>Empty</Text> : 
            pokemonList.map((item) => 
                <PokemonListView data_url={item.url} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    }
})