import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";

import "../styles/page_view_styles.css"

// renders the page data 
export default function PageView(props) {

    const [data, setData] = useState();
    const [statsList, setStatsList] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [dataObject, setDataObject] = useState({});
    const [evolutionUrl, setEvolutionUrl] = useState("");

    const fetchData = () => {
        fetch(props.data_url).then(response => {
            return response.json();
        }).then(data => {
            setData(data);
            setId(data.id);
            setName(data.name);
            data.stats.forEach((element) => {
                setStatsList(statsList => 
                    [...statsList, [element.stat.name, element.base_stat]])});   
        });
    }

    // fetches data when the component loads
    useEffect(() => {
        fetchData();
    }, []);

    // grabs data when the pokemon id is found
    useEffect(() => {
        if (id != null && name != null) {

            Promise.all([
                fetch(`${BASE_API_URL}/pokemon-species/${id}`),
                fetch(`${BASE_API_URL}/evolution-chain/${name}`)
            ]).then(responses => {
                return Promise.all(responses.map(response => {
                    return response.json();
                }));
            }).then(data => {
                // gets the pokemon color
                dataObject["color"] = data[0].color.name;
                setDataObject(dataObject);
                console.log(dataObject);
                // gets the pokemon's proper english name
                data[0].names.forEach(entry => {
                    if (entry.language.name == "en") {
                        dataObject["proper_name"] = entry.name;
                    }
                });
                dataObject["flavor_text_entries"] = [];
                // gets the pokemon's english flavor text entries
                data[0].flavor_text_entries.forEach(entry => {
                    if (entry.language.name == "en") {
                        dataObject["flavor_text_entries"].push(entry.flavor_text);
                    }
                });
                
                console.log("final data");
                console.log(dataObject);
            });
        }
    }, [id]);

  
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
                        <p className="text type_label_text">type:</p>
                        {
                            (data.types.length == 1) ?
                            <p className="text type_text">{data.types[0].type.name}</p> : 
                            <p className="text type_text">{data.types[0].type.name}/{data.types[1].type.name}</p>
                        }
                    </div>
                    <div className={styles.type_info_container}>
                        {statsList.length == 0 ? <p style={styles.loading}>Empty</p> :
                            <div>
                                {statsList.map((stat_line) => 
                                    <div className="stat_line_container">
                                        <p className="text ability_text">{stat_line[0]}</p>
                                        <p className="text ability_text">{stat_line[1]}</p>
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