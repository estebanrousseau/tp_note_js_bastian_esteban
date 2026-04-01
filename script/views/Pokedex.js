import PokemonProvider from "./../services/PokemonProvider.js";
import { GENERATIONS } from "../const.js";
import { pokemon_page } from "../const.js";
import Favorites from "../services/Favorites.js";

export default class Pokedex {

    getPrimaryType(pokemon) {
        return pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
    }

    getBorderStyle(pokemon) {
        const typeColors = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };

        const types = pokemon.types || [];
        if (types.length === 1) {
            const color = typeColors[types[0].type.name] || '#A8A878';
            return `border: 4px solid ${color}`;
        } else if (types.length >= 2) {
            const color1 = typeColors[types[0].type.name] || '#A8A878';
            const color2 = typeColors[types[1].type.name] || '#A8A878';
            return `border: 4px solid transparent; border-image: linear-gradient(45deg, ${color1} 0%, ${color1} 40%, ${color2} 60%, ${color2} 100%) 1;`;
        }
        return `border: 4px solid #ddd; border-radius: 15px;`;
    }

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

        let pokedex = ``;

        // Afficher les favoris
        const favorites = Favorites.getFavorites();
        if (favorites.length > 0) {
            pokedex += `<h2 class="section-title">Favoris</h2><table><tbody id="tbody_favorites">`;
            let row = ``;
            for (let i = 0; i < favorites.length; i++) {
                if (i % 5 === 0) {
                    if (row !== ``) {
                        row += `</tr>`;
                        pokedex += row;
                    }
                    row = `<tr>`;
                }

                let pokemon = await PokemonProvider.getPokemon(favorites[i]);
                if (!pokemon) continue;

                const borderStyle = this.getBorderStyle(pokemon);

                let cell = `
                    <td>
                        <div class="pokemon-card" style="${borderStyle}">
                            <button class="favorite-btn" data-id="${pokemon.id}">★</button>
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
            pokedex += row + `</tbody></table>`;
        }

        pokedex += `<h2 class="section-title">Pokédex</h2>
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
        
            const borderStyle = this.getBorderStyle(pokemon);

            let cell = `
                <td>
                    <div class="pokemon-card" style="${borderStyle}">
                        <button class="favorite-btn" data-id="${pokemon.id}">${Favorites.isFavorite(pokemon.id) ? '★' : '☆'}</button>
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
