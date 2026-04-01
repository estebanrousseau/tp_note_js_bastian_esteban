export default class Favorites {
    static STORAGE_KEY = 'pokemon_favorites';

    static getFavorites() {
        const favorites = localStorage.getItem(this.STORAGE_KEY);
        return favorites ? JSON.parse(favorites) : [];
    }

    static addFavorite(pokemonId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(pokemonId)) {
            favorites.push(pokemonId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        }
    }

    static removeFavorite(pokemonId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(pokemonId);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        }
    }

    static isFavorite(pokemonId) {
        const favorites = this.getFavorites();
        return favorites.includes(pokemonId);
    }

    static toggleFavorite(pokemonId) {
        if (this.isFavorite(pokemonId)) {
            this.removeFavorite(pokemonId);
        } else {
            this.addFavorite(pokemonId);
        }
    }
}