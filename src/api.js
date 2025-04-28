// Function to pull random pokemon from API
import axios from "axios";

// async, a promise to fetch the data from API
// await, perform operation when promise kept
export const getRandomPokemon = async() => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    // fetch a random pokemon from API with ID generated from randomID
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    return response.data;
}
