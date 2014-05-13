var express = require('express');
var logfmt = require("logfmt");
var port = Number(process.env.PORT || 3000);
var app = express();
var path = require('path');

app.use(logfmt.requestLogger());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log('Listening on port ' + port);
});