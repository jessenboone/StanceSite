angular.module('app')
.controller('loginCtrl', function($rootScope, $scope, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.isLoggedIn = false;


  $scope.login = (returnUserEmail = $scope.email, returnUserPassword = $scope.password) => {

    mainSrvc.login(returnUserEmail, returnUserPassword).then((response) => {

      if (response[0]) {
        $rootScope.loggedUser = response;
        console.log($rootScope);
      } else {
        console.log('wrong user');
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
