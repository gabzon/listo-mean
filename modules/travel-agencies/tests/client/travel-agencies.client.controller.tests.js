'use strict';

(function() {
	// Travel agencies Controller Spec
	describe('Travel agencies Controller Tests', function() {
		// Initialize global variables
		var TravelAgenciesController,
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

			// Initialize the Travel agencies controller.
			TravelAgenciesController = $controller('TravelAgenciesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Travel agency object fetched from XHR', inject(function(TravelAgencies) {
			// Create sample Travel agency using the Travel agencies service
			var sampleTravelAgency = new TravelAgencies({
				name: 'New Travel agency'
			});

			// Create a sample Travel agencies array that includes the new Travel agency
			var sampleTravelAgencies = [sampleTravelAgency];

			// Set GET response
			$httpBackend.expectGET('api/travel-agencies').respond(sampleTravelAgencies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelAgencies).toEqualData(sampleTravelAgencies);
		}));

		it('$scope.findOne() should create an array with one Travel agency object fetched from XHR using a travelAgencyId URL parameter', inject(function(TravelAgencies) {
			// Define a sample Travel agency object
			var sampleTravelAgency = new TravelAgencies({
				name: 'New Travel agency'
			});

			// Set the URL parameter
			$stateParams.travelAgencyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/travel-agencies\/([0-9a-fA-F]{24})$/).respond(sampleTravelAgency);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelAgency).toEqualData(sampleTravelAgency);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TravelAgencies) {
			// Create a sample Travel agency object
			var sampleTravelAgencyPostData = new TravelAgencies({
				name: 'New Travel agency'
			});

			// Create a sample Travel agency response
			var sampleTravelAgencyResponse = new TravelAgencies({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel agency'
			});

			// Fixture mock form input values
			scope.name = 'New Travel agency';

			// Set POST response
			$httpBackend.expectPOST('api/travel-agencies', sampleTravelAgencyPostData).respond(sampleTravelAgencyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Travel agency was created
			expect($location.path()).toBe('/travel-agencies/' + sampleTravelAgencyResponse._id);
		}));

		it('$scope.update() should update a valid Travel agency', inject(function(TravelAgencies) {
			// Define a sample Travel agency put data
			var sampleTravelAgencyPutData = new TravelAgencies({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel agency'
			});

			// Mock Travel agency in scope
			scope.travelAgency = sampleTravelAgencyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/travel-agencies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/travel-agencies/' + sampleTravelAgencyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid travelAgencyId and remove the Travel agency from the scope', inject(function(TravelAgencies) {
			// Create new Travel agency object
			var sampleTravelAgency = new TravelAgencies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Travel agencies array and include the Travel agency
			scope.travelAgencies = [sampleTravelAgency];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/travel-agencies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTravelAgency);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.travelAgencies.length).toBe(0);
		}));
	});
}());