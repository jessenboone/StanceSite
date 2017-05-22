angular.module('app')
.controller('checkoutCtrl', function($scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;




});
