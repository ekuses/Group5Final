angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    var hide = true;
    $scope.list = function(){
      if(!hide){
        hide = true;
        document.getElementById('table2').style.display = 'none';
       }else{
          hide = false;
          document.getElementById('table2').style.display = 'block';
       }
    };

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
        Listings.create({ code: $scope.newListing.code, name: $scope.newListing.name, address: $scope.newListing.address }).then(function (response) {
            location.reload();
        }, function (err) {
            if (err)
            console.log('Unable to post new listing: ', err);
        })
    };

    $scope.deleteListing = function(index) {
        /**TODO
         Delete the article using the Listings factory. If the removal is successful, 
         navigate back to 'listing.list'. Otherwise, display the error. 
        */
        var listing = $scope.listings[index];
        console.log(listing);

        Listings.delete(listing).then (function (response) {
            location.reload();
        }, function (err) {
            if (err)
                console.log('Unable to delete listing: ', err);
        }
    )};

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);