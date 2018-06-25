const http = require('http');
const router = require('./router');
const getMethod = require('./getMethod')
const port = 3000;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end('Running DATA Service !!!!');
});

router.register('/getCuaHang', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(getMethod.get_CuaHang());
});

router.register('/getDSTivi', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(getMethod.get_DanhSach_Tivi());
});

router.register('/add', function (req, res) {
  console.log("POST");
  var body;
  req.on('data', function (data) {
    body = data;
    console.log(body);
  });
  req.on('end', function () {
    console.log("Body: " + body);
  });

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end();
});

// We need a server which relies on our router
const server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(port, (err) => {
  if (err != null)
    console.log('==> Error: ' + err)
  else
    console.log('DATA service is serving on port: ' + port)
});