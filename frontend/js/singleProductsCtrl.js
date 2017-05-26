angular.module('app')
.controller('singleProductCtrl', function($scope, mainSrvc, $stateParams) {

  $scope.pic1 = true;

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
    $scope[pic] = true;
  };

});
