import { useEffect, useState } from "react";

// renders the page data 
export default function PokemonPageView(props) {

    const [data, setData] = useState();

    const fetchData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/piplup")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

  
    return (
        <View></View>
    );
    
}