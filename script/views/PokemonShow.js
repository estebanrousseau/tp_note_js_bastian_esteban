import PokemonProvider from "../services/PokemonProvider.js";

export default class PokemonShow{
    async render() {
    let pokemon = await PokemonProvider.getPokemon();
    let view = `
        <section>
            <h2>Hi m</h2>
            <p> Index : here</p>
        </section>
        `;
        console.log(view);
        return view
    }
}