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

    // console.log(request.generation)
    // console.log(gen_to_list(GENERATIONS).includes(request.generation))
    let num_gen = (gen_to_list(GENERATIONS).indexOf(request.generation))+1

    let parsedURL = (request.generation ? gen_to_list(GENERATIONS).includes(request.generation) ? '/:generation' : '' : '/') +
                (request.id ? '/:id' : '');
    // let parsedURL = (request.generation ? '/:generation' : '/') +
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