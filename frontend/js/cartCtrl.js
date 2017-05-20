angular.module('app')
.controller('cartCtrl', function($scope, mainSrvc) {

  $scope.test = 'cart working';
  $scope.test2 = mainSrvc.test;




});
