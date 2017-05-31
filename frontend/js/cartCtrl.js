angular.module('app')
.controller('cartCtrl', function($scope, mainSrvc) {

  $scope.test = 'cart working';
  $scope.test2 = mainSrvc.test;

  $scope.getCart = (user) => {
    $scope.subtotal = 0;
    mainSrvc.getCart(user).then((response) => {
      $scope.userCart = response.map(v => {
        v.total = v.quantity * v.product_price
        $scope.subtotal += v.total
        return v
      })
    });
  };

  $scope.deleteItemInCart = (product, item) => {
    mainSrvc(product, item).then((response) => {
      $scope.response = response;
      /*????????????????????*/
    });
  };

  $scope.createItem = (quantity, purchase, user_id = $scope.userId) => {
    mainSrvc.createItem(quantity, purchase, user_id).then(function(response) {
      $scope.getCartTotal($scope.userId);
    });
  };

  $scope.getCartTotal = (user_id = $scope.userId) => {
    $scope.cartTotal = 0;
    mainSrvc.getCart(user_id).then((response) => {
      $scope.cartTotal = response.reduce((acc, value) => {
        return value.quantity + acc;
      }, 0)
    })
  }
  $scope.getCartTotal();

});
