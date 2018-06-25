let handlerFactory = require('../LIB/handler');
let fs = require('fs');
let parser = require('url');
let handlers = {};

exports.clear = function () {
  handlers = {};
}

exports.register = function (url, method) {
  handlers[url] = handlerFactory.createHandler(method);
}

exports.route = function (req) {
  url = parser.parse(req.url, true);
  let handler = handlers[url.pathname];
  if (!handler) handler = this.missing(req)
  return handler;
}

exports.missing = function (req) {
  // Try to read the file locally, this is a security hole, yo /../../etc/passwd
  return handlerFactory.createHandler(function (req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end();
  })
}