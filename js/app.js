import Utils from './service/Utils.js';
import Home from './views/pages/Home.js';
import About from './views/pages/about.js';
import ArticleAll from './views/pages/ArticlesAll.js';
import ArticleShow from './views/pages/ArticlesShow.js';
import Error from './views/pages/Error.js';


const routes = {
    '/': Home,
    '/about': About,
    '/articles': ArticleAll,
    '/articles/:id': ArticleShow
};

const router = async () => {
    const content = null || document.querySelector('#main');

    let request = Utils.parseResquestURL();

    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
                    (request.id ? '/:id' : '') + 
                    (request.verb ? '/' + request.verb : '');

    let pageC = routes[parsedURL] ? routes[parsedURL] : Error;

    let page = new pageC();
    
    content.innerHTML = await page.render(request.id);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
