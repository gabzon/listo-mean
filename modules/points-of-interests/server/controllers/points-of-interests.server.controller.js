'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	PointsOfInterest = mongoose.model('PointsOfInterest'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Points of interest
 */
exports.create = function(req, res) {
	var pointsOfInterest = new PointsOfInterest(req.body);
	pointsOfInterest.user = req.user;

	pointsOfInterest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pointsOfInterest);
		}
	});
};

/**
 * Show the current Points of interest
 */
exports.read = function(req, res) {
	res.jsonp(req.pointsOfInterest);
};

/**
 * Update a Points of interest
 */
exports.update = function(req, res) {
	var pointsOfInterest = req.pointsOfInterest ;

	pointsOfInterest = _.extend(pointsOfInterest , req.body);

	pointsOfInterest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pointsOfInterest);
		}
	});
};

/**
 * Delete an Points of interest
 */
exports.delete = function(req, res) {
	var pointsOfInterest = req.pointsOfInterest ;

	pointsOfInterest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pointsOfInterest);
		}
	});
};

/**
 * List of Points of interests
 */
exports.list = function(req, res) { PointsOfInterest.find().sort('-created').populate('user', 'displayName').exec(function(err, pointsOfInterests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pointsOfInterests);
		}
	});
};

/**
 * Points of interest middleware
 */
exports.pointsOfInterestByID = function(req, res, next, id) { PointsOfInterest.findById(id).populate('user', 'displayName').exec(function(err, pointsOfInterest) {
		if (err) return next(err);
		if (! pointsOfInterest) return next(new Error('Failed to load Points of interest ' + id));
		req.pointsOfInterest = pointsOfInterest ;
		next();
	});
};