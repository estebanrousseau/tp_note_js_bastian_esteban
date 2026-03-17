import ArticleProvider from "../../service/ArticleProvider.js";

export default class ArticleShow{
    async render(indexArticle = null){ 
    let article = await ArticleProvider.getArticle(indexArticle);
    let view = `
        <section>
            <h2>${article.title}</h2>
            <p> Index : ${article.index}</p>
            <p>${article.text}</p>
        </section>
        `;
        return view
    }
}