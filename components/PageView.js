import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

// renders the page data 
export default function PageView(props) {

    const [data, setData] = useState();
    const [statsList, setStatsList] = useState([]);

    const fetchData = () => {
        fetch(props.data_url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.stats);
                setData(data);
                data.stats.forEach((element) => {
                    setStatsList(statsList => [...statsList, [element.stat.name, element.base_stat]]);
                    console.log([element.stat.name, element.base_stat]);
                    console.log(statsList);
                });

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
            <View style={styles.pokedex_details}>
                <View style={styles.pokedex_left}>
                    <Image style={styles.image} source={{uri: (data.sprites.other["official-artwork"].front_default)}}/> 
                </View>
                <View style={styles.pokedex_right}>
                    <View style={styles.text_info_container}>
                        <Text style={[styles.text, styles.name_text]}>{data.name}</Text>
                        <View style={styles.index_info_container}>
                            <Text style={[styles.text, styles.index_hashtag]}>#</Text>
                            <Text style={[styles.text, styles.index_value]}>{data.game_indices[0].game_index}</Text>
                        </View>
                    </View>
                    <View style={styles.type_info_container}>
                        <Text style={styles.type_label_text}>Type:</Text>
                        {
                            (data.types.length == 1) ?
                            <Text style={styles.type_text}>{data.types[0].type.name}</Text> : 
                            <Text style={styles.type_text}>{data.types[0].type.name}/{data.types[1].type.name}</Text>
                        }
                    </View>
                    <View style={styles.type_info_container}>
                        {statsList.length == 0 ? <Text style={styles.loading}>Empty</Text> :
                            <View>
                                {statsList.map((stat_line) => 
                                    <View style={styles.stat_line_container}>
                                        <Text style={styles.ability_text}>{stat_line[0]}</Text>
                                        <Text style={styles.ability_text}>{stat_line[1]}</Text>
                                    </View>
                                )}
                            </View>
                        }
                    </View>
                </View>
                
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
    }, 
    text: {
        fontFamily: "Orbitron",
    },
    pokedex_details: { 
        display: "flex", 
        flexDirection: "row",
        marginHorizontal: 50, 
    },
    pokedex_left: {
        flex: 1,
        paddingHorizontal: 15, 
    },
    pokedex_right: {
        flex: 1,
        paddingHorizontal: 15, 
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
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    name_text: {
        fontWeight: "600",
        fontSize: 24,
    }, 
    index_info_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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
    type_info_container: {
        textAlign: "center",
    },
    type_label_text: {
        fontWeight: "400",
        fontSize: 18,
    },
    type_text: {
        fontWeight: "500",
        fontSize: 18,
    }, 
    ability_text: {
        marginHorizontal: 3,
        marginVertical: 1,
    },
    stat_line_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
}); 