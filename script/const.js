export const pokemon_page = 20;

export const gen_1 = 151;
export const gen_2 = 100;
export const gen_3 = 135;
export const gen_4 = 107;
export const gen_5 = 156;
export const gen_6 = 72;
export const gen_7 = 88;
export const gen_8 = 96;
export const gen_9 = 120;


export const GENERATIONS = {
    1: { name: "kanto", min: 1, max: 151 },
    2: { name: "johto", min: 152, max: 251 },
    3: { name: "hoenn", min: 252, max: 386 },
    4: { name: "sinnoh", min: 387, max: 493 },
    5: { name: "unova", min: 494, max: 649 },
    6: { name: "kalos", min: 650, max: 721 },
    7: { name: "alola", min: 722, max: 809 },
    8: { name: "galar", min: 810, max: 898 },
    9: { name: "paldea", min: 899, max: 1025 }
};

export const RATINGS_STORAGE_KEY = 'pokemon_ratings';
export const POKEMON_RATINGS = JSON.parse(localStorage.getItem(RATINGS_STORAGE_KEY)) || {};

// export const gen_name = gen_to_list()
export let selectedGeneration = localStorage.getItem('selectedGeneration') || '1';

// export function nb_page(gen){ //int
//     let generation = 
//     let res = Math.ceil(gen/pokemon_page)
//     return res
// }

// export const nb_page = Math.ceil(gen_1/pokemon_page)
