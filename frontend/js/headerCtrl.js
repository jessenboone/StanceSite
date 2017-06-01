angular.module('app')
.directive('headerDirective', function($rootScope) {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html',
    controller: function($scope, $rootScope) {
      if ($rootScope.loggedUser) {
        $scope.user = $rootScope.loggedUser[0];
        // isLoggedIn = true;
      }
    }
  }
})
