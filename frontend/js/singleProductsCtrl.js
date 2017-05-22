angular.module('app')
.controller('singleProductCtrl', function($scope, mainSrvc) {

  $scope.test = 'single product working';
  $scope.test2 = mainSrvc.test;




});
