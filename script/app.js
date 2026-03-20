import Utils from "./services/Utils.js";
import PokemonShow from "./views/PokemonShow.js";
import Error404 from "./views/Error404.js";
import Pokedex from "./views/Pokedex.js";
import PokemonProvider from "./services/PokemonProvider.js";

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

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const searchPokemon = async () => {
    let value = searchInput.value.trim().toLowerCase();

    if (value !== "") {
        try {
            let pokemon = await PokemonProvider.getPokemon(value);

            if (pokemon) {
                window.location.hash = `/${pokemon.id}`;
            } else {
                alert("Pokémon introuvable");
            }
        } catch (e) {
            alert("Pokémon introuvable");
        }
    }
};

// Entrée clavier
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchPokemon();
    }
});

// Click loupe
searchBtn.addEventListener("click", () => {
    searchPokemon();
});





const suggestions = document.getElementById("suggestions");
let pokemonList = [];


const loadPokemonList = async () => {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    let data = await res.json();

    pokemonList = data.results.map((p, index) => ({
        name: p.name,
        id: index + 1
    }));
};

loadPokemonList();


searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase().trim();

    suggestions.innerHTML = "";

    if (value.length < 2) return;

    let results = pokemonList.filter(p =>
        p.name.includes(value)
    ).slice(0, 20); 

    results.forEach(pokemon => {
        let li = document.createElement("li");
        li.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        <span>${pokemon.name} (#${pokemon.id})</span>
        `;

        li.addEventListener("click", () => {
            window.location.hash = `/${pokemon.id}`;
            suggestions.innerHTML = "";
        });

        suggestions.appendChild(li);
    });
});


document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
        suggestions.innerHTML = "";
    }
});