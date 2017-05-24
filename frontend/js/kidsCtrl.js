angular.module('app')
.controller('kidsCtrl', function($scope, mainSrvc) {

  $scope.test = 'kids working';

  $scope.getProducts = () => {
    console.log('get products from ctrl');
     mainSrvc.getProducts('Kids', 'Kids').then(function(response) {
       $scope.products = response;
     });
    //  mainSrvc.getProducts('Girls', 'Kids').then(function(response) {
    //    $scope.product = response;
    //  });
    //  mainSrvc.getProducts('Baby Girl', 'Kids').then(function(response) {
    //    $scope.prod = response;
    //  });
   };
   $scope.getProducts();


});
