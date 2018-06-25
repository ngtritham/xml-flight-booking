let handlerFactory = require('../handlers/handler');
let fs = require('fs');
let parser = require('url');
let handlers = {};

exports.clear = function() {
  handlers = {};
}

exports.register = function(url, method) {
  handlers[url] = handlerFactory.createHandler(method);
}

exports.route = function(req) {
  url = parser.parse(req.url, true);
  let handler = handlers[url.pathname];
  if (!handler) handler = this.missing(req)
  return handler;
}

exports.missing = function(req) {
  // Try to read the file locally, this is a security hole, yo /../../etc/passwd
  let url = parser.parse(req.url, true);
  let path = __dirname + "/../GUI/public/" + req.url
  console.log(path)
  try {    
    data = fs.readFileSync(path);
    let file_extension = req.url.lastIndexOf('.');
    let header_type = (file_extension == -1 && req.url != '/')
        ? 'text/plain'
        : {
            '/': 'text/html',
            '.html': 'text/html',
            '.ico': 'image/x-icon',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.css': 'text/css',
            '.js': 'text/javascript'
        }[req.url.substr(file_extension)];

    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(200, {'Content-Type': header_type});
      res.end(data);
    });        
  } catch (e) { 
    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end();
    });      
  }  
}