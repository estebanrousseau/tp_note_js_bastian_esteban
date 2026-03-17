import { ENDPOINT } from "../config.js";   

export default class ArticleProvidor {
    static fetchArticles = async (limit = 12)=> {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }    
        }; 
        try {
            const response = await fetch(`${ENDPOINT}?_page=0${limit}`, options); 
            const json = await response.json();
            return json.data; 
            
        } catch (error) {
            console.error(error); 
        }
    }

    static getArticle = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }    
        }; 
        try {
            const response = await fetch(`${ENDPOINT}/${id}`, options); 
            const json = await response.json();
            return json; 
            
        } catch (error) {
            console.error("erreur lors de la récupération de l'article", error); 
        }
    }
}    