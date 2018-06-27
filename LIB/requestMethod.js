const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

module.exports.get = function (url, data) {
    //data -> json
    let ret;

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(url + " get DONE!");
            ret = this.responseText
        }
    };
    xhr.open("GET", url, false);
    xhr.send();

    return ret;
}

module.exports.post = function (url, data) {
    //data -> json
    let ret;

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(url + " post DONE!");
            ret = this.responseText
        }
    };

    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8')
    xhr.send(data);

    return ret;
}