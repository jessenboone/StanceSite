angular.module('app')
.controller('registerCtrl', function($scope, mainSrvc) {

  $scope.test = 'register working';
  $scope.test2 = mainSrvc.test;




});
