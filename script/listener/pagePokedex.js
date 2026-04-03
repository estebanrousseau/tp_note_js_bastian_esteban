import PokemonProvider from "../services/PokemonProvider.js";
import { GENERATIONS } from "../const.js";
import Favorites from "../services/Favorites.js";
import Ratings from "../services/Ratings.js";

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
                const gen = GENERATIONS[selectedGeneration] || GENERATIONS[1];
                window.location.hash = `/${gen.name.toLowerCase()}/${pokemon.id}`;
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
            const gen = GENERATIONS[selectedGeneration] || GENERATIONS[1];
            window.location.hash = `/${gen.name.toLowerCase()}/${pokemon.id}`;
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

// Gestion des boutons favoris via délégation d'événements
window.addEventListener('click', (e) => {
    const starBtn = e.target.closest('.star-btn');
    if (starBtn) {
        const ratingContainer = starBtn.closest('.rating');
        if (ratingContainer) {
            const pokemonId = Number(ratingContainer.dataset.pokemonId);
            const pokemonName = ratingContainer.dataset.pokemonName || null;
            const starValue = Number(starBtn.dataset.star);
            if (Number.isInteger(pokemonId) && Number.isInteger(starValue)) {
                Ratings.setRating(pokemonId, starValue, { name: pokemonName });
                const stars = ratingContainer.querySelectorAll('.star-btn');
                stars.forEach((star) => {
                    const value = Number(star.dataset.star);
                    star.classList.toggle('filled', value <= starValue);
                });
            }
        }
    }

    const formToggleBtn = e.target.closest('#toggle-form-btn');
    if (formToggleBtn) {
        const formsInput = document.getElementById('pokemon-forms-data');
        const baseIdInput = document.getElementById('pokemon-base-id');
        if (!formsInput || !baseIdInput) return;

        let forms = [];
        try {
            forms = JSON.parse(formsInput.value.replace(/&quot;/g, '"'));
        } catch {
            return;
        }

        if (!Array.isArray(forms) || forms.length === 0) return;

        const baseId = baseIdInput.value;
        let currentIndex = Number(formToggleBtn.getAttribute('data-current-index')) || 0;
        const nextIndex = (currentIndex + 1) % forms.length;
        const nextFormName = forms[nextIndex];

        formToggleBtn.setAttribute('data-current-index', nextIndex);
        formToggleBtn.textContent = `Passer à : ${forms[(nextIndex + 1) % forms.length]}`;

        const selectedGeneration = localStorage.getItem('selectedGeneration') || '1';
        const gen = GENERATIONS[selectedGeneration] || GENERATIONS[1];

        const targetIdOrName = (nextIndex === 0 ? baseId : nextFormName);
        window.location.hash = `/${gen.name}/${targetIdOrName}`;
        return;
    }

    const btn = e.target.closest('.favorite-btn');
    if (!btn) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    const pokemonId = Number(btn.dataset.id);
    if (!Number.isInteger(pokemonId)) {
        return;
    }

    Favorites.toggleFavorite(pokemonId);
    btn.textContent = Favorites.isFavorite(pokemonId) ? '★' : '☆';
    window.location.reload();
});

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