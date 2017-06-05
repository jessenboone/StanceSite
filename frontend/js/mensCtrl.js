angular.module('app')
.controller('mensCtrl', function($rootScope, $scope, mainSrvc) {


  $scope.getProducts = () => {
     mainSrvc.getProducts('Mens', 'New Arrivals').then(function(response) {
       $scope.products = response;
     });
     mainSrvc.getProducts('Mens', 'Super Invisible').then(function(response) {
       $scope.prod = response;
     });
   };
   $scope.getProducts();

});
