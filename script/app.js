import Utils from "./services/Utils.js";
import PokemonShow from "./views/PokemonShow.js";
import Error404 from "./views/Error404.js";
import Pokedex from "./views/Pokedex.js";
import Home from "./views/Home.js";
import { GENERATIONS } from "./const.js";

const routes = {
    '/' : Home,
    '/:generation' : Pokedex,
    '/:generation/:id' : PokemonShow,
}

const router = async () => {
    const content = null || document.querySelector('#main');

    let request = Utils.parsRequestURL();

    // condition qui supprimer les paramettres du paramettre generation si il y en a
    if(request.generation.includes('?')){
        var generation = window.location.hash.slice(2, window.location.hash.indexOf('?'))
        // console.log(generation)
    }
    else{
        var generation = request.generation
    }

    let num_gen = (gen_to_list(GENERATIONS).indexOf(generation))+1
    // console.log(request.generation)

    let parsedURL = (request.generation ? gen_to_list(GENERATIONS).includes(generation) ? '/:generation' : '' : '/') +
                (request.id ? poke_in_gen(num_gen, request.id) ?'/:id' : '' : '');

    if(parsedURL.includes('/:generation')){
        localStorage.setItem('selectedGeneration', num_gen)
    }

    console.log(parsedURL)
    let page = routes[parsedURL] ? new routes[parsedURL] : new Error404();

    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export function gen_to_list(GENERATIONS) {
    let les_gen = []
    for(let i=0; i<Object.keys(GENERATIONS).length; i++){
        les_gen.push(GENERATIONS[i+1]['name'].toLowerCase())
    }
    return les_gen
}

export function poke_in_gen(gen, id) {
    if(GENERATIONS[gen]['min']<=gen, id && GENERATIONS[gen]['max']>=gen, id){
        return true
    }
    return false
}