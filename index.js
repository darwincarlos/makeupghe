var express = require('express');
var logfmt = require("logfmt");
var port = Number(process.env.PORT || 3000);
var app = express();

app.use(logfmt.requestLogger());

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.listen(port);

app.post('/', function(req, res){
  var result = req.rawBody;
  res.send("hello there world data is " + result);
});