var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
//To get data from Json file
var hotelData = require('../data/hotel-data.json');

//To fetch results for all Hotels
module.exports.hotelsGetAll = function (req, res) {
		//Getting a connection to the Db
		var db = dbconn.get();
		var collection = db.collection('hotels');

		var offset = 0;
		var count = 5;
		//To check if offset was passed in the GET method
		if(req.query && req.query.offset) {
			offset = parseInt(req.query.offset, 10);
		}
		//To check if count was passed in the GET method
		if(req.query && req.query.count) {
			count = parseInt(req.query.count, 10);
		}
		//Querying on the 'hotels' collection from the DB
		collection
			.find()				//finding the collection
			.skip(offset)		//skipping to the offset value
			.limit(count)		//limiting the documents that can be viewed
			.toArray(function (err, docs) {
				console.log("Found Hotels", docs);
				//Responding with status code 200 and the response json document 
				res
					.status(200)
					.json(docs);
			});
	};

//To fetch results for a particular Hotel
module.exports.hotelsGetOne = function (req, res) {
		//Getting a connection to the Db
		var db = dbconn.get();
		var collection = db.collection('hotels');
		//Getting the Hotel Id parameter from the GET request
		var hotelId = req.params.hotelId;
		console.log('GET a particular hotel!');
		//Querying on the 'hotels' collection from the DB
		collection
			.findOne({			//finding a particular document with matching id
				_id : ObjectId(hotelId)
			}, function (err, doc) {
				//Responding with status code 200 and the response json document 
				res
					.status(200)
					.json(doc);
			});
	};

//To add a Hotel to the DB
module.exports.hotelsAddOne = function (req, res) {
		//Getting a connection to the Db
		var db = dbconn.get();
		var collection = db.collection('hotels');
		//Creating a new hotel variable
		var newHotel;
		console.log('POST a new hotel!');

		//To check if the POST request consists of a body, 'name' & 'stars' in the body
		if(req.body && req.body.name && req.body.stars){
			//insert the body of the POST request in the newHotel
			newHotel = req.body;
			//Convert the stars String into Int and insert in the newHotel
			newHotel.stars = parseInt(req.body.stars, 10);
			//Querying on the 'hotels' collection from the DB
			collection.insertOne(newHotel, function (err, response) {	//insert the document in the collection
				console.log(response);
				//Responding with status code 201 and the response json document 				
				res
					.status(201)
					.json(response.ops);
			});
		} else {
			console.log("Data missing from body");
			//Responding with status code 400 and an error in Json format 
			res
				.status(400)
				.json({ message : "Required data missing from body" });
		}
	};
