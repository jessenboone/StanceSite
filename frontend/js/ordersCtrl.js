angular.module('app')
.controller('ordersCtrl', function($scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;




});
