angular.module('app')
.controller('mensCtrl', function($scope, mainSrvc) {

  $scope.test = 'mens working';
  $scope.test2 = mainSrvc.test;

  $scope.getProducts = () => {
    mainSrvc.getProducts().then(function(response) {
      $scope.products = response;
    });
  };
  getProducts();

  $scope.getProductsByCategory = (mens) => {
    mainSrvc.getProductsByCategory(mens).then(function(response) {
      $scope.mensProducts = response;
    });
  };

});
