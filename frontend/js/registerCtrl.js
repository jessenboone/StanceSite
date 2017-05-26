angular.module('app')
.controller('registerCtrl', function($scope, mainSrvc) {

  $scope.test = 'register working';
  $scope.test2 = mainSrvc.test;

  $scope.isShown = true;
  $scope.isShown2 = true;

  $scope.register = () => {
    console.log('button working!');
    mainSrvc.register($scope.user).then(function(response) {
      /*may need to set default for newsletter*/
    });
  };


});
