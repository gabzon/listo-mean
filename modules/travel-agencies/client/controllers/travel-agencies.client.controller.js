'use strict';

// Travel agencies controller
angular.module('travel-agencies').controller('TravelAgenciesController', ['$scope', '$stateParams', '$location', 'Authentication', 'TravelAgencies', 'CountryList',
function ($scope, $stateParams, $location, Authentication, TravelAgencies, CountryList) {
        $scope.authentication = Authentication;

        var self = this;
        self.selectedItem = null;
        self.searchText = null;

        CountryList.query(function (data) {
            self.countryList = data;
        });

        self.querySearch = function (query) {
            var results;
            results = query ? self.countryList.filter(createFilterFor(query)) : [];
            return results;
        };

        self.updateSelectedCountry = function (state) {
            $scope.travelAgency.country = angular.lowercase(state.name);
        };

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                var name = angular.lowercase(state.name);
                return name.indexOf(lowercaseQuery) === 0;
            };
        }


        // Create new Travel agency
        $scope.create = function () {
            // Create new Travel agency object
            var travelAgency = new TravelAgencies({
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
                website: this.website,
                yellowPages: this.yellowPages,
                companyRegisterNumber: this.companyRegisterNumber,
                companyRegisterWebsite: this.companyRegisterWebsite,
                creationDate: this.creationDate,
                bankruptDate: this.bankruptDate,
                bankrupty: this.bankrupty,
                //travelInsurance: this.travelInsurance.hasInsurance,
            });

            // Redirect after save
            travelAgency.$save(function (response) {
                $location.path('travel-agencies/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
        };

        // Remove existing Travel agency
        $scope.remove = function (travelAgency) {
            if (travelAgency) {
                travelAgency.$remove();

                for (var i in $scope.travelAgencies) {
                    if ($scope.travelAgencies[i] === travelAgency) {
                        $scope.travelAgencies.splice(i, 1);
                    }
                }
            } else {
                $scope.travelAgency.$remove(function () {
                    $location.path('travel-agencies');
                });
            }
        };

        // Update existing Travel agency
        $scope.update = function () {
            var travelAgency = $scope.travelAgency;

            travelAgency.$update(function () {
                $location.path('travel-agencies/' + travelAgency._id);
            }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
        };

        // Find a list of Travel agencies
        $scope.find = function () {
            $scope.travelAgencies = TravelAgencies.query();
            //$scope.count = Count.query;
        };

        // Find existing Travel agency
        $scope.findOne = function () {
            $scope.travelAgency = TravelAgencies.get({
                travelAgencyId: $stateParams.travelAgencyId
            });
        };
}]);

