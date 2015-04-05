'use strict';

// Travel agencies controller
angular.module('travel-agencies').controller('TravelAgenciesController', ['$scope', '$stateParams', '$location', 'Authentication', 'TravelAgencies',
function($scope, $stateParams, $location, Authentication, TravelAgencies, FileUploader ) {
	$scope.authentication = Authentication;

	// Create new Travel agency
	$scope.create = function() {
		// Create new Travel agency object
		var travelAgency = new TravelAgencies ({
			name: this.name,
			description: this.description,
			address: this.address,
			postalCode: this.postalCode,
			city: this.city,
			state: this.state,
			region: this.region,
			country: this.country,
			phone: this.phone,
			fax: this.fax,
			email: this.email,
			website: this.website
		});

		// Redirect after save
		travelAgency.$save(function(response) {
			$location.path('travel-agencies/' + response._id);

			// Clear form fields
			$scope.name = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing Travel agency
	$scope.remove = function( travelAgency ) {
		if ( travelAgency ) { travelAgency.$remove();

			for (var i in $scope.travelAgencies ) {
				if ($scope.travelAgencies [i] === travelAgency ) {
					$scope.travelAgencies.splice(i, 1);
				}
			}
		} else {
			$scope.travelAgency.$remove(function() {
				$location.path('travel-agencies');
			});
		}
	};

	// Update existing Travel agency
	$scope.update = function() {
		var travelAgency = $scope.travelAgency ;

		travelAgency.$update(function() {
			$location.path('travel-agencies/' + travelAgency._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of Travel agencies
	$scope.find = function() {
		$scope.travelAgencies = TravelAgencies.query();
	};

	// Find existing Travel agency
	$scope.findOne = function() {
		$scope.travelAgency = TravelAgencies.get({
			travelAgencyId: $stateParams.travelAgencyId
		});
	};
}
]);
