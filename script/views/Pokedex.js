import PokemonProvider from "./../services/PokemonProvider.js";

export default class Pokedex {

    async render() {
        
        let params = new URLSearchParams(document.location.search);
        let numero_page = params.get("page");

        let page = parseInt(numero_page ?? 1)

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
        
            // let pokemon = pokemons_de_page[i]
            if(i+(20*(page-1)) > 151){
                break
            }
            let pokemon = await PokemonProvider.getPokemon(i+(20*(page-1)));

            if (!pokemon) {
                console.warn(`Pokemon ${i} not loaded`);
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


        for(let i=0; i<8; i++){
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

        if(page == 8){
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
