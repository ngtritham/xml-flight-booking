const http = require('http');
const router = require('./router');
const method = require('../LIB/requestMethod')
const port = 3001;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Running BUS Service !!!!');
});

router.register('/DSChuyenBay', function (req, res) {
  /*
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      //console.log("Complete.\nBody length: " + this.responseText.length);
      //console.log("Body:\n" + this.responseText);

      //build table
      let ds;
      xml2js.parseString(this.responseText, function (err, result) {
        ds = result.Danh_sach_chuyen_bay
      });
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify(ds));
    }
  };
  xhr.open("GET", "http://localhost:3000/getDSChuyenBay", false);
  xhr.send();
  */

  let ds = method.get("http://localhost:3000/getDSChuyenBay", "");
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(JSON.stringify(ds.Danh_sach_chuyen_bay));
});

router.register('/chiTietChuyenBay')

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
    console.log('BUS service is serving on port: ' + port)
});