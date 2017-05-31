angular.module('app')
.controller('registerCtrl', function($scope, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;

  $scope.register = (user) => {
    var flag = true;
    const EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (user.email !== user.email_confirm) {
      $scope.match2 = true;
      flag = false;
    }
    console.log(EMAIL_REGEXP.test(user.email));
    if (!EMAIL_REGEXP.test(user.email)) {
      $scope.match = true;
      flag = false;
    }
    if (user.password.length < 8) {
      $scope.match3 = true;
      flag = false;
    }
    if (user.password !== user.password_confirm) {
      $scope.match4 = true;
      flag = false;
    }
    if (flag) {
      mainSrvc.register(user).then(function(response) {
        user.first_name = '';
        user.last_name = '';
        user.email = '';
        user.email_confirm = '';
        user.password = '';
        user.password_confirm = '';
        $scope.firstNameEmpty = false;
        $scope.lastNameEmpty = false;
        $scope.emailEmpty = false;
        $scope.emailConfirmEmpty = false;
        $scope.passwordEmpty = false;
        $scope.passwordConfirmEmpty = false;
        $scope.match = false;
        $scope.match2 = false;
        $scope.match3 = false;
        $scope.match4 = false;
        /*may need to set default for newsletter*/
      });
    }
  };

});
