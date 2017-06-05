angular.module('app')
.directive('headerDirective', function(mainSrvc) {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html',
    controller: function($scope, $rootScope) {
      if ($rootScope.loggedUser) {
        $scope.user = $rootScope.loggedUser[0];
      }
      $scope.getProducts = () => {
         mainSrvc.getProducts().then(function(response) {
           $scope.products = response;
           console.log(response);
         });
       }
       $scope.getProducts();

    }
  }
})
