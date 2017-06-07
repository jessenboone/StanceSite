angular.module('app')
.controller('billingCtrl', function($rootScope, $scope, mainSrvc, $location, $anchorScroll, stripe) {


  $scope.checked = true;

  $location.hash('top');
  $anchorScroll();

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

  $scope.charge = function () {
   return stripe.card.createToken($scope.payment.card)
   .then(function (response) {
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      checkoutService.processPayment($scope.total * 100, payment);
   })
   .then(function(payment) {
      swal({
       title: "Thank You!",
       text: "Your order will be shipped within 3 business days.",
       imageUrl: "http://www.sv411.com/wp-content/uploads/GoPro-Logo.jpg",
       confirmButtonText: "Continue exporing GoBro"
      })
      $scope.zeroOut();
      $state.go('home');
   })
   .catch(function (err) {
       if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
       }
       else {
        console.log('Other error occurred, possibly with your API', err.message);
       }
     });
  };


});
