'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Voyage = mongoose.model('Voyage'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, voyage;

/**
 * Voyage routes tests
 */
describe('Voyage CRUD tests', function() {
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

		// Save a user to the test db and create new Voyage
		user.save(function() {
			voyage = {
				name: 'Voyage Name'
			};

			done();
		});
	});

	it('should be able to save Voyage instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Voyage
				agent.post('/api/voyages')
					.send(voyage)
					.expect(200)
					.end(function(voyageSaveErr, voyageSaveRes) {
						// Handle Voyage save error
						if (voyageSaveErr) done(voyageSaveErr);

						// Get a list of Voyages
						agent.get('/api/voyages')
							.end(function(voyagesGetErr, voyagesGetRes) {
								// Handle Voyage save error
								if (voyagesGetErr) done(voyagesGetErr);

								// Get Voyages list
								var voyages = voyagesGetRes.body;

								// Set assertions
								(voyages[0].user._id).should.equal(userId);
								(voyages[0].name).should.match('Voyage Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Voyage instance if not logged in', function(done) {
		agent.post('/api/voyages')
			.send(voyage)
			.expect(403)
			.end(function(voyageSaveErr, voyageSaveRes) {
				// Call the assertion callback
				done(voyageSaveErr);
			});
	});

	it('should not be able to save Voyage instance if no name is provided', function(done) {
		// Invalidate name field
		voyage.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Voyage
				agent.post('/api/voyages')
					.send(voyage)
					.expect(400)
					.end(function(voyageSaveErr, voyageSaveRes) {
						// Set message assertion
						(voyageSaveRes.body.message).should.match('Please fill Voyage name');
						
						// Handle Voyage save error
						done(voyageSaveErr);
					});
			});
	});

	it('should be able to update Voyage instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Voyage
				agent.post('/api/voyages')
					.send(voyage)
					.expect(200)
					.end(function(voyageSaveErr, voyageSaveRes) {
						// Handle Voyage save error
						if (voyageSaveErr) done(voyageSaveErr);

						// Update Voyage name
						voyage.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Voyage
						agent.put('/api/voyages/' + voyageSaveRes.body._id)
							.send(voyage)
							.expect(200)
							.end(function(voyageUpdateErr, voyageUpdateRes) {
								// Handle Voyage update error
								if (voyageUpdateErr) done(voyageUpdateErr);

								// Set assertions
								(voyageUpdateRes.body._id).should.equal(voyageSaveRes.body._id);
								(voyageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Voyages if not signed in', function(done) {
		// Create new Voyage model instance
		var voyageObj = new Voyage(voyage);

		// Save the Voyage
		voyageObj.save(function() {
			// Request Voyages
			request(app).get('/api/voyages')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Voyage if not signed in', function(done) {
		// Create new Voyage model instance
		var voyageObj = new Voyage(voyage);

		// Save the Voyage
		voyageObj.save(function() {
			request(app).get('/api/voyages/' + voyageObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', voyage.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Voyage instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Voyage
				agent.post('/api/voyages')
					.send(voyage)
					.expect(200)
					.end(function(voyageSaveErr, voyageSaveRes) {
						// Handle Voyage save error
						if (voyageSaveErr) done(voyageSaveErr);

						// Delete existing Voyage
						agent.delete('/api/voyages/' + voyageSaveRes.body._id)
							.send(voyage)
							.expect(200)
							.end(function(voyageDeleteErr, voyageDeleteRes) {
								// Handle Voyage error error
								if (voyageDeleteErr) done(voyageDeleteErr);

								// Set assertions
								(voyageDeleteRes.body._id).should.equal(voyageSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Voyage instance if not signed in', function(done) {
		// Set Voyage user 
		voyage.user = user;

		// Create new Voyage model instance
		var voyageObj = new Voyage(voyage);

		// Save the Voyage
		voyageObj.save(function() {
			// Try deleting Voyage
			request(app).delete('/api/voyages/' + voyageObj._id)
			.expect(403)
			.end(function(voyageDeleteErr, voyageDeleteRes) {
				// Set message assertion
				(voyageDeleteRes.body.message).should.match('User is not authorized');

				// Handle Voyage error error
				done(voyageDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Voyage.remove().exec();
		done();
	});
});