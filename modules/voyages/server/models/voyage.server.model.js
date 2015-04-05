'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Voyage Schema
*/
var VoyageSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Voyage name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	price:{
		type: Number,
		default: null
	},
	photoGallery: [ { type: String } ],
	travelAgency:{
		type: Schema.ObjectId,
		ref: 'TravelAgency'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});


var blogSchema = new mongoose.Schema({
	title: String,
	writing: [new Schema({
		post: String,
		two: Number,
		three : Number,
		four  : String,
		five : [new Schema({
			a: String,
			b: String,
			c: String,
			d: String,
			e: { type: Date, default: Date.now },
		}, {_id: false})]
	}, {_id: false})],
});

mongoose.model('Voyage', VoyageSchema);
