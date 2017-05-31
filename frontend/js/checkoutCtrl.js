angular.module('app')
.controller('checkoutCtrl', function($rootScope, $scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;

  $scope.uspsGround = {
    "name": "USPS Shipping",
    "price": 0.00
  }

  $scope.upsGround = {
    "name": "UPS Ground",
    "price": 7.00
  }

  $scope.upsSecondDay = {
    "name": "UPS Second Day",
    "price": 12.00
  }

  $scope.upsNextDay = {
    "name": "UPS Next Day Delivery",
    "price": 18.00
  }


  $scope.submitOrder = () => {
    /*talk to Todd about this*/
  };

  $scope.deleteCart = () => {
  storeSrvc.deleteCart().then((response) => {
    /*may get rid of this alert function*/
    swal({
      title: "Sweet!",
      text: "Thank you for your purchase!",
      imageUrl: "./sweetalert-master/example/images/thumbs-up.jpg",
      timer: 1000,
      showConfirmButton: false
    });
  });
};

});
