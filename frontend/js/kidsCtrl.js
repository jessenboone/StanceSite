angular.module('app')
.controller('kidsCtrl', function($scope, mainSrvc) {

  $scope.test = 'kids working';
  $scope.test2 = mainSrvc.test;




});
