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
        <div className="container">
            <p className="text">Loading . . .</p> 
        </div>: 
        <div className="container">
            <img className="image" src={data.sprites.other["official-artwork"].front_default}/> 
            <div className="text_info_container">
                <p className="text name_text">{data.name}</p>
                <div className="index_info_container">
                    <p className="text index_hashtag">#</p>
                    <p className="text index_value">{data.game_indices[0].game_index}</p>
                </div>
            </div>
        </div>
    );
}