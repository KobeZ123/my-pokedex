import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

// renders the card data 
export default function PokemonCardView(props) {

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
        
    
        (data == null) ? 
        <View style={styles.container}>
            <Text>Loading . . .</Text> 
        </View>: 
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: (data.sprites.other["official-artwork"].front_default)}}/> 
            <Text>DONE LOADING</Text>
        </View>

        
    );
    
}

const styles = StyleSheet.create({
    container: {
        display: "flex"
    }, 
    image: {
        width: '20%',
        aspectRatio: 1/1,
        // mixBlendMode: "multiply"
    },
}); 