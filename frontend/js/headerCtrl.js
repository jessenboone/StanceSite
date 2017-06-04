angular.module('app')
.directive('headerDirective', function(mainSrvc) {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html',
    // scope: {total: '='},
    controller: function($rootScope, $scope) {
      if ($rootScope.loggedUser) {
        // $scope.user = $rootScope.loggedUser[0];
        // isLoggedIn = true;
        $scope.user = $rootScope.loggedUser[0];
      }
      console.log($rootScope);
      $scope.getCart = () => {
        console.log($rootScope.loggedUser);
        $scope.subtotal = 0;
        if ($rootScope.loggedUser) {
          mainSrvc.getCart($rootScope.loggedUser.id).then((response) => {
            let count = 0;
            for (var i = 0; i < response.length; i++) {
              count += response[i].quantity;
            }
            $scope.c = count;
          });
        } else {
          $scope.c = 0;
        }

      };
      $scope.getCart();

      $rootScope.refreshHeader = function() {
        setTimeout(function() {
          $scope.$apply($scope.getCart());
        }, 100);
      };

    }
  }
});
