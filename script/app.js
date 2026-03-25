import Utils from "./services/Utils.js";
import PokemonShow from "./views/PokemonShow.js";
import Error404 from "./views/Error404.js";
import Pokedex from "./views/Pokedex.js";

export const GENERATIONS = {
    1: { name: "Kanto", min: 1, max: 151 },
    2: { name: "Johto", min: 152, max: 251 },
    3: { name: "Hoenn", min: 252, max: 386 },
    4: { name: "Sinnoh", min: 387, max: 493 },
    5: { name: "Unova", min: 494, max: 649 },
    6: { name: "Kalos", min: 650, max: 721 },
    7: { name: "Alola", min: 722, max: 809 },
    8: { name: "Galar", min: 810, max: 898 },
    9: { name: "Paldea", min: 899, max: 1025 }
};

export let selectedGeneration = localStorage.getItem('selectedGeneration') || '1';

const routes = {
    '/' : Pokedex,
    '/:id' : PokemonShow,
}

const router = async () => {
    const content = null || document.querySelector('#main');

    let request = Utils.parsRequestURL();

    let parsedURL = (request.id ? '/:id' : '/');
                    // (request.param ? '/?page' : ''); // (request.ressource ? '/' + request.ressource : '/') + 

    console.log(parsedURL)
    let page = routes[parsedURL] ? new routes[parsedURL] : new Error404();

    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
