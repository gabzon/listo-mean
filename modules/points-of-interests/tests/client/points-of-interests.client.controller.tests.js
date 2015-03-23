'use strict';

(function() {
	// Points of interests Controller Spec
	describe('Points of interests Controller Tests', function() {
		// Initialize global variables
		var PointsOfInterestsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Points of interests controller.
			PointsOfInterestsController = $controller('PointsOfInterestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Points of interest object fetched from XHR', inject(function(PointsOfInterests) {
			// Create sample Points of interest using the Points of interests service
			var samplePointsOfInterest = new PointsOfInterests({
				name: 'New Points of interest'
			});

			// Create a sample Points of interests array that includes the new Points of interest
			var samplePointsOfInterests = [samplePointsOfInterest];

			// Set GET response
			$httpBackend.expectGET('api/points-of-interests').respond(samplePointsOfInterests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pointsOfInterests).toEqualData(samplePointsOfInterests);
		}));

		it('$scope.findOne() should create an array with one Points of interest object fetched from XHR using a pointsOfInterestId URL parameter', inject(function(PointsOfInterests) {
			// Define a sample Points of interest object
			var samplePointsOfInterest = new PointsOfInterests({
				name: 'New Points of interest'
			});

			// Set the URL parameter
			$stateParams.pointsOfInterestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/points-of-interests\/([0-9a-fA-F]{24})$/).respond(samplePointsOfInterest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pointsOfInterest).toEqualData(samplePointsOfInterest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PointsOfInterests) {
			// Create a sample Points of interest object
			var samplePointsOfInterestPostData = new PointsOfInterests({
				name: 'New Points of interest'
			});

			// Create a sample Points of interest response
			var samplePointsOfInterestResponse = new PointsOfInterests({
				_id: '525cf20451979dea2c000001',
				name: 'New Points of interest'
			});

			// Fixture mock form input values
			scope.name = 'New Points of interest';

			// Set POST response
			$httpBackend.expectPOST('api/points-of-interests', samplePointsOfInterestPostData).respond(samplePointsOfInterestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Points of interest was created
			expect($location.path()).toBe('/points-of-interests/' + samplePointsOfInterestResponse._id);
		}));

		it('$scope.update() should update a valid Points of interest', inject(function(PointsOfInterests) {
			// Define a sample Points of interest put data
			var samplePointsOfInterestPutData = new PointsOfInterests({
				_id: '525cf20451979dea2c000001',
				name: 'New Points of interest'
			});

			// Mock Points of interest in scope
			scope.pointsOfInterest = samplePointsOfInterestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/points-of-interests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/points-of-interests/' + samplePointsOfInterestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pointsOfInterestId and remove the Points of interest from the scope', inject(function(PointsOfInterests) {
			// Create new Points of interest object
			var samplePointsOfInterest = new PointsOfInterests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Points of interests array and include the Points of interest
			scope.pointsOfInterests = [samplePointsOfInterest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/points-of-interests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePointsOfInterest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pointsOfInterests.length).toBe(0);
		}));
	});
}());