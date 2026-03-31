import PokemonProvider from "./../services/PokemonProvider.js";
import { GENERATIONS } from "../const.js";
import { pokemon_page } from "../const.js";

export default class Pokedex {

    async render() {

        // console.log(pokemon_page)
        let hash = document.location.hash;
        let les_paramettres = hash.includes('?') ? hash.split('?')[1] : '';
        let params = new URLSearchParams(les_paramettres);
        let numero_page = params.get("page");

        let page = parseInt(numero_page ?? 1)

        const selectedGen = localStorage.getItem('selectedGeneration') || '1';
        const gen = GENERATIONS[selectedGen];
        console.log(gen)
        const maxId = gen.max;
        const minId = gen.min;
        const totalPokemon = maxId - minId + 1;
        const totalPages = Math.ceil(totalPokemon / 20);

        let pokedex = `
            <table>
                <tbody id = "tbody_pokemon">`;
        
        let row = ``;
        for (let i = 1; i <= pokemon_page; i++) {
            if ((i - 1) % 5 === 0) {
                if(row != ``){
                    row += `</tr>`;
                    pokedex += row;
                }
                row = `<tr>`;
            }
        
            // Calculer l'ID du Pokémon basé sur la génération
            const pokemonIndex = minId + i - 1 + (20 * (page - 1));
            
            if(pokemonIndex > maxId){
                break
            }
            let pokemon = await PokemonProvider.getPokemon(pokemonIndex);

            if (!pokemon) {
                console.warn(`Pokemon ${pokemonIndex} not loaded`);
                continue;
            }
        
            let cell = `
                <td>
                    <div class="pokemon-card">
                        <a href="/#/${gen['name']}/${pokemon.id}">
                            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                            <p>${pokemon.name}</p>
                        </a>
                    </div>
                </td>
            `;
            row += cell;
        }
        row += `</tr>`;
        pokedex += row + `
                </tbody>
            </table>`;

        pokedex += `<div class="pagination">`;

        if(page == 1){
            pokedex += `
            <button disabled>←</button>`;
        }
        else{
            pokedex += `
            <a href="/#/${gen['name']}?page=${page-1}">
                <button>←</button>
            </a>`;
        }


        for(let i=0; i<totalPages; i++){
            if(page-1 == i){
                pokedex += `
            <button disabled>${i+1}</button>`;
            }
            else{
                // let url = (new URLSearchParams(document.location.search)).append("page", i+1)
                // console.log(url)
                pokedex += `
            <a href="/#/${gen['name']}?page=${i+1}">
                <button>${i+1}</button>
            </a>`;
            }
        }

        if(page == totalPages){
            pokedex += `
             <button disabled>→</button>`;
        }
        else{
            pokedex += `
            <a href="/#/${gen['name']}?page=${page + 1}">
                <button>→</button>
            </a>`;
        }

        pokedex += `</div>`;

        return pokedex
    }
}
