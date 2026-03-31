import PokemonProvider from "../services/PokemonProvider.js";
import Utils from "../services/Utils.js";
import { GENERATIONS } from "../const.js";

export default class PokemonShow {
    async render() {

        let request = Utils.parsRequestURL();

        const selectedGen = localStorage.getItem('selectedGeneration') || '1';
        const gen = GENERATIONS[selectedGen];

        let pokemon = []
        pokemon.push(await PokemonProvider.getPokemon(request.id)); // Le pokemon actuel

        let id = parseInt(request.id)
        if(id != 1 && id != 1025){
            pokemon.push(await PokemonProvider.getPokemon(id+1)); // le pokemon suivant
            pokemon.push(await PokemonProvider.getPokemon(id-1)); // le pokemon précédent
        }
        if(id == 1){
            pokemon.push(await PokemonProvider.getPokemon(id+1)); // le pokemon suivant
            pokemon.push(null)
        }
        if(id == 1025){
            pokemon.push(null)
            pokemon.push(await PokemonProvider.getPokemon(id-1)); // le pokemon précédent
        }


        // Récupération des types
        let types = [];
        types.push(await PokemonProvider.getType(pokemon[0], 0));
        if (pokemon[0].types.length > 1) {
            types.push(await PokemonProvider.getType(pokemon[0], 1));
        }

        // HTML complet
        let view = `
            <section class="pokemon_show">
            <section class="other_pokemon">`;

        if(pokemon[2] != null){
            view += `
                <div class="other_pokemon_detail">
                    <a href="/#/${gen['name']}/${pokemon[2].id}">
                        <img src="${pokemon[2].sprites.front_default}" alt="${pokemon[2].name}">
                        <p class="nom_pokemon">${pokemon[2].name}</p>
                        <p class="fleche"><font size="10pt">←</font></p>
                    </a>
                </div>
            `;
        }

        view += `
            </section>
            <section class="pokemon-page">
                <audio autoplay src="${pokemon[0].cries.latest}"></audio>

                <!-- HEADER: Image + Infos + Audio -->
                <div class="pokemon-header pokemon-main-card">
                    <img class="pokemon-img" src="${pokemon[0].sprites.front_default}" alt="${pokemon[0].name}">
                    
                    <div class="pokemon-info">
                        <h1>${pokemon[0].name}</h1>

                        <div class="types">
                            ${types.map(type => `
                                <a href="/#/${pokemon[0].id}">
                                    <img src="${type.sprites['generation-ix']['scarlet-violet'].name_icon}" alt="${type.name}">
                                </a>
                            `).join("")}
                        </div>

                        <div class="pokemon-meta">
                            <p><strong>Taille :</strong> ${(pokemon[0].height * 0.1).toFixed(1)} m</p>
                            <p><strong>Poids :</strong> ${(pokemon[0].weight * 0.1).toFixed(1)} kg</p>
                        </div>

                        <audio controls src="${pokemon[0].cries.latest}"></audio>
                    </div>
                </div>

                <!-- CONTENU: Stats et Objet -->
                <div class="pokemon-content">

                    <div class="pokemon stat-card">
                        <h2>Stats</h2>
                        ${(pokemon[0].stats).map(stat => `
                            <div class="stat">
                                <span>${stat.stat.name} : ${stat.base_stat}</span>
                                <div class="bar">
                                    <div class="${
                                        PokemonProvider.less_50(stat.base_stat) ? 'less_50' : 
                                        PokemonProvider.less_100(stat.base_stat) ? 'less_100' : 
                                        PokemonProvider.less_150(stat.base_stat) ? 'less_150' : 
                                        PokemonProvider.less_255(stat.base_stat) ? 'less_255' : 'less_255'}" 
                                        style="width:${((stat.base_stat)*100)/255}%"></div>
                                </div>
                                
                            </div>
                        `).join("")}
                    </div>

                    <div class="pokemon item-card">
                        <h2>Objet</h2>
                        <img src="${pokemon[0].sprites.front_default}" alt="objet">
                    </div>

                </div>

                <a href="javascript:history.back()" class="btn-retour">Retour</a>

            </section>
            <section class="other_pokemon">
        `;

        if(pokemon[1] != null){
            view += `
                <div class="other_pokemon_detail">
                    <a href="/#/${gen['name']}/${pokemon[1].id}">
                        <img src="${pokemon[1].sprites.front_default}" alt="${pokemon[1].name}">
                        <p class="nom_pokemon">${pokemon[1].name}</p>
                        <p class="fleche"><font size="10pt">→</font></p>
                    </a>
                </div>
            `;
        }

        view += `
            </section>
        </section>`;

        return view;
    }
}