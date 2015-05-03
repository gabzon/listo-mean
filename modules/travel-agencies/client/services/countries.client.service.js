'use strict';

angular.module('travel-agencies').factory('CountryList', [ '$resource', function($resource) {
    return $resource('https://restcountries.eu/rest/v1');
}]);
