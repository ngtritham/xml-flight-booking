let sys = require('sys');
let http = require('http');
let router = require('./router');

// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

router.register('/test', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Bitchs');
});

// We need a server which relies on our router
let server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(8000, () => {
  console.log('Server running');
});

