import PokemonProvider from "../services/PokemonProvider.js";
import Utils from "../services/Utils.js";
import { GENERATIONS } from "../const.js";

export default class PokemonShow {
    async render() {

        let request = Utils.parsRequestURL();

        const selectedGen = localStorage.getItem('selectedGeneration') || '1';
        const gen = GENERATIONS[selectedGen];

        let objet = []
        objet.push(await PokemonProvider.getObjet(request.id)); // Le pokemon actuel

        let id = parseInt(request.id)
        if(id != 1 && id != 2175){
            objet.push(await PokemonProvider.getObjet(id+1)); // le pokemon suivant
            objet.push(await PokemonProvider.getObjet(id-1)); // le pokemon précédent
        }
        if(id == 1){
            objet.push(await PokemonProvider.getObjet(id+1)); // le pokemon suivant
            objet.push(null)
        }
        if(id == 2175){
            objet.push(null)
            objet.push(await PokemonProvider.getObjet(id-1)); // le pokemon précédent
        }


        // // Récupération des types
        // let types = [];
        // types.push(await PokemonProvider.getType(pokemon[0], 0));
        // if (pokemon[0].types.length > 1) {
        //     types.push(await PokemonProvider.getType(pokemon[0], 1));
        // }

        // HTML complet
        let view = `
            <section class="pokemon_show">
            <section class="other_pokemon">`;

        if(objet[2] != null){
            view += `
                <div class="other_pokemon_detail">
                    <a href="/#/objets/${objet[2].id}">
                        <img src="${objet[2].sprites.default}" alt="${objet[2].name}">
                        <p class="nom_pokemon">${objet[2].name}</p>
                        <p class="fleche"><font size="10pt">←</font></p>
                    </a>
                </div>
            `;
        }

        view += `
            </section>
            <section class="pokemon-page">

                <!-- HEADER: Image + Infos + Audio -->
                <div class="pokemon-header pokemon-main-card">
                    <img class="pokemon-img" src="${objet[0].sprites.default}" alt="${objet[0].name}">
                    
                    <div class="pokemon-info">
                        <h1>${objet[0].name}</h1>

                        <div class="pokemon-meta">
                            <p><strong>Prix :</strong> ${(objet[0].cost) == 0 ? "Can't by it" : (objet[0].cost) + ` ₽`}</p>
                            <p><strong>Categorie :</strong> ${objet[0].category.name}</p>
                        </div>

                    </div>
                </div>

                <!-- CONTENU: Stats et Objet -->
                <div class="pokemon-content">

                    <div class="pokemon stat-card">
                        <h2>Description</h2>
                        <p>${objet[0].flavor_text_entries[6].text}</p>
                    </div>

                    <div class="pokemon item-card">
                        <h2>Objet</h2>

                        </div>
                </div>

                <a href="javascript:history.back()" class="btn-retour">Retour</a>

            </section>
            <section class="other_pokemon">
        `;

        if(objet[1] != null){
            view += `
                <div class="other_pokemon_detail">
                    <a href="/#/objets/${objet[1].id}">
                        <img src="${objet[1].sprites.default}" alt="${objet[1].name}">
                        <p class="nom_pokemon">${objet[1].name}</p>
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