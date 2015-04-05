'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelAgency = mongoose.model('TravelAgency');

/**
 * Globals
 */
var user, travelAgency;

/**
 * Unit tests
 */
describe('Travel agency Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			travelAgency = new TravelAgency({
				name: 'Travel agency Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return travelAgency.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			travelAgency.name = '';

			return travelAgency.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TravelAgency.remove().exec();
		User.remove().exec();

		done();
	});
});