'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PointsOfInterest = mongoose.model('PointsOfInterest'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, pointsOfInterest;

/**
 * Points of interest routes tests
 */
describe('Points of interest CRUD tests', function() {
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

		// Save a user to the test db and create new Points of interest
		user.save(function() {
			pointsOfInterest = {
				name: 'Points of interest Name'
			};

			done();
		});
	});

	it('should be able to save Points of interest instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Points of interest
				agent.post('/api/points-of-interests')
					.send(pointsOfInterest)
					.expect(200)
					.end(function(pointsOfInterestSaveErr, pointsOfInterestSaveRes) {
						// Handle Points of interest save error
						if (pointsOfInterestSaveErr) done(pointsOfInterestSaveErr);

						// Get a list of Points of interests
						agent.get('/api/points-of-interests')
							.end(function(pointsOfInterestsGetErr, pointsOfInterestsGetRes) {
								// Handle Points of interest save error
								if (pointsOfInterestsGetErr) done(pointsOfInterestsGetErr);

								// Get Points of interests list
								var pointsOfInterests = pointsOfInterestsGetRes.body;

								// Set assertions
								(pointsOfInterests[0].user._id).should.equal(userId);
								(pointsOfInterests[0].name).should.match('Points of interest Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Points of interest instance if not logged in', function(done) {
		agent.post('/api/points-of-interests')
			.send(pointsOfInterest)
			.expect(403)
			.end(function(pointsOfInterestSaveErr, pointsOfInterestSaveRes) {
				// Call the assertion callback
				done(pointsOfInterestSaveErr);
			});
	});

	it('should not be able to save Points of interest instance if no name is provided', function(done) {
		// Invalidate name field
		pointsOfInterest.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Points of interest
				agent.post('/api/points-of-interests')
					.send(pointsOfInterest)
					.expect(400)
					.end(function(pointsOfInterestSaveErr, pointsOfInterestSaveRes) {
						// Set message assertion
						(pointsOfInterestSaveRes.body.message).should.match('Please fill Points of interest name');
						
						// Handle Points of interest save error
						done(pointsOfInterestSaveErr);
					});
			});
	});

	it('should be able to update Points of interest instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Points of interest
				agent.post('/api/points-of-interests')
					.send(pointsOfInterest)
					.expect(200)
					.end(function(pointsOfInterestSaveErr, pointsOfInterestSaveRes) {
						// Handle Points of interest save error
						if (pointsOfInterestSaveErr) done(pointsOfInterestSaveErr);

						// Update Points of interest name
						pointsOfInterest.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Points of interest
						agent.put('/api/points-of-interests/' + pointsOfInterestSaveRes.body._id)
							.send(pointsOfInterest)
							.expect(200)
							.end(function(pointsOfInterestUpdateErr, pointsOfInterestUpdateRes) {
								// Handle Points of interest update error
								if (pointsOfInterestUpdateErr) done(pointsOfInterestUpdateErr);

								// Set assertions
								(pointsOfInterestUpdateRes.body._id).should.equal(pointsOfInterestSaveRes.body._id);
								(pointsOfInterestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Points of interests if not signed in', function(done) {
		// Create new Points of interest model instance
		var pointsOfInterestObj = new PointsOfInterest(pointsOfInterest);

		// Save the Points of interest
		pointsOfInterestObj.save(function() {
			// Request Points of interests
			request(app).get('/api/points-of-interests')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Points of interest if not signed in', function(done) {
		// Create new Points of interest model instance
		var pointsOfInterestObj = new PointsOfInterest(pointsOfInterest);

		// Save the Points of interest
		pointsOfInterestObj.save(function() {
			request(app).get('/api/points-of-interests/' + pointsOfInterestObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pointsOfInterest.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Points of interest instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Points of interest
				agent.post('/api/points-of-interests')
					.send(pointsOfInterest)
					.expect(200)
					.end(function(pointsOfInterestSaveErr, pointsOfInterestSaveRes) {
						// Handle Points of interest save error
						if (pointsOfInterestSaveErr) done(pointsOfInterestSaveErr);

						// Delete existing Points of interest
						agent.delete('/api/points-of-interests/' + pointsOfInterestSaveRes.body._id)
							.send(pointsOfInterest)
							.expect(200)
							.end(function(pointsOfInterestDeleteErr, pointsOfInterestDeleteRes) {
								// Handle Points of interest error error
								if (pointsOfInterestDeleteErr) done(pointsOfInterestDeleteErr);

								// Set assertions
								(pointsOfInterestDeleteRes.body._id).should.equal(pointsOfInterestSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Points of interest instance if not signed in', function(done) {
		// Set Points of interest user 
		pointsOfInterest.user = user;

		// Create new Points of interest model instance
		var pointsOfInterestObj = new PointsOfInterest(pointsOfInterest);

		// Save the Points of interest
		pointsOfInterestObj.save(function() {
			// Try deleting Points of interest
			request(app).delete('/api/points-of-interests/' + pointsOfInterestObj._id)
			.expect(403)
			.end(function(pointsOfInterestDeleteErr, pointsOfInterestDeleteRes) {
				// Set message assertion
				(pointsOfInterestDeleteRes.body.message).should.match('User is not authorized');

				// Handle Points of interest error error
				done(pointsOfInterestDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PointsOfInterest.remove().exec();
		done();
	});
});