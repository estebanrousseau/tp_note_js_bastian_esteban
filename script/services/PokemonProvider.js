import { ENDPOINT } from "../config.js";   

export default class PokemonProvider {
    static fetchPokemon = async (limit = 12)=> {
        try {
            const response = await fetch(`${ENDPOINT}/pokemon`); 
            const json = await response.json();
            return json.data; 
            
        } catch (error) {
            console.error(error); 
        }
    }
}