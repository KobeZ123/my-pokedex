import axios from "axios";

import { BASE_API_URL } from "../utils/constants";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { useState, useEffect } from "react";

import CardView from "./CardView";
import PageView from "./PageView";




export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [resultUrl, setResultUrl] = useState();
    const [displayFullPage, setDisplayFullPage] = useState(false);

    // searches the pokemon that the user submits 
    function handleSubmit() {
        console.log(`${BASE_API_URL}/pokemon/${search}`);
        setResultUrl(`${BASE_API_URL}/pokemon/${search}`);
    }

    function handleCardClick() {
        setDisplayFullPage(true);
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
            {!displayFullPage && resultUrl && <CardView data_url={resultUrl} click={handleCardClick}/>}
            {displayFullPage && resultUrl && <PageView data_url={resultUrl}/>}
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
});
