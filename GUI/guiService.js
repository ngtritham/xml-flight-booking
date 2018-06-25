const http = require('http');
const router = require('./router');
const fs = require('fs')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
const port = 3002;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  console.log(req.method)
  let data = fs.readFileSync(__dirname + '/index.html')
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(data);
});

router.register('/DSChuyenBay', function(req, res) {
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      //console.log("Complete.\nBody length: " + this.responseText.length);
      //console.log("Body:\n" + this.responseText);

      //build table
      let DSChuyenBay = '';
      ds = JSON.parse(this.responseText)
      
      for (var i = 0; i < Object.keys(ds.Chuyen_bay).length; i++) {
        //Thế lực thần bí "$"
        console.log(ds.Chuyen_bay[i].$.STT)
        let stt = (i + 1).toString()
        DSChuyenBay += "<tr> <td>" + stt + "</td> <td>" + ds.Chuyen_bay[i].$.San_bay_di + "</td> <td>" + ds.Chuyen_bay[i].$.San_bay_den + "</td> <td>" + ds.Chuyen_bay[i].$.Khoi_hanh + "</td> <td>" + ds.Chuyen_bay[i].$.Thoi_gian + "</td> <td>" + ds.Chuyen_bay[i].$.So_ghe_trong + "</td> <td>" + ds.Chuyen_bay[i].$.So_ghe_dat + "</td>"
        DSChuyenBay += "<td> <button value=" + ds.Chuyen_bay[i].$.Ma_chuyen_bay + " type=\"button\" class=\"btn btn-info\">Info</button> </td> </tr>"
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(DSChuyenBay);
    }
  };
  xhr.open("GET", "http://localhost:3001/DSChuyenBay", false);
  xhr.send();
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