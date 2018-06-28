const http = require('http');
const router = require('./router');
const getMethod = require('./getMethod')
const postMethod = require('./postMethod')

const port = 3000;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end('Running DATA Service !!!!');
});

router.register('/getDSChuyenBay', function (req, res) {
  let data = getMethod.get_DSChuyenBay()
  console.log(data);
  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end(JSON.stringify(data))
});

router.register('/addPhieuDatCho', function (req, res) {
  postMethod.addPhieuDatCho()
  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end()
});

router.register('/account', function (req, res) {
  if (req.method == 'GET') {

  }

  if (req.method == 'POST') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something
      postMethod.addTaiKhoan(body)
    });
  }
});

router.register('/flyingDetail', function (req, res) {
  if (req.method == 'GET') {
    ret = getMethod.get_FlightDetail();
    

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(ret.Danh_sach_Lich_chuyen_bay));
    return
  }

  if (req.method == 'POST') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something

    });
  }

  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end();
});

router.register('/getReport', function (req, res) {
  let report = getMethod.get_MonthReport()

  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end(JSON.stringify(report));
});

router.register('/TicketInfo', function (req, res) {
  if (req.method == 'GET') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something

    });
  }

  if (req.method == 'POST') {

  }

  res.writeHead(200, { 'Content-Type': 'text/plan' });
  res.end();
});

router.register('/BookingInfo', function (req, res) {

  let body
  if (req.method == 'GET') {
    let dsphieu = getMethod.get_BookingInfo();
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(dsphieu));
    return
  }

  if (req.method == 'POST') {

  }

  res.writeHead(404, { 'Content-Type': 'text/json' });
  res.end();
});

router.register('/updateFlight', function (req, res) {

  let body
  if (req.method == 'GET') {
    
  }

  if (req.method == 'POST') {
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something
      let controng = postMethod.update_FlightInfo(body);

      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(controng);
      return
    });
  }

  res.writeHead(404, { 'Content-Type': 'text/json' });
  res.end();
});

router.register('/booking', function (req, res) {

  let body
  if (req.method == 'GET') {
    
  }

  if (req.method == 'POST') {
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {
      //Do something
      postMethod.addPhieuDatCho(body);

      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end('true');
      return
    });
  }

  res.writeHead(404, { 'Content-Type': 'text/json' });
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