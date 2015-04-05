'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Voyage = mongoose.model('Voyage'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Voyage
 */
exports.create = function(req, res) {
	var voyage = new Voyage(req.body);
	voyage.user = req.user;

	voyage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voyage);
		}
	});
};

/**
 * Show the current Voyage
 */
exports.read = function(req, res) {
	res.jsonp(req.voyage);
};

/**
 * Update a Voyage
 */
exports.update = function(req, res) {
	var voyage = req.voyage ;

	voyage = _.extend(voyage , req.body);

	voyage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voyage);
		}
	});
};

/**
 * Delete an Voyage
 */
exports.delete = function(req, res) {
	var voyage = req.voyage ;

	voyage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voyage);
		}
	});
};

/**
 * List of Voyages
 */
exports.list = function(req, res) { Voyage.find().sort('-created').populate('user', 'displayName').exec(function(err, voyages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voyages);
		}
	});
};

/**
 * Voyage middleware
 */
exports.voyageByID = function(req, res, next, id) { Voyage.findById(id).populate('user', 'displayName').exec(function(err, voyage) {
		if (err) return next(err);
		if (! voyage) return next(new Error('Failed to load Voyage ' + id));
		req.voyage = voyage ;
		next();
	});
};