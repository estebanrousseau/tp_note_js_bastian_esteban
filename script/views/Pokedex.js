import PokemonProvider from "./../services/PokemonProvider.js";

export default class Pokedex {

    async render() {
        
        let pokedex = `
            <table>
                <tbody id = "tbody_pokemon">`;
        
        let row = ``;
        for (let i = 1; i <= 151; i++) {
            if ((i - 1) % 10 === 0) {
                if(row != ``){
                    row += `</tr>`;
                    pokedex += row;
                    console.log(1)
                }
                row = `<tr>`;
            }
        
            let pokemon = await PokemonProvider.getPokemon(i);
        
            if (!pokemon) {
                console.warn(`Pokemon ${i} not loaded`);
                continue;
            }
        
            let cell = `
                <td>
                    <div class="pokemon-card">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <p>${pokemon.name}</p>
                    </div>
                </td>
            `;
            row += cell;
        }
        row += `</tr>`;
        pokedex += row + `
                </tbody>
            </table>`;

        return pokedex
    }
}    