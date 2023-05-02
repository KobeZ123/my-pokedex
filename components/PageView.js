import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { BASE_API_URL } from "../utils/constants";
import { lightenColor, colourNameToHex } from "../utils/utils";

import "../styles/page_view_styles.css"
import EvolutionView from "./EvolutionView";
import StatsDisplay from "./StatsDisplay";

// renders the page data 
// props: data_url, clickReturn
export default function PageView(props) {

    const [data, setData] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [dataObject, setDataObject] = useState({});
    const [evolutionUrl, setEvolutionUrl] = useState();

    const fetchData = () => {
        fetch(props.data_url).then(response => {
            return response.json();
        }).then(data => {
            setData(data);
            setId(data.id);
            setName(data.name);
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
                fetch(`${BASE_API_URL}/evolution-chain/${id}`)
            ]).then(responses => {
                return Promise.all(responses.map(response => {
                    return response.json();
                }));
            }).then(data => {
                // gets the pokemon color
                dataObject["color"] = data[0].color.name;
                setDataObject(dataObject);
                console.log("color");
                console.log(data[0].color.name);
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
                setEvolutionUrl(data[0].evolution_chain.url);
            });
        }
    }, [id, name]);

    // return (
    //     <View style={styles.page_container}>
    //       <View style={styles.return_button_container}>
    //         <TouchableOpacity onPress={props.clickReturn}>
    //           <Text style={styles.return_button}>Return to Search</Text>
    //         </TouchableOpacity>
    //       </View>
    //       {(data == null) ? 
    //         <Text style={styles.text}>Loading . . .</Text> :
    //         <View style={styles.pokedex_details}>
    //           <View style={styles.pokedex_left}>
    //             {dataObject.color && <Image source={{uri: data.sprites.other["official-artwork"].front_default}} style={[styles.image, {backgroundColor: lightenColor(colourNameToHex(dataObject.color), 80)}]} />} 
    //             {evolutionUrl && <EvolutionView url={evolutionUrl} />}
    //           </View>
    //           <View style={styles.pokedex_right}>
    //             <View style={styles.text_info_container}>
    //               <Text style={[styles.text, styles.name_text]}>{dataObject.proper_name}</Text>
    //               <View style={styles.index_info_container}>
    //                 <Text style={[styles.text, styles.index_hashtag]}>#</Text>
    //                 <Text style={[styles.text, styles.index_value]}>{data.game_indices[0].game_index}</Text>
    //               </View>
    //             </View>
    //             <View style={styles.type_info_container}>
    //               <Text style={[styles.text, styles.type_label_text]}>type:</Text>
    //               {(data.types.length == 1) ?
    //                 <Text style={[styles.text, styles.type_text]}>{data.types[0].type.name}</Text> : 
    //                 <Text style={[styles.text, styles.type_text]}>{data.types[0].type.name}/{data.types[1].type.name}</Text>
    //               }
    //             </View>
    //             {dataObject.flavor_text_entries && 
    //               <Text style={[styles.text, styles.description_text]}>{dataObject.flavor_text_entries[Math.floor(Math.random() * dataObject.flavor_text_entries.length)]}</Text>}    
    //             <StatsDisplay stats={data.stats}/>   
    //           </View> 
    //         </View>}
    //     </View>
    //   );
  
    return (
        <div className="page_container">
            <div className="return_button_container">
                <button className="return_button" onClick={() => {props.clickReturn()}}>Return to Search</button>
            </div>
            {(data == null) ? 
                <p className="text">Loading . . .</p> :
                <div className="pokedex_details">
                <div className="pokedex_left">
                    {dataObject.color && <img className="image" src={data.sprites.other["official-artwork"].front_default} 
                        style={{backgroundColor: lightenColor(colourNameToHex(dataObject.color), 80)}}/>} 
                    {evolutionUrl && <EvolutionView url={evolutionUrl} />}
                </div>
                <div className="pokedex_right">
                    <div className="text_info_container">
                        <p className="text name_text">{dataObject.proper_name}</p>
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
                    {dataObject.flavor_text_entries && 
                        <p className="text description_text">{dataObject.flavor_text_entries[Math.floor(Math.random() * dataObject.flavor_text_entries.length)]}</p>}    
                    <StatsDisplay stats={data.stats}/>   
                </div> 
            </div>}
        </div>
    );
}

const styles = StyleSheet.create({
    page_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    text: {
        fontFamily: "Verdana",
        fontSize: 14,
    },
    return_button: {
        backgroundColor: "transparent",
        borderWidth: 0,
        color: "#888",
        fontSize: 32,
        top: 16,
        left: 16,
    },
    pokedex_details: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: 25,
        // marginLeft: 30,
        // marginRight: 30,
    },
    pokedex_left: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    pokedex_right: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    image: {
        aspectRatio: 1 / 1,
        maxWidth: 300,
        maxHeight: 300,
        mixBlendMode: "multiply",
        backgroundColor: "gainsboro",
        borderRadius: 15,
    },
    text_info_container: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    name_text: {
        fontWeight: "600",
        fontSize: 36,
    },
    index_info_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    index_hashtag: {
        color: "dimgrey",
        fontWeight: "600",
        fontSize: 24,
    },
    index_value: {
        color: "dimgrey",
        fontWeight: "600",
        fontSize: 24,
    },
    type_info_container: {
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    type_label_text: {
        fontWeight: "400",
        fontSize: 28,
        marginRight: 25,
    },
    type_text: {
        fontWeight: "500",
        fontSize: 28,
    },
    description_text: {
        textAlign: "center",
        padding: 5,
        fontSize: 24,
    },
    stats_container: {
        display: "flex",
        flexDirection: "column",
    },
    stat_line_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subsection_heading: {
        fontFamily: "Verdana",
        fontWeight: "600",
        fontSize: 28,
        margin: 5,
    },
    evolutions_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    stages_container: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    evolution_container: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        cursor: "pointer",
        backgroundColor: "white",
    },
    evolution_img: {
        aspectRatio: 1 / 1,
        maxWidth: 100,
        maxHeight: 100,
        mixBlendMode: "multiply",
        backgroundColor: "gainsboro",
        borderRadius: 5,
    },
    stat_bar_div: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    progress_div: {
        backgroundColor: "lightgreen",
        width: "100%",
        paddingVertical: 3,
    },
    stat_text: {
        marginVertical: 1,
        marginHorizontal: 3,
        fontSize: 20,
    },
    stat_text_div: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    "@media (max-width: 700px)": {
        pokedex_details: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },
    },
});

