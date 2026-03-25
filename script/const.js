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

// export function nb_page(gen){ //int
//     let generation = 
//     let res = Math.ceil(gen/pokemon_page)
//     return res
// }

// export const nb_page = Math.ceil(gen_1/pokemon_page)
