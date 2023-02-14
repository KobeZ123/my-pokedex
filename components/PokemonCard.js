import PokemonSearchTip from "./PokemonSearchTip";


// renders the card data 
export default function PokemonCard() {
    const [pokemonData, setPokemonData] = useState(null);

    if (pokemonData == null) { 
        return (<PokemonSearchTip />);
    }
    else {
        return (
            <View style={styles.container}>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex"
    },
}); 