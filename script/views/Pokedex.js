import PokemonProvider from "./../services/PokemonProvider.js";

export default class Pokedex {

    async render() {
        
        let tbody = document.querySelector('#tbody_pokemon');
        
        let row;
        
        for (let i = 1; i <= 151; i++) {
        
            if ((i - 1) % 10 === 0) {
                row = document.createElement("tr");
                tbody.appendChild(row);
            }
        
            let pokemon = await PokemonProvider.getPokemon(i);
        
            if (!pokemon) {
                console.warn(`Pokemon ${i} not loaded`);
                continue;
            }
        
            let cell = document.createElement("td");
        
            cell.innerHTML = `
                <div class="pokemon-card">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>${pokemon.name}</p>
                </div>
            `;
        
            row.appendChild(cell);

        }
        


        return `
            <section>
                <h2>About</h2>
                <p>texte de fou.</p>
            </section>
        `;
    }

}    