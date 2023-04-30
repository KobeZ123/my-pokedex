import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

import "../styles/page_view_styles.css"

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
        <div className="page_container">
            <p className="text">Loading . . .</p> 
        </div>: 
        <div className="page_container">
            <div className="pokedex_details">
                <div className="pokedex_left">
                    <img className="image" src={data.sprites.other["official-artwork"].front_default}/> 
                </div>
                <div className="pokedex_right">
                    <div className="text_info_container">
                        <p className="text name_text">{data.name}</p>
                        <div className="index_info_container">
                            <p className="text index_hashtag">#</p>
                            <p className="text index_value">{data.game_indices[0].game_index}</p>
                        </div>
                    </div>
                    <div className="type_info_container">
                        <p className="type_label_text">Type:</p>
                        {
                            (data.types.length == 1) ?
                            <p className="type_text">{data.types[0].type.name}</p> : 
                            <p className="type_text">{data.types[0].type.name}/{data.types[1].type.name}</p>
                        }
                    </div>
                    <div className={styles.type_info_container}>
                        {statsList.length == 0 ? <p style={styles.loading}>Empty</p> :
                            <div>
                                {statsList.map((stat_line) => 
                                    <div className="stat_line_container">
                                        <p className="ability_text">{stat_line[0]}</p>
                                        <p className="ability_text">{stat_line[1]}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div> 
            </div>  
        </div>
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
        marginHorizontal: 30, 
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