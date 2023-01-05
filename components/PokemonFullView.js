import axios from "axios";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-web";

// this component displays the full Pokemon information 
export default function PokemonFullView(props) {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            console.log(props.data_url);
            try {
                const response = await axios.get(props.data_url);
                setPokemonData(response.data);
                console.log(response.data.sprites.other["official-artwork"].front_default);
            } catch (error) {
                console.log(error);
            }
            // console.log(pokemonData.sprites.other["official-artwork"].front_default);
        }
        fetchPokemonInfo();
    }, [])

    return ( 
        (pokemonData == null) ? 
        <Text style={styles.loading}>Loading</Text> : 
        <ScrollView style={styles.container}>
            <Text style={styles.name_text}>{pokemonData.name}</Text>
            <Image style={styles.image} source={{uri: (pokemonData.sprites.other["official-artwork"].front_default)}}/>    
            <PokemonTypeDisplay types={pokemonData.types} />
        </ScrollView>  
    )
}

// this component displays the image of the Pokemon type
function PokemonTypeDisplay(props) { 

    useEffect(() => {console.log(props.types[0].type.name)})
    return (
        (props.types.length == 1) ?
        <Text style={styles.type_text}>{props.types[0].type.name}</Text> : 
        <Text style={styles.type_text}>{props.types[0].type.name}/{props.types[1].type.name}</Text>
    )
}

const styles = StyleSheet.create({
    loading: {
        textAlign: "center", 
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Roboto",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    image: {
        width: '80%',
        aspectRatio: 1/1,
    },
    
})