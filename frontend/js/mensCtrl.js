angular.module('app')
.controller('mensCtrl', function($scope, mainSrvc) {

  $scope.getProducts = () => {
    console.log('get products from ctrl');
     mainSrvc.getProducts('Mens', 'New Arrivals').then(function(response) {
       $scope.products = response;
     });
     mainSrvc.getProducts('Mens', 'Super Invisible').then(function(response) {
       $scope.prod = response;
     });
   };
   $scope.getProducts();

});
