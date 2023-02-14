import { StyleSheet, Text, View } from 'react-native';

import "../index.css"
import "../fonts/Orbitron.ttf"

export default function PokemonListViewLoading() {
    return (
        <View style={styles.container}> 
            <Text style={styles.loading_text}>Loading . . . </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        width: '80%', 
        backgroundColor: "#AAAAAA",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
    }, 
    loading_text: {
        fontFamily: "Orbitron",
        fontSize: 40,
        fontWeight: "500",
    },
});