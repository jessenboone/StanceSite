angular.module('app')
.controller('checkoutCtrl', function($scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;

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
