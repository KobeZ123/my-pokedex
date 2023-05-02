import axios from "axios";

import { BASE_API_URL } from "../utils/constants";
import { View, StyleSheet, TextInput, Text, Button, Alert, Pressable, TouchableOpacity  } from "react-native";
import { useState, useEffect } from "react";

import CardView from "./CardView";
import PageView from "./PageView";
import SearchTip from "./SearchTip";




export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [resultUrl, setResultUrl] = useState();
    const [displayFullPage, setDisplayFullPage] = useState(false);

    // searches the pokemon that the user submits 
    function handleSubmit() {
        console.log(`${BASE_API_URL}/pokemon/${search}`);
        if (search != "") {
            setResultUrl(`${BASE_API_URL}/pokemon/${search}`);
        }
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
                <TouchableOpacity 
                    onPress={handleSubmit}
                    style={styles.search_button}> 
                    <Text style={styles.button_text}>Search</Text>
                </TouchableOpacity >
            </View>
            {!displayFullPage && resultUrl && <CardView data_url={resultUrl} click={handleCardClick}/> || !displayFullPage && <SearchTip />}
            {displayFullPage && resultUrl && <PageView data_url={resultUrl}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingVertical: 15,
    },
    search_bar_container: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
    },
    search_input: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: "center",
        placeholderTextColor: "#AAAAAA",
        fontSize: 32,
        fontFamily: "Verdana",
        borderRadius: 15,
        width: '80%',
    }, 
    search_button: {
        width: '20%',
        fontSize: 28,
        textAlign: 'center',
    }, 
    button_text: {
        fontSize: 28,
        fontWeight: 600,
        fontFamily: "Verdana",
        backgroundColor: "#3786ff",
        height: '100%',
        paddingVertical: 10,
        borderRadius: 15,
    }
});
