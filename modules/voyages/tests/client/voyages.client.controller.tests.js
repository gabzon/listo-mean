'use strict';

(function() {
	// Voyages Controller Spec
	describe('Voyages Controller Tests', function() {
		// Initialize global variables
		var VoyagesController,
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

			// Initialize the Voyages controller.
			VoyagesController = $controller('VoyagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Voyage object fetched from XHR', inject(function(Voyages) {
			// Create sample Voyage using the Voyages service
			var sampleVoyage = new Voyages({
				name: 'New Voyage'
			});

			// Create a sample Voyages array that includes the new Voyage
			var sampleVoyages = [sampleVoyage];

			// Set GET response
			$httpBackend.expectGET('api/voyages').respond(sampleVoyages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.voyages).toEqualData(sampleVoyages);
		}));

		it('$scope.findOne() should create an array with one Voyage object fetched from XHR using a voyageId URL parameter', inject(function(Voyages) {
			// Define a sample Voyage object
			var sampleVoyage = new Voyages({
				name: 'New Voyage'
			});

			// Set the URL parameter
			$stateParams.voyageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/voyages\/([0-9a-fA-F]{24})$/).respond(sampleVoyage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.voyage).toEqualData(sampleVoyage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Voyages) {
			// Create a sample Voyage object
			var sampleVoyagePostData = new Voyages({
				name: 'New Voyage'
			});

			// Create a sample Voyage response
			var sampleVoyageResponse = new Voyages({
				_id: '525cf20451979dea2c000001',
				name: 'New Voyage'
			});

			// Fixture mock form input values
			scope.name = 'New Voyage';

			// Set POST response
			$httpBackend.expectPOST('api/voyages', sampleVoyagePostData).respond(sampleVoyageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Voyage was created
			expect($location.path()).toBe('/voyages/' + sampleVoyageResponse._id);
		}));

		it('$scope.update() should update a valid Voyage', inject(function(Voyages) {
			// Define a sample Voyage put data
			var sampleVoyagePutData = new Voyages({
				_id: '525cf20451979dea2c000001',
				name: 'New Voyage'
			});

			// Mock Voyage in scope
			scope.voyage = sampleVoyagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/voyages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/voyages/' + sampleVoyagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid voyageId and remove the Voyage from the scope', inject(function(Voyages) {
			// Create new Voyage object
			var sampleVoyage = new Voyages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Voyages array and include the Voyage
			scope.voyages = [sampleVoyage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/voyages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVoyage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.voyages.length).toBe(0);
		}));
	});
}());