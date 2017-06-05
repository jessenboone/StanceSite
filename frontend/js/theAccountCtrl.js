angular.module('app')
.controller('accountCtrl', function($rootScope, $scope, mainSrvc, $location, $timeout) {

  $scope.user = $rootScope.loggedUser;

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.isShown3 = true;
  $scope.isShown4 = true;

  $scope.logOut = () => {
     mainSrvc.logOut().then(response => {});

     $timeout(() => {
       $location.path("login");
      //  $scope.$apply();
       $rootScope.$apply($rootScope.loggedUser = false);
     }, 300);
   };
});
