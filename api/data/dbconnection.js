var MongoClient = require('mongodb').MongoClient;
//Url to the database
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

//Opening a connection to the DB
var open = function () {
	MongoClient.connect(dburl, function (err, db) {
		if (err) {
			console.log('Database connection Failed!');
			return;
		}
		_connection = db;
		console.log("Database connection open", db)
	});
	// set_connection
};

//Getting a connection to the DB
var get = function () {
	return _connection;
};

//Exporting functions
module.exports = {
	open : open,
	get : get
};