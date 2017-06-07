angular.module('app')
.directive('randomDirective', function(mainSrvc, $location, $anchorScroll) {

  return {
    restrict: 'E',
    templateUrl: './views/directives/randomDirective.html',
    // scope: {
    //
    // }

    controller: function($scope, $stateParams) {
      $scope.getProducts = () => {
        console.log('stateParams', $stateParams.mwk);
        mainSrvc.getProducts($stateParams.mwk).then(function(response) {
            var arr = []
            var rand = []
            if($stateParams.mwk){
              for (var i = 0; i < response.length; i++) {
                if (response[i]['mwk'] === $stateParams.mwk) {
                  arr.push(response[i]);
                }
              }
              // for (var j = 0; j < 4; j++) {
              //   rand.push(arr[Math.floor(arr.length * Math.random())]);
              // }
              while(rand.length < 4){
                var randomNumber = Math.floor(arr.length * Math.random());
                if(rand.indexOf(arr[randomNumber]) === -1){
                  rand.push(arr[randomNumber]);
                }
              }
            } else {
              while(rand.length < 4){
                var randomNumber = Math.floor(response.length * Math.random());
                if(rand.indexOf(response[randomNumber]) === -1){
                  rand.push(response[randomNumber]);
                }
              }
            }
            $scope.random = rand;

            //////MOVES PAGE TO TOP/////////////
            $location.hash('top');
            $anchorScroll();
        });
      }
      $scope.getProducts();
    }
  }
});
