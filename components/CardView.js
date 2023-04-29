import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

import "../fonts/Orbitron.ttf";

// renders the card data 
export default function CardView(props) {

    const [data, setData] = useState();

    const fetchData = () => {
        fetch(props.data_url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

  
    return (
        (data == null) ? 
        <View style={styles.container}>
            <Text style={styles.text}>Loading . . .</Text> 
        </View>: 
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: (data.sprites.other["official-artwork"].front_default)}}/> 
            <View style={styles.text_info_container}>
                <Text style={[styles.text, styles.name_text]}>{data.name}</Text>
                <View style={styles.index_info_container}>
                    <Text style={[styles.text, styles.index_hashtag]}>#</Text>
                    <Text style={[styles.text, styles.index_value]}>{data.game_indices[0].game_index}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: 200,
        paddingBottom: 8,
        paddingHorizontal: 5,
    }, 
    text: {
        fontFamily: "Orbitron",
    },
    image: {
        aspectRatio: 1/1,
        mixBlendMode: "multiply",
        backgroundColor: "gainsboro",
        borderRadius: 5,
    },
    text_info_container: {
        paddingVertical: 5,
        paddingLeft: 10, 
    },
    name_text: {
        fontWeight: "600",
        fontSize: 24,
    }, 
    index_info_container: {
        display: "flex",
        flexDirection: "row",
    }, 
    index_hashtag: {
        color: "dimgrey",
        fontWeight: "600",
        fontSize: 18,
    },
    index_value: {
        color: "dimgrey",
        fontWeight: "600",
        fontSize: 18,
    },
}); 