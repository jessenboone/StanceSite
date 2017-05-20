angular.module('app')
.controller('womensCtrl', function($scope, mainSrvc) {

  $scope.test = 'womens working';
  $scope.test2 = mainSrvc.test;




});
