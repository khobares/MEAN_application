var mongoose = require('mongoose');

//Defining Nested Schema
var reviewSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	rating : {
		type : Number,
		min : 0,
		max : 5,
		required : true
	},
	review : {
		type : String,
		required : true
	},
	createdOn : {
		type : Date,
		"default" : Date.now
	}
});

//Defining Nested Schema
var roomSchema = new mongoose.Schema({
	type : String,
	number : Number,
	descriptiong : String,
	photos : [String],
	price : Number
});

//Defining Parent Schema
//(Nested Schemas should be defined before Parent Schema)
var hotelSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	stars : {
		type : Number,
		min : 0,
		max : 5,
		default : 0
	},
	description: String,
	photos : [String],
	currency : String,
	services : [String],

	//Referencing Nested Schema
	reviews : [reviewSchema],
	rooms : [roomSchema],

	location : {
		address : String,
		//Always store coordinates longitude(E/W), latitude (N/S) order
		coordinates : {
			type : [Number],
			index : '2dsphere'
		}
	}
});

//Compiling the model:
mongoose.model('Hotel', hotelSchema);
//mongoose.model('Hotel', hotelSchema , 'hotels');
//The first argument is used-defines name for the Schema
//The third argument(hotels) here defines the name of the collection in the DB,
//if it is not mentioned it will lowercase & pularise the first argument(Hotel), like below:
