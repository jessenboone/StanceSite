angular.module('app')
.controller('accountCtrl', function($rootScope, $scope, mainSrvc) {

  $scope.user = $rootScope.loggedUser[0];

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.isShown3 = true;
  $scope.isShown4 = true;
});
