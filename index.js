var express = require('express');
var logfmt = require("logfmt");
var port = process.env.PORT || 3000;
var app = express.createServer();

app.use(logfmt.requestLogger());

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
}).listen(port);