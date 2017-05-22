angular.module('app')
.controller('womensCtrl', function($scope, mainSrvc) {

  $scope.test = 'womens working';
  $scope.test2 = mainSrvc.test;

  $scope.getProducts = () => {
    mainSrvc.getProducts().then(function(response) {
      $scope.products = response;
    })
  };
  getProducts();

  $scope.getProductsByCategory = (womens) => {
    mainSrvc.getProductsByCategory(womens).then(function(response) {
      $scope.womensProducts = response;
    });
  };


});
