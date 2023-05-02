import '../styles/card_view_styles.css';
import { useEffect, useState } from "react";

import "../fonts/Orbitron.ttf";

// renders the card data 
// props: data_url, onCardClick 
export default function CardView(props) {

    const [data, setData] = useState();
    const [loadingStatus, setLoadingStatus] = useState("loading . . .");

    async function fetchData() {
        try {
            console.log("we are searching " + props.data_url);
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

  
    return (
        (data == null) ? 
        <div className="card_container">
            <p className="text">{loadingStatus}</p> 
        </div>: 
        <div className="card_container" onClick={() => {console.log("CLICKED"); props.click();}}>
            <img className="image_card" src={data.sprites.other["official-artwork"].front_default}/> 
            <div className="text_info_container_card">
                <p className="text name_text">{data.name}</p>
                <div className="index_info_container_card">
                    <p className="text index_hashtag">#</p>
                    <p className="text index_value">{data.game_indices[0].game_index}</p>
                </div>
            </div>
        </div>
    );
}