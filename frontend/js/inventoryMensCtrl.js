angular.module('app')
.controller('inventoryMensCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.getProducts = () => {
     mainSrvc.getProducts("Mens").then(function(response) {
       $scope.product = response;
     });
   };
   $scope.getProducts();
});
