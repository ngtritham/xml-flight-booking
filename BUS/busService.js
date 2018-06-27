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
  let ds = method.get("http://localhost:3000/getDSChuyenBay", "");
  if (ds == "") {
    ds.writeHead(404, { 'Content-Type': 'text/json'})
    ds.end();
  }
  
  ds = JSON.parse(ds)

  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(JSON.stringify(ds.Danh_sach_chuyen_bay));
});

router.register('/account', function (req, res) {
  if (req.method == 'GET') {
    //auth
  }

  if (req.method == 'POST') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something
      if (body.ID == undefined ||
        body.username == undefined ||
        body.password == undefined ||
        body.Ten == undefined ||
        body.SDT == undefined ||
        body.Email == undefined ||
        body.isAdmin == undefined)
        return

      method.post('http://localhost:3000/account', JSON.stringify(body))
    });
  }

  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end();
});

router.register('/flyingDetail', function (req, res) {
  if (req.method == 'GET') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
    });
  }

  if (req.method == 'POST') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
    });
  }

  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end();
});

router.register('/report/getMonth', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/json'})

  let body

  req.on('data', function (data) {
    body = JSON.parse(data);
  });
  req.on('end', function () {
    let report = method.get('http://localhost:3000/getReport', "")
    if (report == "") {
      res.writeHead(404, { 'Content-Type': 'text/json'})
      res.end();
    }
    report = JSON.parse(report)

    for (let i = 0; i < Object.keys(report.Doanh_thu_nam).length; i++) {
      if(report.Doanh_thu_nam[i].$.Nam == body.Nam) {
        let thang = report.Doanh_thu_nam[i].DS_Ban_ve

        for (let j = 0; i < Object.keys(thang).length; j++) {
          if (thang[j].$.Thang == body.Thang) {
            res.end(JSON.stringify(thang[j]))
            return;
          }
        }
        
        break;
      }
    }

    res.end()
  });
});

router.register('/report/getYear', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/json'})

  let body

  req.on('data', function (data) {
    body = JSON.parse(data);
  });
  req.on('end', function () {
    let report = method.get('http://localhost:3000/getReport', "")
    if (report == "") {
      res.writeHead(404, { 'Content-Type': 'text/json'})
      res.end();
    }
    report = JSON.parse(report)
    
    for (let i = 0; i < Object.keys(report.Doanh_thu_nam).length; i++) {
      if(report.Doanh_thu_nam[i].$.Nam == body.Nam) {
        res.end(JSON.stringify(report.Doanh_thu_nam[i]))
        return
      }
    }

    res.end()
  });
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
    console.log('BUS service is serving on port: ' + port)
});