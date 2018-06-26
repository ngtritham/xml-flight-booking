const http = require('http');
const router = require('./router');
const fs = require('fs')
const qs = require('querystring');
const method = require('../LIB/requestMethod')
const port = 3002;

router.register('/', function (req, res) {
  console.log(req.method)
  let data = fs.readFileSync(__dirname + '/views/home/index.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/home', function (req, res) {
  console.log(req.method)
  let data = fs.readFileSync(__dirname + '/views/home/index.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/account/signup', function (req, res) {
  if (req.method === "GET") {
    console.log(req.method + "   " + req.url)
    let html = fs.readFileSync(__dirname + '/views/account/signup.html')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.method === "POST") {
    var body = '';

    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        request.connection.destroy();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      console.log(post);
    });

    res.writeHead(200, { 'Content-Type': 'text/plan' });
    res.end();
  }

});

router.register('/account/login', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/account/login.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/account/profile', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/account/profile.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/report/monthlyReport', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/report/monthlyReport.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/report/yearlyReport', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/report/yearlyReport.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/booking/ticket', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/booking/ticket.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});

router.register('/booking/flightDetail', function (req, res) {
  console.log(req.method + "   " + req.url)
  let data = fs.readFileSync(__dirname + '/views/booking/flightDetail.html')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(data);
});


router.register('/DSChuyenBay', function (req, res) {
  let DSChuyenBay = '';
  let ds = method.get('http://localhost:3001/DSChuyenBay', "");
  for (var i = 0; i < Object.keys(ds.Chuyen_bay).length; i++) {
    //Thế lực thần bí "$"
    console.log(ds.Chuyen_bay[i].$.STT)
    let stt = (i + 1).toString()
    DSChuyenBay += "<tr> <td>" + stt + "</td> <td>" + ds.Chuyen_bay[i].$.San_bay_di + "</td> <td>" + ds.Chuyen_bay[i].$.San_bay_den + "</td> <td>" + ds.Chuyen_bay[i].$.Khoi_hanh + "</td> <td>" + ds.Chuyen_bay[i].$.Thoi_gian + "</td> <td>" + ds.Chuyen_bay[i].$.So_ghe_trong + "</td> <td>" + ds.Chuyen_bay[i].$.So_ghe_dat + "</td>"
    DSChuyenBay += "<td> <button value=" + ds.Chuyen_bay[i].$.Ma_chuyen_bay + " type=\"button\" class=\"btn btn-info\">Info</button> </td> </tr>"
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(DSChuyenBay);
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
    console.log('GUI service is serving on port: ' + port)
});