let handlerFactory = require('./handler');
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
  let path = __dirname + "/public" + url.pathname
  try {    
    data = fs.readFileSync(path);
    mime = req.headers.accepts || 'text/html'
    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(200, {'Content-Type': mime});
      res.end(data);

    });        
  } catch (e) { 
    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("No route registered for " + url.pathname);
    });      
  }  
}


