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
    const [returnUrl, setReturnUrl] = useState();

    // searches the pokemon that the user submits 
    function handleSubmit() {
        if (search != "") {
            setResultUrl(`${BASE_API_URL}/pokemon/${search.toLowerCase()}`);
        }
    }

    function handleCardClick() {
        setDisplayFullPage(true);
        setReturnUrl(resultUrl);
    }

    function onChangeText(text) {
        setSearch(text);
        if (text == "") {
            setResultUrl(null);
            setReturnUrl(null);
        }
    }

    function handleReturnClick() {
        setDisplayFullPage(false);
        setResultUrl(returnUrl);
    }

    // sets the result url to the pokemon's endpoint
    function routeTo(pokemon) {
        setResultUrl(`${BASE_API_URL}/pokemon/${pokemon.toLowerCase()}`);
    }

    useEffect(() => {
    }, [resultUrl]);

    return (
        <View style={styles.container}>
            {!displayFullPage &&
                <View style={styles.search_bar_container}>
                    <TextInput 
                        style={styles.search_input}
                        placeholder="search pokedex" 
                        value={search} 
                        onChangeText={(text) => {onChangeText(text)}}
                        onSubmitEditing={handleSubmit}>
                    </TextInput>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        style={styles.search_button}> 
                        <Text style={styles.button_text}>Search</Text>
                    </TouchableOpacity >
                </View>
            }
            {!displayFullPage && resultUrl && <CardView data_url={resultUrl} click={handleCardClick}/> || !displayFullPage && <SearchTip />}
            {displayFullPage && resultUrl && <PageView data_url={resultUrl} clickReturn={handleReturnClick} routeTo={routeTo}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingVertical: 15,
        width: '100%',
    },
    search_bar_container: {
        display: "flex",
        flexDirection: "column",
        width: '80%',
        alignItems: 'center',
    },
    search_input: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 5,
        paddingVertical: 15,
        textAlign: "center",
        placeholderTextColor: "#AAAAAA",
        fontSize: 24,
        fontFamily: "Verdana",
        borderRadius: 15,
        marginBottom: 5, 
        width: '100%',
    }, 
    search_button: {
        fontSize: 24,
        textAlign: 'center',
        width: '100%',
    }, 
    button_text: {
        fontSize: 24,
        fontWeight: 550,
        fontFamily: "Verdana",
        backgroundColor: "#3786ff",
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 15,
        
    }
});
