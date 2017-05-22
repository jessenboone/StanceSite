angular.module('app')
.controller('accountCtrl', function($scope, mainSrvc) {

  $scope.test = 'account working';
  $scope.test2 = mainSrvc.test;



});
