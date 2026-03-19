import PokemonProvider from "../services/PokemonProvider.js";
import Utils from "../services/Utils.js";

export default class PokemonShow{
    async render() {

    let request = Utils.parsRequestURL();
    let pokemon = await PokemonProvider.getPokemon(request.id);

    let types = []
    types.push(await PokemonProvider.getType(pokemon, 0));

    let view = `        
        <section>
            <audio autoplay src="${pokemon.cries.latest}"></audio>
            <div>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <audio controls src="${pokemon.cries.latest}"></audio>`
                

    if((pokemon.types).length > 1){
       types.push(await PokemonProvider.getType(pokemon, 1));
       view += `
                <img src="${types[0].sprites['generation-ix']['scarlet-violet'].name_icon}" alt="${types[0].name}">
                <img src="${types[1].sprites['generation-ix']['scarlet-violet'].name_icon}" alt="${types[1].name}">`
    }
    else{
       view += `
                <img src="${types[0].sprites['generation-ix']['scarlet-violet'].name_icon}" alt="${types[0].name}">`
    }


    view += `   
                <p>${pokemon.name}</p>
                <p>${(pokemon.height * 0.1).toFixed(1)} m</p>
                <p>${(pokemon.weight * 0.1).toFixed(1)} kg</p>
            </div>
            <div class='pokemon_objet'>
                <p>Items :</p>
                <table>
                    <td>
                        <img src="${pokemon.sprites.front_default}" alt="changer_le_poke_par_item"> 
                    </td>
                </table>
            </div>
            <div class='pokemon_stat'>`;

    (pokemon.stats).forEach(stat => {
        view += `
                <p>${stat.stat.name} : ${stat.base_stat}</p>
        `
    });

    view += `
            </div>
            <a href="/">
                <button>Retour</button>
            </a>
            
        </section>
        `;
        console.log(view);
        return view
    }
}

//   <audio src="/shared-assets/audio/t-rex-roar.mp3"></audio>
