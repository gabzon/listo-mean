'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelAgency = mongoose.model('TravelAgency'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, travelAgency;

/**
 * Travel agency routes tests
 */
describe('Travel agency CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Travel agency
		user.save(function() {
			travelAgency = {
				name: 'Travel agency Name'
			};

			done();
		});
	});

	it('should be able to save Travel agency instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel agency
				agent.post('/api/travel-agencies')
					.send(travelAgency)
					.expect(200)
					.end(function(travelAgencySaveErr, travelAgencySaveRes) {
						// Handle Travel agency save error
						if (travelAgencySaveErr) done(travelAgencySaveErr);

						// Get a list of Travel agencies
						agent.get('/api/travel-agencies')
							.end(function(travelAgenciesGetErr, travelAgenciesGetRes) {
								// Handle Travel agency save error
								if (travelAgenciesGetErr) done(travelAgenciesGetErr);

								// Get Travel agencies list
								var travelAgencies = travelAgenciesGetRes.body;

								// Set assertions
								(travelAgencies[0].user._id).should.equal(userId);
								(travelAgencies[0].name).should.match('Travel agency Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Travel agency instance if not logged in', function(done) {
		agent.post('/api/travel-agencies')
			.send(travelAgency)
			.expect(403)
			.end(function(travelAgencySaveErr, travelAgencySaveRes) {
				// Call the assertion callback
				done(travelAgencySaveErr);
			});
	});

	it('should not be able to save Travel agency instance if no name is provided', function(done) {
		// Invalidate name field
		travelAgency.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel agency
				agent.post('/api/travel-agencies')
					.send(travelAgency)
					.expect(400)
					.end(function(travelAgencySaveErr, travelAgencySaveRes) {
						// Set message assertion
						(travelAgencySaveRes.body.message).should.match('Please fill Travel agency name');
						
						// Handle Travel agency save error
						done(travelAgencySaveErr);
					});
			});
	});

	it('should be able to update Travel agency instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel agency
				agent.post('/api/travel-agencies')
					.send(travelAgency)
					.expect(200)
					.end(function(travelAgencySaveErr, travelAgencySaveRes) {
						// Handle Travel agency save error
						if (travelAgencySaveErr) done(travelAgencySaveErr);

						// Update Travel agency name
						travelAgency.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Travel agency
						agent.put('/api/travel-agencies/' + travelAgencySaveRes.body._id)
							.send(travelAgency)
							.expect(200)
							.end(function(travelAgencyUpdateErr, travelAgencyUpdateRes) {
								// Handle Travel agency update error
								if (travelAgencyUpdateErr) done(travelAgencyUpdateErr);

								// Set assertions
								(travelAgencyUpdateRes.body._id).should.equal(travelAgencySaveRes.body._id);
								(travelAgencyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Travel agencies if not signed in', function(done) {
		// Create new Travel agency model instance
		var travelAgencyObj = new TravelAgency(travelAgency);

		// Save the Travel agency
		travelAgencyObj.save(function() {
			// Request Travel agencies
			request(app).get('/api/travel-agencies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Travel agency if not signed in', function(done) {
		// Create new Travel agency model instance
		var travelAgencyObj = new TravelAgency(travelAgency);

		// Save the Travel agency
		travelAgencyObj.save(function() {
			request(app).get('/api/travel-agencies/' + travelAgencyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', travelAgency.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Travel agency instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel agency
				agent.post('/api/travel-agencies')
					.send(travelAgency)
					.expect(200)
					.end(function(travelAgencySaveErr, travelAgencySaveRes) {
						// Handle Travel agency save error
						if (travelAgencySaveErr) done(travelAgencySaveErr);

						// Delete existing Travel agency
						agent.delete('/api/travel-agencies/' + travelAgencySaveRes.body._id)
							.send(travelAgency)
							.expect(200)
							.end(function(travelAgencyDeleteErr, travelAgencyDeleteRes) {
								// Handle Travel agency error error
								if (travelAgencyDeleteErr) done(travelAgencyDeleteErr);

								// Set assertions
								(travelAgencyDeleteRes.body._id).should.equal(travelAgencySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Travel agency instance if not signed in', function(done) {
		// Set Travel agency user 
		travelAgency.user = user;

		// Create new Travel agency model instance
		var travelAgencyObj = new TravelAgency(travelAgency);

		// Save the Travel agency
		travelAgencyObj.save(function() {
			// Try deleting Travel agency
			request(app).delete('/api/travel-agencies/' + travelAgencyObj._id)
			.expect(403)
			.end(function(travelAgencyDeleteErr, travelAgencyDeleteRes) {
				// Set message assertion
				(travelAgencyDeleteRes.body.message).should.match('User is not authorized');

				// Handle Travel agency error error
				done(travelAgencyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		TravelAgency.remove().exec();
		done();
	});
});