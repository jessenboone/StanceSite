angular.module('app')
.controller('inventoryKidsCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.getProducts = () => {
     mainSrvc.getProducts("Kids").then(function(response) {
       $scope.product = response;
     });
   };
   $scope.getProducts();
});
