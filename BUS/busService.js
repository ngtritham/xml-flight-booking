const http = require('http');
const router = require('.././handlers/router');
const port = 3001;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
const xml2js = require('xml2js')
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  xhr.onreadystatechange = function() {
    console.log("State: " + this.readyState);
    
    //if (this.readyState === 4) {
      //console.log("Complete.\nBody length: " + this.responseText.length);
      console.log("Body:\n" + this.responseXML);
      
    //}
  };
  xhr.open("GET", "http://localhost:3000/getDSTivi", false);
  xhr.send();
 
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Running BUS Service !!!!');
});

// We need a server which relies on our router
const server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(port, (err) => {
  if(err != null)
      console.log('==> Error: ' + err)
  else
      console.log('BUS service is serving on port: ' + port)
});