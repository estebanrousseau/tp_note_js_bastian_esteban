import { ENDPOINT } from "../config.js";


export default class ArticleProvider{
    static fetchPokemons = async() => {
        try{
            const response = await fetch(`${ENDPOINT}/pokemon`);
            const json = await response.json();
            // console.log("try")
            console.log(json.data)
            return json.data;
        }
        catch(err){
            console.log('Error', err);
        }
    }

    static getPokemon = async() => {
        try{
            const response = await fetch(`${ENDPOINT}/pokemon`);
            const json = await response.json();
            // console.log("try")
            console.log(json.data)
            return json.data;
        }
        catch(err){
            console.log('Error', err);
        }
    }
}