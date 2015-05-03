'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// var travelInsurance = new Schema({
// 	hasInsurance: 	{ type: Boolean, default:false },
// 	name: 			{ type: String, default:'', trim: true },
// });
//
// var reviews = new Schema({
// 	author: 	{ type: String, default:'', trim: true },
// 	comment: 	{ type: String, default:'', trim: true },
// 	email: 		{ type: String, default:'', trim: true },
// 	rate: 		{ type: Number },
// });
//
// var contact = new Schema({
// 	name: 		{ type: String, default:'', trim: true },
// 	lastName: 	{ type: String, default:'', trim: true },
// 	jobTitle: 	{ type: String, default:'', trim: true },
// 	phone: 		{ type: String, default:'', trim: true },
// 	email: 		{ type: String, default:'', trim: true },
// 	notice: 	{ type: String, default:'', trim: true },
// 	facebook: 	{ type: String, default:'', trim: true },
// 	linkedin: 	{ type: String, default:'', trim: true },
// 	twitter: 	{ type: String, default:'', trim: true },
// 	googlePlus: { type: String, default:'', trim: true },
// 	skype: 		{ type: String, default:'', trim: true },
// 	languages: 	[{ type: String, default:'', trim: true }] ,
// 	activityRate: { type: Number, default: 100 },
// });
//
// var siteSharing = new Schema({
// 	travelAgency: 	{ type: Schema.ObjectId, ref: 'TravelAgency' },
// 	name: 			{ type: String, default:'', trim: true }
// });
//
// var travelGroup = new Schema({
// 	belongsToGroup: { type: Boolean },
// 	isHeadquaters: 	{ type:Boolean },
// 	headquater: 	{ type: Schema.ObjectId, ref: 'TravelAgency'},
// 	branches: 		[{ type: Schema.ObjectId, ref: 'TravelAgency'}]
// });

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
	logoURL: {
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
	fax: 		{ type: String, default:'', trim: true },
	email: 		{ type: String, default:'', trim: true },
	website: 	{ type: String, default:'', trim: true },

	skype: 		{ type: String, default:'', trim: true },
	facebook: 	{ type: String, default:'', trim: true },
	twitter: 	{ type: String, default:'', trim: true },
	googlePlus: { type: String, default:'', trim: true },
	linkedin: 	{ type: String, default:'', trim: true },
	youtube: 	{ type: String, default:'', trim: true },
	vimeo: 		{ type: String, default:'', trim: true },
	instagram: 	{ type: String, default:'', trim: true },
	pinterest: 	{ type: String, default:'', trim: true },
	flickr: 	{ type: String, default:'', trim: true },
	pixabay: 	{ type: String, default:'', trim: true },

	goal: 		{ type: String, default:'', trim: true },
	notice: 	{ type: String, default:'', trim: true },

	language: 	{ type: String, default:'', trim: true },
	yellowPages: 		{ type: String, default:'', trim: true },
	onlineSales: 		{ type: Boolean, default:false },
	travelInsurance: 	{
		hasInsurance: 		{ type: Boolean, default:false },
		name: 				{ type: String, default:'', trim: true },
	},

	companyRegisterNumber: 	{ type: String, default:'', trim: true },
	companyRegisterWebsite: { type: String, default:'', trim: true },
	creationDate: 	{ type: Date },
	closingDate: 	{ type: Date },
	bankrupty: 		{ type: Boolean, default:false },
	//
	// //reviews: [ reviews ],
	// //contact: [ contact ],
	//
	worldRegions: 	[ { type: String, default:'', trim: true } ],
	activities: 	[ { type: String, default:'', trim: true } ],
	clientType: 	[ { type: String, default:'', trim: true } ],
	//
	productsAPI: 	{ type: String, default:'', trim: true },
	aboutAPI: 		{ type: String, default:'', trim: true },
	googleID: 		{ type: String, default:'', trim: true },
	//
	//coordonates:	{ type: [ Number ], index: '2dSphere' },
	//
	site: 			{ type: String, default:'', trim: true },
	siteSharing:	{
		travelAgency: 	{ type: Schema.ObjectId, ref: 'TravelAgency' },
		name: 			{ type: String, default:'', trim: true }
	},

	//travelGroup: 	{
	// 	belongsToGroup: { type: Boolean },
	// 	isHeadquaters: 	{ type:Boolean },
	// 	headquater: 	{ type: Schema.ObjectId, ref: 'TravelAgency'},
	// 	branches: 		[{ type: Schema.ObjectId, ref: 'TravelAgency'}]
	// },

	created: 	{ type: Date, default: Date.now },
	user: 		{ type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('TravelAgency', TravelAgencySchema);
