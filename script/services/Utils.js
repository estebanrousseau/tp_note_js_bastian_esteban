const Utils = {
    parsRequestURL(){
        let url = location.hash.slice(1).toLocaleLowerCase() || '/';
        let r = url.split('/');
        let request = {
            id : null,
        };
        request.id = r[1];
        return request;
    }
}

export default Utils;