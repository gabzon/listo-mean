'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Place = mongoose.model('Place'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, place;

/**
 * Place routes tests
 */
describe('Place CRUD tests', function() {
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

		// Save a user to the test db and create new Place
		user.save(function() {
			place = {
				name: 'Place Name'
			};

			done();
		});
	});

	it('should be able to save Place instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Place
				agent.post('/api/places')
					.send(place)
					.expect(200)
					.end(function(placeSaveErr, placeSaveRes) {
						// Handle Place save error
						if (placeSaveErr) done(placeSaveErr);

						// Get a list of Places
						agent.get('/api/places')
							.end(function(placesGetErr, placesGetRes) {
								// Handle Place save error
								if (placesGetErr) done(placesGetErr);

								// Get Places list
								var places = placesGetRes.body;

								// Set assertions
								(places[0].user._id).should.equal(userId);
								(places[0].name).should.match('Place Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Place instance if not logged in', function(done) {
		agent.post('/api/places')
			.send(place)
			.expect(403)
			.end(function(placeSaveErr, placeSaveRes) {
				// Call the assertion callback
				done(placeSaveErr);
			});
	});

	it('should not be able to save Place instance if no name is provided', function(done) {
		// Invalidate name field
		place.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Place
				agent.post('/api/places')
					.send(place)
					.expect(400)
					.end(function(placeSaveErr, placeSaveRes) {
						// Set message assertion
						(placeSaveRes.body.message).should.match('Please fill Place name');
						
						// Handle Place save error
						done(placeSaveErr);
					});
			});
	});

	it('should be able to update Place instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Place
				agent.post('/api/places')
					.send(place)
					.expect(200)
					.end(function(placeSaveErr, placeSaveRes) {
						// Handle Place save error
						if (placeSaveErr) done(placeSaveErr);

						// Update Place name
						place.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Place
						agent.put('/api/places/' + placeSaveRes.body._id)
							.send(place)
							.expect(200)
							.end(function(placeUpdateErr, placeUpdateRes) {
								// Handle Place update error
								if (placeUpdateErr) done(placeUpdateErr);

								// Set assertions
								(placeUpdateRes.body._id).should.equal(placeSaveRes.body._id);
								(placeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Places if not signed in', function(done) {
		// Create new Place model instance
		var placeObj = new Place(place);

		// Save the Place
		placeObj.save(function() {
			// Request Places
			request(app).get('/api/places')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Place if not signed in', function(done) {
		// Create new Place model instance
		var placeObj = new Place(place);

		// Save the Place
		placeObj.save(function() {
			request(app).get('/api/places/' + placeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', place.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Place instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Place
				agent.post('/api/places')
					.send(place)
					.expect(200)
					.end(function(placeSaveErr, placeSaveRes) {
						// Handle Place save error
						if (placeSaveErr) done(placeSaveErr);

						// Delete existing Place
						agent.delete('/api/places/' + placeSaveRes.body._id)
							.send(place)
							.expect(200)
							.end(function(placeDeleteErr, placeDeleteRes) {
								// Handle Place error error
								if (placeDeleteErr) done(placeDeleteErr);

								// Set assertions
								(placeDeleteRes.body._id).should.equal(placeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Place instance if not signed in', function(done) {
		// Set Place user 
		place.user = user;

		// Create new Place model instance
		var placeObj = new Place(place);

		// Save the Place
		placeObj.save(function() {
			// Try deleting Place
			request(app).delete('/api/places/' + placeObj._id)
			.expect(403)
			.end(function(placeDeleteErr, placeDeleteRes) {
				// Set message assertion
				(placeDeleteRes.body.message).should.match('User is not authorized');

				// Handle Place error error
				done(placeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Place.remove().exec();
		done();
	});
});