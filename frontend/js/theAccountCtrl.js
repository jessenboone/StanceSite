angular.module('app')
.controller('accountCtrl', function($rootScope, $scope, mainSrvc, $location, $timeout) {

  $scope.user = $rootScope.loggedUser[0];

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.isShown3 = true;
  $scope.isShown4 = true;

  $scope.logOut = () => {
     mainSrvc.logOut().then(response => {

     });

     $timeout(() => {
       $location.path("login");
       $scope.$apply();
     }, 300);
   };
});
