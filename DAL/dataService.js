const http = require('http');
const router = require('.././handlers/router');
const port = 3000;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end('Running DATA Service !!!!');
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
      console.log('DATA service is serving on port: ' + port)
});

