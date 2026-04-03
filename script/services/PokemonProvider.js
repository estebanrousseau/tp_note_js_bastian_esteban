import { ENDPOINT } from "../config.js";   

export default class PokemonProvider {
    static fetchPokemon = async (limit)=> {
        try {

            const response = await fetch(`${ENDPOINT}/pokemon?limit=${limit}`); 
            const json = await response.json();
            return json;
            // return json.data; 
            
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


    static getType = async (pokemon, no_type) => { // no_type -> soit 0 soit 1
        try {
            let type_url = pokemon.types[no_type].type.url
            let id_type = 0

            if(type_url.length == 33){
                id_type = type_url.slice(-2, -1);
            }
            if(type_url.length == 34){
                id_type = type_url.slice(-3, -1);
            }

            // console.log(id_type)
            const response = await fetch(`${ENDPOINT}/type/${id_type}`); 
            // console.log(response)
            if (!response.ok) {
                throw new Error(`Type ${id_type} not found: ${response.status}`);
            }
            const json = await response.json();
            return json;
            
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static getPokemonSpecies = async (identifier) => {
        try {
            if (!identifier) throw new Error('Species identifier manquant');
            let url = null;
            if (typeof identifier === 'string' && identifier.startsWith('http')) {
                url = identifier;
            } else {
                url = `${ENDPOINT}/pokemon-species/${identifier}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Pokemon species ${identifier} not found: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    
    static less_50 = (stat) => {
        if(stat < 50){
            return true
        }
        return false
    }

    static less_100 = (stat) => {
        if(stat < 100){
            return true
        }
        return false
    }

    static less_150 = (stat) => {
        if(stat < 150){
            return true
        }
        return false
    }

    static less_255 = (stat) => {
        if(stat <= 255){
            return true
        }
        return false
    }
}