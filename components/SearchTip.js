import axios from "axios";

import { BASE_API_URL } from "../utils/constants"

import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function SearchTip() {

    const [teddiursaData, setTeddiursaData] = useState(null);

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/pokemon/teddiursa`);
                setTeddiursaData(response.data);
            } catch (error) {
                console.log(error);
            }
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
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginHorizontal: 50,
    }, 
    text: {
        fontFamily: "Verdana",
        fontSize: 30,
        fontWeight: "500",
    },
    image: {
        width: '50%',
        maxWidth: 500,
        aspectRatio: 1/1,
    }
});