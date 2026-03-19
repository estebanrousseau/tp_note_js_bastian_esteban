import PokemonProvider from "../services/PokemonProvider.js";
import Utils from "../services/Utils.js";

export default class PokemonShow {
    async render() {
        let request = Utils.parsRequestURL();
        let pokemon = await PokemonProvider.getPokemon(request.id);

        // Récupération des types
        let types = [];
        types.push(await PokemonProvider.getType(pokemon, 0));
        if (pokemon.types.length > 1) {
            types.push(await PokemonProvider.getType(pokemon, 1));
        }

        // HTML complet
        let view = `
<section class="pokemon-page">

    <!-- HEADER: Image + Infos + Audio -->
    <div class="pokemon-header pokemon-main-card">
        <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        
        <div class="pokemon-info">
            <h1>${pokemon.name}</h1>

            <div class="types">
                ${types.map(type => `
                    <a href="/#/${pokemon.id}">
                        <img src="${type.sprites['generation-ix']['scarlet-violet'].name_icon}" alt="${type.name}">
                    </a>
                `).join("")}
            </div>

            <div class="pokemon-meta">
                <p><strong>Taille :</strong> ${(pokemon.height * 0.1).toFixed(1)} m</p>
                <p><strong>Poids :</strong> ${(pokemon.weight * 0.1).toFixed(1)} kg</p>
            </div>

            <audio controls src="${pokemon.cries.latest}"></audio>
        </div>
    </div>

    <!-- CONTENU: Stats et Objet -->
    <div class="pokemon-content">

        <div class="pokemon stat-card">
            <h2>Stats</h2>
            ${(pokemon.stats).map(stat => `
                <div class="stat">
                    <span>${stat.stat.name}</span>
                    <div class="bar">
                        <div style="width:${stat.base_stat}%"></div>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="pokemon item-card">
            <h2>Objet</h2>
            <img src="${pokemon.sprites.front_default}" alt="objet">
        </div>

    </div>

    <a href="/" class="btn-retour">Retour</a>

</section>
        `;
        return view;
    }
}