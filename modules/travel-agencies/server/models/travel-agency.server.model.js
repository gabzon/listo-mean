'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Travel agency Schema
*/
var TravelAgencySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Travel agency name',
		trim: true
	},
	logoImageURL: {
		type: String,
		default: 'modules/users/img/profile/default.png'
	},
	description:{ type: String, default:'', trim: true },
	address: 	{ type: String, default:'', trim: true },
	postalCode: { type: String, default:'', trim: true },
	city: 		{ type: String, default:'', trim: true },
	state: 		{ type: String, default:'', trim: true },
	country: 	{ type: String, default:'', trim: true },
	phone: 		{ type: String, default:'', trim: true },
	fax: 			{ type: String, default:'', trim: true },
	email: 		{ type: String, default:'', trim: true },
	website: 	{ type: String, default:'', trim: true },
	specializationCountries: [ { type: String, default:'', trim: true } ],
	specializationActivities: [ { type: String, default:'', trim: true } ],
	worldRegions: [ { type: String, default:'', trim: true } ],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('TravelAgency', TravelAgencySchema);
