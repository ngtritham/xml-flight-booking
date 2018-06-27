const http = require('http');
const router = require('./router');
const fs = require('fs')
const querystring = require('querystring');
const method = require('../LIB/requestMethod')
const URL = require('url')
const xml2js = require("xml2js")
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
    // Load giao diện
    console.log(req.method + "   " + req.url);
    let html = fs.readFileSync(__dirname + '/views/account/signup.html')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(html);
  } else if (req.method === "POST") {
    //console.log(req.method + "   " + req.url);
    let body = '';

    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        request.connection.destroy();
    });

    req.on('end', function () {
      let post = querystring.parse(body);
      let newacc = {
        "ID": " ",
        "username": post.username,
        "password": post.password,
        "Ten": post.Ten,
        "SDT": post.SDT,
        "Email": post.Email,
        "isAdmin": '0'
      }
      console.log(JSON.stringify(newacc));
      newacc = JSON.stringify(newacc)

      method.post('http://localhost:3001/account/signup', newacc)
    });

    res.writeHead(200, {
      'Content-Type': 'text/plan'
    });
    res.end();
  }


});

router.register('/account/login', function (req, res) {
  if (req.method === "GET") {
    console.log(req.method + "   " + req.url)
    let data = fs.readFileSync(__dirname + '/views/account/login.html')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(data);
  } else if (req.method === "POST") {

  }
  else {
    console.log("Error /account/login. Undefined method !!!");
  }

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

router.register('/report/getMonth', function (req, res) {

  const { pathname, query } = URL.parse(req.url, true);

  report = method.post('http://localhost:3001/report/getMonth', JSON.stringify(query))
  if (report == "") {
    res.writeHead(404, { 'Content-Type': 'text/xml' })
    res.end();
  }
  report = JSON.parse(report)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end((new xml2js.Builder()).buildObject(report))
});

router.register('/report/getYear', function (req, res) {
  const { pathname, query } = URL.parse(req.url, true);

  report = method.post('http://localhost:3001/report/getYear', JSON.stringify(query))
  if (report == "") {
    res.writeHead(404, { 'Content-Type': 'text/xml' })
    res.end();
  }
  report = JSON.parse(report)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end((new xml2js.Builder()).buildObject(report))
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
  if (ds == "") {
    res.writeHead(404, { 'Content-Type': 'text/json' })
    res.end();
  }
  ds = JSON.parse(ds)

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

router.register('/booking', function (req, res) {
  const { pathname, query } = URL.parse(req.url, true);

  if (query.Ma_chuyen_bay == undefined ||
    query.Hanh_khach == undefined ||
    query.CMND == undefined ||
    query.Dien_thoai == undefined ||
    query.Hang_ve == undefined ||
    query.Gia_tien == undefined) {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end(data);
    return;
  }

  let result = method.post('http://localhost:3001/booking', JSON.stringify(query));

  res.writeHead(200, {
    'Content-Type': 'text/plan'
  });
  res.end(result);
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