var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

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

var get = function () {
	return _connection;
};

module.exports = {
	open : open,
	get : get
};