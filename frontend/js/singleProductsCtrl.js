angular.module('app')
.controller('singleProductCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.test = 'single product working';
  $scope.test2 = mainSrvc.test;

  $scope.div1 = true;
  $scope.div2 = true;
  $scope.div3 = true;

  $scope.getSingleProduct = () => {
    mainSrvc.getSingleProduct($stateParams.product_id).then(function(response) {
      $scope.singleProduct = response;
    });
  }
  $scope.getSingleProduct();

  $scope.showHide = (pic) => {
    $scope.pic1 = false;
    $scope.pic2 = false;
    $scope.pic3 = false;
    $scope.pic = true;
  }

});
