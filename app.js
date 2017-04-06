//Opening the connection to MongoDB
// require('./api/data/dbconnection.js').open();

//Opening the connection to Mongoose
require('./api/data/db.js');

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

//Setting the application to run on port 3000
app.set('port',3000);


//To print HTTP request in console
app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

//To get the static files (the View)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

//To parse data from the body of HTTP POST requests,
//where 'false' allows fetching of String & Arrays
// app.use(bodyParser.urlencoded({ extended : false }));

//To parse data from the body of HTTP POST requests, where data is in JSON format
app.use(bodyParser.json());

//To get the routes
app.use('/api',routes);

//Starting the server
var server = app.listen(app.get('port'),function() {
	var port = server.address().port;
	console.log('Magic happened on port ' + port);
});
