angular.module('app')
.controller('inventoryCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.getProducts = () => {
     mainSrvc.getProducts("Womens").then(function(response) {
       $scope.product = response;
     });
   };
   $scope.getProducts();
});
