angular.module('app')
.controller('ordersCtrl', function($rootScope, $scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;

  $scope.getOrders = () => {
    mainSrvc.getOrders($rootScope.loggedUser.id).then(function(response) {
      console.log(response);
      $scope.orders = response;
    })
  }
  $scope.getOrders();


});
