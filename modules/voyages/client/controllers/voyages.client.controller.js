'use strict';

// Voyages controller
angular.module('voyages').controller('VoyagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Voyages',
	function($scope, $stateParams, $location, Authentication, Voyages ) {
		$scope.authentication = Authentication;

		// Create new Voyage
		$scope.create = function() {
			// Create new Voyage object
			var voyage = new Voyages ({
				name: this.name,
				description: this.description,
				price: this.price
			});

			// Redirect after save
			voyage.$save(function(response) {
				$location.path('voyages/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.price = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Voyage
		$scope.remove = function( voyage ) {
			if ( voyage ) { voyage.$remove();

				for (var i in $scope.voyages ) {
					if ($scope.voyages [i] === voyage ) {
						$scope.voyages.splice(i, 1);
					}
				}
			} else {
				$scope.voyage.$remove(function() {
					$location.path('voyages');
				});
			}
		};

		// Update existing Voyage
		$scope.update = function() {
			var voyage = $scope.voyage ;

			voyage.$update(function() {
				$location.path('voyages/' + voyage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Voyages
		$scope.find = function() {
			$scope.voyages = Voyages.query();
		};

		// Find existing Voyage
		$scope.findOne = function() {
			$scope.voyage = Voyages.get({
				voyageId: $stateParams.voyageId
			});
		};
	}
]);
