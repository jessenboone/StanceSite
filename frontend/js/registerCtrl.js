angular.module('app')
.controller('registerCtrl', function($scope, mainSrvc) {

  $scope.test = 'register working';
  $scope.test2 = mainSrvc.test;

  $scope.register = (user) => {
    mainSrvc.register(user).then(function(response) {
      user.first_name = '';
      user.last_name = '';
      user.email = '';
      user.password = '';
      /*may need to set default for newsletter*/
    });
  };


});
