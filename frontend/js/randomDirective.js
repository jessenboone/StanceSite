angular.module('app')
.directive('randomDirective', function(mainSrvc) {

  return {
    restrict: 'E',
    templateUrl: './views/directives/randomDirective.html',
    // scope: {
    //
    // }
    controller: function($scope, $stateParams) {
      $scope.getProducts = () => {
        console.log('stateParams', $stateParams.mwk);
        mainSrvc.getProducts($stateParams.mkw).then(function(response) {
            var arr = []
            var rand = []
            for (var i = 0; i < response.length; i++) {
              if (response[i]['mwk'] === 'Mens') {
                arr.push(response[i]);
              }
            }
            for (var j = 0; j < 4; j++) {
              rand.push(arr[Math.floor(arr.length * Math.random())]);
            }
            $scope.random = rand;

        });
      }
      $scope.getProducts();
    }
  }

})
