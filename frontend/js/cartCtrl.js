angular.module('app')
.controller('cartCtrl', function($rootScope, $scope, mainSrvc) {


  $scope.getCart = () => {
    $scope.subtotal = 0;
    if ($rootScope.loggedUser) {
      mainSrvc.getCart($rootScope.loggedUser.id).then((response) => {
        $rootScope.products = $scope.products = response;

      });
    } else {
      $scope.products = $rootScope.cart;
    }
  };
  $scope.getCart();

  // $scope.deleteItemInCart = (product, item) => {
  //   mainSrvc(product, item).then((response) => {
  //     $scope.response = response;
  //     /*????????????????????*/
  //   });
  // };
  //
  // $scope.createItem = (quantity, purchase, user_id = $scope.userId) => {
  //   mainSrvc.createItem(quantity, purchase, user_id).then(function(response) {
  //     $scope.getCartTotal($scope.userId);
  //   });
  // };

  $scope.getCartTotal = (user_id = $rootScope.loggedUser.id) => {
    $scope.cartTotal = 0;
    mainSrvc.getCart(user_id).then((response) => {
      $rootScope.cartTotal = $scope.cartTotal = response.reduce((acc, value) => {
        console.log('in the reduce');
        return (value.quantity * value.price) + acc;
      }, 0)
    })
  }
  $scope.getCartTotal();

});
