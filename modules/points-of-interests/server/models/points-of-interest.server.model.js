'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Points of interest Schema
 */
var PointsOfInterestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Points of interest name',
		trim: true
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

mongoose.model('PointsOfInterest', PointsOfInterestSchema);