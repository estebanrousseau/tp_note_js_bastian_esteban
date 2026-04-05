import PokemonProvider from "./../services/PokemonProvider.js";
import { GENERATIONS } from "../const.js";
import { pokemon_page } from "../const.js";
import Favorites from "../services/Favorites.js";

export default class Objets{
    async render(){

        let hash = document.location.hash;
        let les_paramettres = hash.includes('?') ? hash.split('?')[1] : '';
        let params = new URLSearchParams(les_paramettres);
        let numero_page = params.get("page");

        let page = parseInt(numero_page ?? 1)

        const totalObjet = 2175 - 1 + 1;
        let totalPages = Math.ceil(totalObjet / 20);
        totalPages = 10


        let objets = `<table>`;
        let row = ``;
        
        for (let i = 1; i <= pokemon_page; i++) {
            if ((i - 1) % 5 === 0) {
                if(row != ``){
                    row += `</tr>`;
                    objets += row;
                }
                row = `<tr>`;
            }
        
            // Calculer l'ID du Pokémon basé sur la génération
            const itemIndex = 1 + i - 1 + (20 * (page - 1));
            
            if(itemIndex > 2175){
                break
            }
            let item = await PokemonProvider.getObjet(itemIndex);

            if (!item) {
                console.warn(`Item ${itemIndex} not loaded`);
                continue;
            }
        
            let cell = `
                <td>
                    <div class="pokemon-card">
                        <a href="/#/objets/${item.id}">
                            <img src="${item.sprites.default}" alt="${item.name}">
                            <p>${item.name}</p>
                        </a>
                    </div>
                </td>
            `;
            row += cell;
        }
        row += `</tr>`;
        objets += row + `
                </tbody>
            </table>`;

        objets += `<div class="pagination">`;

        if(page == 1){
            objets += `
            <button disabled>←</button>`;
        }
        else{
            objets += `
            <a href="/#/objets?page=${page-1}">
                <button>←</button>
            </a>`;
        }


        for(let i=0; i< totalPages; i++){
            if(page-1 == i){
                objets += `
            <button disabled>${i+1}</button>`;
            }
            else{
                // let url = (new URLSearchParams(document.location.search)).append("page", i+1)
                // console.log(url)
                objets += `
            <a href="/#/objets?page=${i+1}">
                <button>${i+1}</button>
            </a>`;
            }
        }

        if(page == totalPages){
            objets += `
             <button disabled>→</button>`;
        }
        else{
            objets += `
            <a href="/#/objets?page=${page + 1}">
                <button>→</button>
            </a>`;
        }

        objets += `</div>`;

        return objets;
    }
}