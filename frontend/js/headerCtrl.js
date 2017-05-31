angular.module('app')
.directive('headerDirective', function($rootScope) {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html'

  }

})
