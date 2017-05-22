angular.module('app')
.service('mainSrvc', function($http) {

  this.test = 'service working'

  this.getProducts = function(callback){
    return $http.get('/api/products').then(
      function(response){
        console.log(response);
        callback(response.data);
      },
      function(err){
        callback(err);
        console.log(err);
      })
  }


});
