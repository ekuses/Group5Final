angular.module('listings').controller('SilianController', ['$scope', 'Listings', 
  function($scope, Listings) {
      /* Get all the listings, then bind it to the scope */
      $scope.listings;
      $scope.Listings;
    $scope.detailedInfo = undefined;
    $scope.showForm = false;

    var hide = true;

    $scope.showCheckin = function () {
        $scope.showForm = true;
    }

    $scope.hideCheckin = function () {
       // document.getElementsById("checkIn").style.display = "none";
        $scope.showForm = false;
    }
  }
]);