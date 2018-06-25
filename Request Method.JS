//GET
xhr.onreadystatechange = function () {
  console.log("State: " + this.readyState);

  if (this.readyState == 4) {
    //reponse data
    console.log("Body:\n" + this.responseXML);

  }
};
xhr.open("GET", url, false);
xhr.setRequestHeader("Content-Type", "...")
xhr.send();

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST
//Client
xhr.open("POST", "http://localhost:3000/add", false);
xhr.setRequestHeader("Content-Type", "...")
let data = "..."
xhr.send(data);

//Server
let body = ''
req.on('data', function (data) {
  body += data;
});
req.on('end', function () {
  //Do something
});