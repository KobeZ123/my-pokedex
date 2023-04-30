import '../styles/card_view_styles.css';
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
        <div className="card_container">
            <p className="text">Loading . . .</p> 
        </div>: 
        <div className="card_container" onClick={() => {console.log("CLICKED");}}>
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