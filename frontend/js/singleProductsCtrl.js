angular.module('app')
.controller('singleProductCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.test = 'single product working';
  $scope.test2 = mainSrvc.test;

  $scope.getSingleProduct = () => {
    mainSrvc.getSingleProduct($stateParams.product_id).then(function(response) {
      $scope.singleProduct = response;
    });
  }
  $scope.getSingleProduct();



});
