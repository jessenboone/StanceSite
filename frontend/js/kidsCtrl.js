angular.module('app')
.controller('kidsCtrl', function($scope, mainSrvc) {

  $scope.test = 'kids working';
  $scope.test2 = mainSrvc.test;

  $scope.getProducts = () => {
    mainSrvc.getProducts().then(function(response) {
      $scope.products = response;
    })
  };
  getProducts();

  $scope.getProductsByCategory = (kids) => {
    mainSrvc.getProductsByCategory(kids).then(function(response) {
      $scope.kidsProducts = response;
    });
  };


});
