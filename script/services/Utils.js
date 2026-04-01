const Utils = {
    parsRequestURL(){
        let url = location.hash.slice(1).toLocaleLowerCase() || '/';
        let r = url.split('/');
        let request = {
            generation : null,
            id : null,
        };
        request.generation = r[1]
        request.id = r[2];
        return request;
    }
}

export default Utils;