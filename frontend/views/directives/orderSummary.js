angular.module('app').directive("orderSummary", function(){
  return {
    restrict: "E",
    templateUrl: "./views/orderSummary.html",
    controller: function($rootScope, $scope) {
      $scope.items = $rootScope.products
      $scope.cartTotal = $rootScope.cartTotal;
    }
  }
})
