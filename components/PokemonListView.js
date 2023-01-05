import axios from "axios";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native";

// this component shows a list view of the Pokemon entry given the data url 
export default function PokemonListView(props) {
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
        <Text>Loading</Text> : 
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: (pokemonData.sprites.other["official-artwork"].front_default)}}/>    
            <Text style={styles.name_text}>{pokemonData.name}</Text>
            <PokemonTypeDisplay types={pokemonData.types} />
        </View>  
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
    container: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-around",
        textAlign: "center",
        width: '60%',
        backgroundColor: "#AAAAAA",
        padding: 15,
        borderRadius: 10,
        margin: 5,
        
    },
    name_text: {
        fontSize: 20, 
        fontWeight: "500",
        width: '60%',
        textAlign: "center",
    },
    image: {
        width: '10%',
        aspectRatio: 1/1,
        // mixBlendMode: "multiply"
    },
    type_text: {
        width: '30%',
        textAlign: "center",
        fontWeight: "400",
        fontSize: 20,
        fontStyle: "italic",
        color: "#EEEEEE"
    }
})