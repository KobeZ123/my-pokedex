import { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native"


export default function PokemonSearcher() {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.search_input}
                placeholder="search pokedex" 
                value={search} 
                onChangeText={(text) => {setSearch(text)}}>
            </TextInput>
            <Text>{search}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        display: "flex",
        alignItems: "center"
    },
    search_input: {
        backgroundColor: "#EEEEEE",
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: "center",
        placeholderTextColor: "#AAAAAA",
    }, 
})