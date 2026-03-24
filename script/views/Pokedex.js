import PokemonProvider from "./../services/PokemonProvider.js";
import { GENERATIONS } from "./../app.js";

export default class Pokedex {

    async render() {
        
        let params = new URLSearchParams(document.location.search);
        let numero_page = params.get("page");

        let page = parseInt(numero_page ?? 1)

        // Obtenir la génération sélectionnée depuis localStorage
        const selectedGen = localStorage.getItem('selectedGeneration') || '1';
        const gen = GENERATIONS[selectedGen];
        const maxId = gen.max;
        const minId = gen.min;
        const totalPokemon = maxId - minId + 1;
        const totalPages = Math.ceil(totalPokemon / 20);

        let pokedex = `
            <table>
                <tbody id = "tbody_pokemon">`;
        
        let row = ``;
        for (let i = 1; i <= 20; i++) {
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
                        <a href="/#/${pokemon.id}">
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
            <a href="/?page=${page-1}">
                <button>←</button>
            </a>`;
        }


        for(let i=0; i<totalPages; i++){
            if(page-1 == i){
                pokedex += `
            <button disabled>${i+1}</button>`;
            }
            else{
                pokedex += `
            <a href="/?page=${i+1}">
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
            <a href="/?page=${page + 1}">
                <button>→</button>
            </a>`;
        }

        pokedex += `</div>`;

        return pokedex
    }
}
