angular.module('app')
.controller('loginCtrl', function($scope, mainSrvc) {

  $scope.test = 'login working';
  $scope.test2 = mainSrvc.test;

  $scope.isShown = true;
  $scope.isShown2 = true;

  $scope.login = (returnUserEmail, returnUserPassword) => {
    mainSrvc.login(returnUserEmail, returnUserPassword).then(function(response) {
      $scope.email = response.email;
      $scope.password = response.password;
      if (returnUserEmail === $scope.email && returnUserPassword === $scope.password) {

        /*check the function names below with the functions in the view page*/


        $scope.isLoggedIn = true;
        $scope.userId = response.user_id;
        $scope.getCartTotal($scope.userId);
        $scope.showHide('prods');
      }
    });
  };


});
