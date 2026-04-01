import PokemonProvider from "../services/PokemonProvider.js";
import { GENERATIONS } from "../const.js";
import Favorites from "../services/Favorites.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const generationFilter = document.getElementById("generationFilter");

let selectedGeneration = localStorage.getItem('selectedGeneration') || '1';

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
    generationFilter.value = selectedGeneration;
    loadPokemonList();

    // Rafraîchir la page Pokedex
    const gen = GENERATIONS[selectedGeneration];
    window.location.hash = `/${gen['name'].toLowerCase()}`;
});

// Définir la génération sélectionnée au chargement
window.addEventListener('load', () => {
    selectedGeneration = localStorage.getItem('selectedGeneration') || '1';
    generationFilter.value = selectedGeneration;

    loadPokemonList();
});

window.addEventListener('hashchange', () => {
    selectedGeneration = localStorage.getItem('selectedGeneration') || '1';
    generationFilter.value = selectedGeneration;

    loadPokemonList();
});

const suggestions = document.getElementById("suggestions");
let pokemonList = [];


const loadPokemonList = async () => {
    selectedGeneration = localStorage.getItem('selectedGeneration') || selectedGeneration || '1';
    const gen = GENERATIONS[selectedGeneration];
    if (!gen) {
        console.warn(`Génération invalide : ${selectedGeneration}`);
        return;
    }

    const limit = gen.max - gen.min + 1;
    const offset = gen.min - 1;

    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let data = await res.json();

    pokemonList = data.results.map((p, index) => ({
        name: p.name,
        id: gen.min + index
    }));
};


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
            window.location = `/#/${pokemon.id}`;
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

// Gestion des boutons favoris
const attachFavoriteListeners = () => {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const pokemonId = parseInt(btn.dataset.id);
            Favorites.toggleFavorite(pokemonId);
            // Mettre à jour l'affichage du bouton
            btn.textContent = Favorites.isFavorite(pokemonId) ? '★' : '☆';
            // Recharger la page pour mettre à jour l'affichage des favoris
            window.location.reload();
        });
    });
};

// Attacher les listeners après le chargement de la page
window.addEventListener('load', () => {
    selectedGeneration = localStorage.getItem('selectedGeneration') || '1';
    generationFilter.value = selectedGeneration;
    loadPokemonList();
    attachFavoriteListeners();
});

window.addEventListener('hashchange', () => {
    selectedGeneration = localStorage.getItem('selectedGeneration') || '1';
    generationFilter.value = selectedGeneration;
    loadPokemonList();
    // Petit délai pour s'assurer que le DOM est mis à jour
    setTimeout(attachFavoriteListeners, 100);
});