const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

module.exports.get = function (url, data) {
    //data -> json
    let ret;
    let redata = JSON.stringify(data)
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(url + " get DONE!");
            console.log("Type of this.responseText" + typeof this.responseText);
            ret = JSON.parse(this.responseText)
        }
    };
    xhr.open("GET", url, false);
    xhr.send(redata);

    return ret;
}

module.exports.post = function (url, data) {
    //data -> json
    let ret;
    let redata = JSON.stringify(data)
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(url + " post DONE!");
            ret = JSON.parse(this.responseText)
        }
    };

    xhr.open("POST", url, false);
    xhr.send(redata);

    return ret;
}