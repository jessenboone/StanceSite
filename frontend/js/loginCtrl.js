angular.module('app')
.controller('loginCtrl', function($scope, mainSrvc) {

  $scope.test = 'login working';
  $scope.test2 = mainSrvc.test;

  $scope.isShown = true;
  $scope.isShown2 = true;




});
