angular.module('ListingsFactory', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    }, 

    create: function(listing) {
      return $http.post('http://localhost:8080/api/listings', listing);
    }, 

    read: function(id) {
      return $http.get('http://localhost:8080/api/listing/' + id);
    }, 

    update: function(id, listing) {
      return $http.put('http://localhost:8080/api/listing/' + id, listing);
    }, 

    delete: function(id) {
      return $http.delete('http://localhost:8080/api/listing/' + id);
    }
  };

  return methods;
});