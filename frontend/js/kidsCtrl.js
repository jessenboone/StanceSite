angular.module('app')
.controller('kidsCtrl', function($scope, mainSrvc) {

  $scope.test = 'kids working';

  $scope.getProducts = () => {
    console.log('get products from ctrl');
     mainSrvc.getProducts('Kids', 'Boys').then(function(response) {
       $scope.products = response;
     });
     mainSrvc.getProducts('Kids', 'Girls').then(function(response) {
       $scope.product = response;
     });
     mainSrvc.getProducts('Kids', 'Baby').then(function(response) {
       $scope.prod = response;
     });
   };
   $scope.getProducts();


});
