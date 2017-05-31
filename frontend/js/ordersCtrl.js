angular.module('app')
.controller('ordersCtrl', function($rootScope, $scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;

  $scope.getOrders = (user_id) => {
    mainSrvc.getOrders(user_id).then(function(response) {
      $scope.order = response;
    })
  }


});
