import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native-web";
import '../styles/card_view_styles.css';

import "../fonts/Orbitron.ttf";

// renders the card data 
// props: data_url, onCardClick 
export default function CardView(props) {

    const [data, setData] = useState();
    const [loadingStatus, setLoadingStatus] = useState("loading . . .");

    async function fetchData() {
        try {
            // console.log("we are searching " + props.data_url);
            const response = await fetch(props.data_url);
            const data = await response.json();
            setData(data);
            setLoadingStatus("ok");
        } catch (error) {
            setLoadingStatus("result not found");
        }
    }
      
    useEffect(() => {
        fetchData();
        return () => {
            setData(null); // clear data state when props change
            setLoadingStatus("loading . . .");
        };
    }, [props.data_url]);

    // return (
    //     (data == null) ? 
    //     <div className="card_container">
    //         <p className="loading_text">{loadingStatus}</p> 
    //     </div>: 
    //     <div className="card_container" onClick={() => {console.log("CLICKED"); props.click();}}>
    //         <img className="image_card" src={data.sprites.other["official-artwork"].front_default}/> 
    //         <div className="text_info_container_card">
    //             <p className="text name_text">{data.name}</p>
    //             <div className="index_info_container_card">
    //                 <p className="text index_hashtag">#</p>
    //                 <p className="text index_value">{data.game_indices[0].game_index}</p>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <TouchableOpacity style={styles.card_container} onPress={() => {props.click()}}>
          {data == null ?
            <View style={styles.card_container}>
              <Text style={styles.loading_text}>{loadingStatus}</Text>
            </View>
            :
            <View style={styles.card_container}>
              <Image source={{ uri: data.sprites.other["official-artwork"].front_default }} style={styles.image_card} />
              <View style={styles.text_info_container_card}>
                <Text style={[styles.text, styles.name_text]}>{data.name}</Text>
                <View style={styles.index_info_container_card}>
                  <Text style={[styles.text, styles.index_hashtag]}>#</Text>
                  <Text style={[styles.text, styles.index_value]}>{data.id}</Text>
                </View>
              </View>
            </View>
          }
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    "*": {
      margin: 0,
      padding: 0,
    },
    card_container: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      margin: 10,
      borderRadius: 10,
      cursor: "pointer",
      backgroundColor: "white",
    },
    card_container_hover: {
      backgroundColor: "whitesmoke",
    },
    text: {
      fontFamily: "Verdana",
    },
    loading_text: {
      fontFamily: "Verdana",
      fontSize: 28,
      fontWeight: 500,
      paddingVertical: 15,
      paddingHorizontal: 0,
      color: "darkslategrey",
    },
    image_card: {
      aspectRatio: 2/2,
      mixBlendMode: "multiply",
      backgroundColor: "gainsboro",
      borderRadius: 10,
      maxWidth: 400,
      maxHeight: 400,
    },
    text_info_container_card: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
    },
    name_text: {
      fontWeight: 600,
      fontSize: 48,
    },
    index_info_container_card: {
      display: "flex",
      flexDirection: "row",
    },
    index_hashtag: {
      color: "dimgrey",
      fontWeight: 600,
      fontSize: 36,
    },
    index_value: {
      color: "dimgrey",
      fontWeight: 600,
      fontSize: 36,
    },
  });
  