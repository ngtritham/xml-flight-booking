const http = require('http');
const router = require('.././handlers/router');
const fs = require('fs')
const port = 3002;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  let data = fs.readFileSync(__dirname + '/index.html')
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(data);
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
      console.log('GUI service is serving on port: ' + port)
});

