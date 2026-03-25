import PokemonProvider from "../services/PokemonProvider.js";

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

const loadPokemonList = async () => {
    let data = await PokemonProvider.fetchPokemon(151)

    pokemonList = data.results.map((p, index) => ({
        name: p.name,
        id: index + 1
    }));
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