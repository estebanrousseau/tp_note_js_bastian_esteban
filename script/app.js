import Utils from "./services/Utils.js";
import PokemonShow from "./views/PokemonShow.js";
import Error404 from "./views/Error404.js";
import Pokedex from "./views/Pokedex.js";
import PokemonProvider from "./services/PokemonProvider.js";

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

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const generationFilter = document.getElementById("generationFilter");

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

// Gestion du changement de génération
generationFilter.addEventListener("change", (e) => {
    selectedGeneration = e.target.value;
    localStorage.setItem('selectedGeneration', selectedGeneration);
    
    // Rafraîchir la page Pokedex
    window.location.hash = '/';
});

// Définir la génération sélectionnée au chargement
window.addEventListener('load', () => {
    generationFilter.value = selectedGeneration;
});

const suggestions = document.getElementById("suggestions");
let pokemonList = [];


const loadPokemonList = async () => {
    const gen = GENERATIONS[selectedGeneration];
    const limit = gen.max - gen.min + 1;
    const offset = gen.min - 1;
    
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let data = await res.json();

    pokemonList = data.results.map((p, index) => ({
        name: p.name,
        id: gen.min + index
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