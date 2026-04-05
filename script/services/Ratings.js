import { RATINGS_STORAGE_KEY } from "../const.js";

export default class Ratings {
    static getRatings() {
        const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }

    static getRating(pokemonId) {
        const ratings = this.getRatings();
        const entry = ratings[pokemonId];
        return entry ? entry.stars : 0;
    }

    static setRating(pokemonId, stars, pokemonInfo = {}) {
        const ratings = this.getRatings();
        ratings[pokemonId] = {
            id: pokemonId,
            name: pokemonInfo.name || (ratings[pokemonId] && ratings[pokemonId].name) || null,
            stars: stars,
            updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
        return ratings[pokemonId];
    }
}
