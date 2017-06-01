angular.module('app')
.controller('loginCtrl', function($rootScope, $scope, $location, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;

  $scope.noMatch = false;



  $scope.login = (returnUserEmail = $scope.userEmail, returnUserPassword = $scope.userPassword) => {

    mainSrvc.login(returnUserEmail, returnUserPassword).then((response) => {

      if (response[0]) {
        $rootScope.loggedUser = response;
        console.log($rootScope);
        $scope.email = '';
        $scope.password = '';
        $location.path('account');
        $scope.apply();

      } else {
        $scope.noMatch = true;
      }

    });
  }















  // $scope.login = (returnUserEmail, returnUserPassword) => {
  //   mainSrvc.login(returnUserEmail, returnUserPassword).then(function(response) {
  //     $scope.email = response.email;
  //     $scope.password = response.password;
  //
  //     if (returnUserEmail !== user.email && returnUserPassword !== user.password) {
  //
  //     }
  //
  //
  //     else {
  //       // (returnUserEmail === $scope.email && returnUserPassword === $scope.password)
  //
  //       $scope.isLoggedIn = true;
  //       $scope.userId = response.user_id;
  //       $scope.getCartTotal($scope.userId);
  //       $scope.showHide('prods');
  //
  //
  //       user.email = '';
  //       user.password = '';
  //     }
  //
  //       /*check the function names below with the functions in the view page*/
  //
  //
  //   });
  // };


});
