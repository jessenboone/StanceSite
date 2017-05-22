angular.module('app')
.controller('mensCtrl', function($scope, mainSrvc) {

  $scope.test = 'mens working';
  $scope.test2 = mainSrvc.test;




});
