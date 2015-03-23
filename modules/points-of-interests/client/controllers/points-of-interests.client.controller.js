'use strict';

// Points of interests controller
angular.module('points-of-interests').controller('PointsOfInterestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PointsOfInterests',
	function($scope, $stateParams, $location, Authentication, PointsOfInterests ) {
		$scope.authentication = Authentication;

		// Create new Points of interest
		$scope.create = function() {
			// Create new Points of interest object
			var pointsOfInterest = new PointsOfInterests ({
				name: this.name
			});

			// Redirect after save
			pointsOfInterest.$save(function(response) {
				$location.path('points-of-interests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Points of interest
		$scope.remove = function( pointsOfInterest ) {
			if ( pointsOfInterest ) { pointsOfInterest.$remove();

				for (var i in $scope.pointsOfInterests ) {
					if ($scope.pointsOfInterests [i] === pointsOfInterest ) {
						$scope.pointsOfInterests.splice(i, 1);
					}
				}
			} else {
				$scope.pointsOfInterest.$remove(function() {
					$location.path('points-of-interests');
				});
			}
		};

		// Update existing Points of interest
		$scope.update = function() {
			var pointsOfInterest = $scope.pointsOfInterest ;

			pointsOfInterest.$update(function() {
				$location.path('points-of-interests/' + pointsOfInterest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Points of interests
		$scope.find = function() {
			$scope.pointsOfInterests = PointsOfInterests.query();
		};

		// Find existing Points of interest
		$scope.findOne = function() {
			$scope.pointsOfInterest = PointsOfInterests.get({ 
				pointsOfInterestId: $stateParams.pointsOfInterestId
			});
		};
	}
]);