'use strict';

/**
* Module dependencies.
*/
var _ = require('lodash'),
fs = require('fs'),
path = require('path'),
mongoose = require('mongoose'),
TravelAgency = mongoose.model('TravelAgency'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
* Create a Travel agency
*/
exports.create = function(req, res) {
	var travelAgency = new TravelAgency(req.body);
	travelAgency.user = req.user;

	travelAgency.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelAgency);
		}
	});
};


/**
* Show the current Travel agency
*/
exports.read = function(req, res) {
	res.jsonp(req.travelAgency);
};

/**
* Update a Travel agency
*/
exports.update = function(req, res) {
	var travelAgency = req.travelAgency ;

	travelAgency = _.extend(travelAgency , req.body);

	travelAgency.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelAgency);
		}
	});
};


/**
* Delete an Travel agency
*/
exports.delete = function(req, res) {
	var travelAgency = req.travelAgency ;

	travelAgency.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelAgency);
		}
	});
};

/**
* List of Travel agencies
*/
exports.list = function(req, res) {
	TravelAgency.find().sort('-created').populate('user', 'displayName').exec(function(err, travelAgencies) {
	if (err) {
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	} else {
		res.jsonp(travelAgencies);
	}
});
};

/**
* Number of Travel agencies
*/
exports.count = function(req, res){
	TravelAgency.count().exec(function(err, count){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(count);
		}
	});
};

/**
* Travel agency middleware
*/
exports.travelAgencyByID = function(req, res, next, id) {
	TravelAgency.findById(id).populate('user', 'displayName').exec(function(err, travelAgency) {
		if (err) return next(err);
		if (! travelAgency) return next(new Error('Failed to load Travel agency ' + id));
		req.travelAgency = travelAgency ;
		next();
	});
};
