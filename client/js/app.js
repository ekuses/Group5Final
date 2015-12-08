var app = angular.module('directoryApp', ['ListingsFactory']);

app.controller('listingsController', function($scope, Listings) {
  /* Get all the listings, then bind it to the scope */
  Listings.getAll().then(function(response) {
    $scope.listings = response.data;
    console.log($scope.listings.length);
  }, function(error) {
    console.log('Unable to retrieve listings:', error);
  });

  $scope.detailedInfo = undefined;

  $scope.addListing = function() {
    $scope.listings.push($scope.newListing);
    $scope.newListing = {};
  };

  $scope.deleteListing = function(index) {
    $scope.listings.splice(index, 1);
  };

  $scope.showDetails = function(index) {
    $scope.detailedInfo = $scope.listings[index];
  };
});