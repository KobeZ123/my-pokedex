import axios from 'axios'

const BASE_URL = "https://pokeapi.co/api/v2/"

// returns a Pokemon's data given their name 
export function SearchPokemonTest(name) {
    return axios.get(BASE_URL + "pokemon/" + name)
        .then(function (response) {
            console.log(response.data);
        }
    );
}

// returns a Pokemon's data given their name 
export async function SearchPokemon(name) {
    var response = await axios.get(BASE_URL + "pokemon/" + name);
    console.log(JSON.stringify(response.data));
    return response.data;
}   