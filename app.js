require('./api/data/dbconnection.js').open();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port',3000);

//To print HTTP request in console
app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

//To get the view
app.use(express.static(path.join(__dirname, 'public')));

//To parse data from the body of HTTP POST requests,
//where 'false' allows fetching of String & Arrays
app.use(bodyParser.urlencoded({ extended : false }));

//To get the routes
app.use('/api',routes);

//Starting the server at port=3000
var server = app.listen(app.get('port'),function() {
	var port = server.address().port;
	console.log('Magic happened on port ' + port);
});