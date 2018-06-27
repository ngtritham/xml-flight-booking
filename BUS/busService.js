const http = require('http');
const router = require('./router');
const method = require('../LIB/requestMethod')
const port = 3001;
// Handle your routes here, put static pages in ./public and they will server
router.register('/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Running BUS Service !!!!');
});

router.register('/DSChuyenBay', function (req, res) {
  let ds = method.get("http://localhost:3000/getDSChuyenBay", "");
  res.writeHead(200, {
    'Content-Type': 'text/json'
  });
  res.end(JSON.stringify(ds.Danh_sach_chuyen_bay));
});

router.register('/account/signup', function (req, res) {
  if (req.method == 'GET') {
    // let ds = method.get("http://localhost:3000/account/signup", "");
    // res.writeHead(200, {
    //   'Content-Type': 'text/json'
    // });
    // console.log("BUS Service port 3001 /account/signup \n Get Danh sach chuyen bay");
    // console.log(ds);
    // res.end(JSON.stringify(ds.Danh_sach_tai_khoan));
  }
  
  else if (req.method == 'POST') {
    let ds = method.get("http://localhost:3000/account/signup", "");
    console.log(ds);
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    //console.log(body.username);
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

      method.post('http://localhost:3000/account/signup', body)
    });
  } else {
    console.log("Error BUS Service: http://localhost:3001/account/signup");
  }

  res.writeHead(200, {
    'Content-Type': 'text/plan'
  });
  res.end();
});

router.register('/flyingDetail', function (req, res) {
  if (req.method == 'GET') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {});
  }

  if (req.method == 'POST') {
    let body
    req.on('data', function (data) {
      body = JSON.parse(data);
    });
    req.on('end', function () {});
  }

  res.writeHead(200, {
    'Content-Type': 'text/plan'
  });
  res.end();
});

router.register('/report/getMonth', function (req, res) {
  console.log(req.url)

  let body
  req.on('data', function (data) {
    body = JSON.parse(data);
    console.log(data)
  });
  req.on('end', function () {
    let report = method.get('http://localhost:3000/report/getMonth', "")
    let result;
    for (var i = 0; i < Object.keys(report.Danh_sach_bao_cao_doanh_thu_ve_cac_chuyen_bay).length; i++) {
      console.log(report.Danh_sach_bao_cao_doanh_thu_ve_cac_chuyen_bay[i])
      if (report.Danh_sach_bao_cao_doanh_thu_ve_cac_chuyen_bay[i].$.Nam == body.Nam) {
        console.log(report.Danh_sach_bao_cao_doanh_thu_ve_cac_chuyen_bay[i])
      }
    }
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