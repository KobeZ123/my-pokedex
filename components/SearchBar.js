import axios from "axios";

import { BASE_API_URL } from "../utils/constants"

import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native"






export default function SearchBar() {
    const [search, setSearch] = useState("");

    // searches the pokemon that the user submits 
    async function handleSubmit() {
        console.log(`${BASE_API_URL}/pokemon/${search}`);
        try {
            const response = await axios.get(`${BASE_API_URL}/pokemon/${search}`);
            Alert.alert("success");
            console.log("success");
        }
        catch (error) {
            Alert.alert(error);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.search_bar_container}>
                <TextInput 
                    style={styles.search_input}
                    placeholder="search pokedex" 
                    value={search} 
                    onChangeText={(text) => {setSearch(text)}}
                    onSubmitEditing={handleSubmit}>
                </TextInput>
                <Button
                    title="Search"
                    onPress={handleSubmit}>
                </Button>
            </View>
            
            <Text>{search}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        display: "flex",
        alignItems: "center"
    },
    search_bar_container: {
        display: "flex",
        flexDirection: "row"
    },
    search_input: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: "center",
        placeholderTextColor: "#AAAAAA",
    }, 
})