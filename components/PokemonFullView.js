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
        <ScrollView contentContainerStyle={styles.main_container}>
            <Text style={styles.name_text}>{pokemonData.name}</Text>
            <Image style={styles.image} source={{uri: (pokemonData.sprites.other["official-artwork"].front_default)}}/>    
            <PokemonTypeDisplay types={pokemonData.types} />
            <PokemonAbilityDisplay abilities={pokemonData.abilities} />
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

// this component displays the abilities of the Pokemon
function PokemonAbilityDisplay(props) {
    const [abilities, setAbilities] = useState([]);
    const [hiddenAbilities, setHiddenAbilities] = useState([]);

    useEffect(() =>{
        // sort abilities by normal and hidden abilities
        for (let i = 0; i < props.abilities.length; i++) {
            if (props.abilities[i].is_hidden == true) {
                console.log(props.abilities[i].ability.name);
                setHiddenAbilities(abilities => [...abilities, props.abilities[i].ability.name]);
            } else {
                setAbilities(abilities => [...abilities, props.abilities[i].ability.name]);
                console.log(props.abilities[i]);
            }
        }
    }, [])

    return (
        <View style={styles.centered_container}>
            <Text style={styles.statistic_font}>Abilities:</Text>
            {abilities.length == 0 && hiddenAbilities.length == 0 ? <Text>Empty</Text> : 
                <View>
                    <View style={styles.ability_container}>{abilities.map((ability) => <Text style={styles.ability_text}>{ability}</Text>)}</View>
                    <View style={styles.centered_container}>{hiddenAbilities.map((ability) => <Text style={styles.ability_text}>{ability}</Text>)}</View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        textAlign: "center", 
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Roboto",
    },
    centered_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    main_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: "#AAAAAA",
        padding: 15,
        borderRadius: 15,
    },
    name_text: {
        fontSize: 25, 
        fontWeight: "500",
        width: '100%',
        textAlign: "center",
    },
    image: {
        width: '80%',
        aspectRatio: 1/1,
    },
    type_text: {
        width: '100%',
        textAlign: "center",
        fontWeight: "400",
        fontSize: 20,
        fontStyle: "italic",
        color: "#EEEEEE"
    },
    statistic_font: {
        fontSize: 15, 
        width: '100%',
        fontWeight: "500",
        textAlign: "center",
    },
    ability_container: {
        display: "flex",
        flexDirection: "row",
    },
    ability_text: {
        marginHorizontal: 3,
        marginVertical: 1,
    }
    
})