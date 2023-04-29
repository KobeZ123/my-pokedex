import axios from "axios";

import { BASE_API_URL } from "../utils/constants"

import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function PokemonSearchTip() {

    const [teddiursaData, setTeddiursaData] = useState(null);

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/pokemon/teddiursa`);
                setTeddiursaData(response.data);
                // console.log(response.data.sprites.other["official-artwork"].front_default);
            } catch (error) {
                console.log(error);
            }
            // console.log(pokemonData.sprites.other["official-artwork"].front_default);
        }
        fetchPokemonInfo();
    }, [])

    function getTeddiursaImage(data) {

        if (data != null) {
            return data.sprites.other["official-artwork"].front_default;

        }
        return null;
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Try searching for your favorite Pokemon!
            </Text>
            <Image style={styles.image} source={{uri: (getTeddiursaImage(teddiursaData))}}/> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#D3D3D3",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
    }, 
    text: {
        fontFamily: "Orbitron",
        fontSize: 30,
        fontWeight: "500",
    },
    image: {
        width: '50%',
        aspectRatio: 1/1,
    }
});