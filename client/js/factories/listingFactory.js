angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
        return $http.get('http://localhost:8080/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 

	delete: function(id) {
	    /**TODO
         return result of HTTP delete method
        */
	    console.log('debug1');
	    console.log(id.code);
	    //return $http({ method: 'DELETE', url: 'http://localhost:8080/api/listings/' + id._id , data: id});
	    return $http.delete('http://localhost:8080/api/listings/'+id._id, id);
    }
  };

  return methods;
});
