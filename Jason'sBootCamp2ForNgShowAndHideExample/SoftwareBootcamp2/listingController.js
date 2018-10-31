angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.myshow = "";
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.alert = false;
    $scope.newobj =
    {
      "code" : "",
      "name" : "",
      "coordinates" : {
        "longitude" : "",
        "latitude" : ""
      },
      "address": ""
    };

    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */
    $scope.showAdd = function() {
      $scope.myshow = "Please fill out the form to add your new listing";
    };
    $scope.hideAdd = function() {
        if ($scope.newobj.name != false && $scope.newobj.code != false)
        {
        $scope.addListing();
        $scope.myshow = "";
        $scope.alert = false;
        }
        else $scope.alert = true;
    };
    $scope.addListing = function() {
      Listings.push(angular.copy($scope.newobj));
      alert("Record added!");
    };
    $scope.deleteListing = function(index) {
      Listings.splice(Listings.indexOf(index), 1);
    };
    $scope.showDetails = function(index) {
      $scope.detailedInfo = Listings[(Listings.indexOf(index) )];
    };
  }
]);
