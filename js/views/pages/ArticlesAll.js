import ArticleProvider from "../../service/ArticleProvider.js";

export default class ArticleAll{
    async render(){
    let articles = await ArticleProvider.fetchArticles(10);
    let view = `
        <h2>Tous les articles</h2>
        <ul>
            ${articles.map(
                article =>
                    `<ul>
                        <li><a href="#/articles/${article.id}">${article.title}</a></li>
                    </ul>`
            ).join('\n')}
        </ul>
    `;
    return view;
    }
}