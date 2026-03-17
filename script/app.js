const routes = {

}

const router = async () => {
    const content = null || document.querySelector('#main');

    let request = Utils.parsRequestURL();

    let parsedURL = (request.ressource ? '/' + request.ressource : '/') + 
                    (request.id ? '/:id' : '') + 
                    (request.verb ? '/' + request.verb : '');

    let page = routes[parsedURL] ? new routes[parsedURL] : Error404;

    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
