angular.module('app')
.controller('singleProductCtrl', function($rootScope, $scope, mainSrvc, $stateParams) {

  $scope.pic1 = true;

  $scope.getSingleProduct = () => {
    mainSrvc.getSingleProduct($stateParams.id).then(function(response) {
      $scope.singleProduct = response;
    });
  }
  $scope.getSingleProduct();

  $scope.createItem = (quantity, purchase) => {
    if ($rootScope.loggedUser) {
      mainSrvc.createCart(quantity, purchase, $rootScope.loggedUser.id).then(function(response) {
        $rootScope.refreshHeader();
      });
    } else {
      console.log('in unlogged function');
      mainSrvc.unloggedUserCart(quantity, purchase).then(function(response) {
        $rootScope.cart = response;
        $rootScope.refreshHeader();
      });
    }

  };

  // $scope.createItem = (quantity, product_id) => {
  //   if($rootScope.loggedUser[0].id){
  //     mainServ.createCart(quantity, product_id).then(function(response){
  //
  //     })
  //   }
  // }

  // $scope.getProducts = () => {
  //   mainSrvc.getProducts($stateParams.mwk).then(function(response) {
  //     console.log(response);
  //     $scope.random = response;
  //   });
  // }
  // $scope.getProducts();

  $scope.showHide = (pic) => {
    $scope.pic1 = false;
    $scope.pic2 = false;
    $scope.pic3 = false;
    $scope[pic] = true;
  };

});
