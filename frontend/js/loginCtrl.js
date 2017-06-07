angular.module('app')
.controller('loginCtrl', function($rootScope, $scope, $location, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.noMatch = false;

$("#email").keypress(function(event) {
  if (event.which === 13) {
    $("#password").focus()
  }
});

$("#password").keypress(function(event) {
  if (event.which === 13) {
    $scope.login();
  }
});

  $scope.login = (returnUserEmail = $scope.userEmail, returnUserPassword = $scope.userPassword) => {
    mainSrvc.login(returnUserEmail, returnUserPassword).then((response) => {
      if (response[0]) {
        $rootScope.loggedUser = response[0];
        $scope.email = '';
        $scope.password = '';
        $location.path('account');
        $rootScope.refreshHeader();
      } else {
        $scope.noMatch = true;
      }
    });

    console.log('login', $rootScope);
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
