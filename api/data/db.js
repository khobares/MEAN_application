var mongoose = require('mongoose');
//Url to the database
//To connect to local Mongo DB instance.
// var dburl = 'mongodb://localhost:27017/meanhotel/hotels';
//To connect to cloud hosted instance of Mongo DB using mLAB
var dburl = 'mongodb://sidd:sidd123@ds145380.mlab.com:45380/meanhotel'

//Pluging in global promise library in mongoose promise library
//to avoid Deprecation Warning
mongoose.Promise = global.Promise;

//Connecting Mongoose to MongoDB
mongoose.connect(dburl);

//Check if connected to MongoDB
mongoose.connection.on('connected', function () {
	console.log("Mongoose connected to "+dburl);
});

//Check if disconnected from MongoDB
mongoose.connection.on('disconnected', function () {
	console.log("Mongoose disconnected");
});

//Check if error in connection to MongoDB
// mongoose.connection.on('error', function (err) {
// 	console.log("Mongoose connected error: "+err);
// });

//Close connection on SIGINT ('Ctrl+C' in Terminal)
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination (SIGINT)');
		process.exit(0);
	});
});

//Close connection on SIGTERM ('Ctrl+Z' in Terminal)
process.on('SIGTERM', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination (SIGTERM)');
		process.exit(0);
	});
});

//Close connection on SIGUSR2
process.once('SIGUSR2', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination (SIGUSR2)');
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Bring in Schemas and Models
require('./hotels.model.js');