import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";
import { lightenColor, colourNameToHex } from "../utils/utils";

import "../styles/page_view_styles.css"
import EvolutionView from "./EvolutionView";
import StatsDisplay from "./StatsDisplay";

// renders the page data 
export default function PageView(props) {

    const [data, setData] = useState();
    const [statsList, setStatsList] = useState([]);
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
                fetch(`${BASE_API_URL}/evolution-chain/${id}`)
            ]).then(responses => {
                return Promise.all(responses.map(response => {
                    return response.json();
                }));
            }).then(data => {
                // gets the pokemon color
                dataObject["color"] = data[0].color.name;
                setDataObject(dataObject);
                console.log("data object");
                console.log(data);
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
                console.log("final data");
                console.log(dataObject);
            });
        }
    }, [id, name]);

  
    return (
        (data == null) ? 
        <div className="page_container">
            <p className="text">Loading . . .</p> 
        </div>: 
        <div className="page_container">
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
            </div>  
        </div>
    );
}
