import { ENDPOINT } from "../config.js";   

export default class PokemonProvider {
    static fetchPokemon = async ()=> {
        try {
            const response = await fetch(`${ENDPOINT}/pokemon`); 
            const json = await response.json();
            return json.data; 
            
        } catch (error) {
            console.error(error); 
        }
    }


    static getPokemon = async (id) => {
        try {
            const response = await fetch(`${ENDPOINT}/pokemon/${id}`); 
            if (!response.ok) {
                throw new Error(`Pokemon ${id} not found: ${response.status}`);
            }
            const json = await response.json();
            return json;
            
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}