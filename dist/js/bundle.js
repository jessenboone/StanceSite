'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './../views/home.html'
  }).state('mens', {
    url: '/mens',
    templateUrl: './../views/mens.html',
    controller: 'mensCtrl'
  }).state('womens', {
    url: '/womens',
    templateUrl: './../views/womens.html',
    controller: 'womensCtrl'
  }).state('kids', {
    url: '/kids',
    templateUrl: './../views/kids.html',
    controller: 'kidsCtrl'
  }).state('login', {
    url: '/login/:user_id',
    templateUrl: './../views/login.html',
    controller: 'loginCtrl'
  }).state('register', {
    url: '/register',
    templateUrl: './../views/register.html',
    controller: 'registerCtrl'
  }).state('singleProduct', {
    url: '/singleProduct/:product_id',
    templateUrl: './../views/singleProduct.html',
    controller: 'singleProductCtrl'
  }).state('cart', {
    url: '/cart',
    templateUrl: './../views/cart.html',
    controller: 'cartCtrl'
  }).state('orders', {
    url: '/orders/:user_id',
    templateUrl: './../views/orders.html',
    controller: 'ordersCtrl'
  }).state('checkout', {
    url: '/checkout',
    templateUrl: './../views/checkout.html',
    controller: 'checkoutCtrl'
  });
});
'use strict';

angular.module('app').controller('cartCtrl', function ($scope, mainSrvc) {

  $scope.test = 'cart working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').controller('checkoutCtrl', function ($scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;
});
"use strict";
"use strict";
'use strict';

angular.module('app').controller('kidsCtrl', function ($scope, mainSrvc) {

  $scope.test = 'kids working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').controller('loginCtrl', function ($scope, mainSrvc) {

  $scope.test = 'login working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').service('mainSrvc', function ($http) {

  this.test = 'service working';

  this.getProducts = function (callback) {
    return $http.get('/api/products').then(function (response) {
      console.log(response);
      callback(response);
    }, function (err) {
      callback(err);
      console.log(err);
    });
  };
});
'use strict';

angular.module('app').controller('mensCtrl', function ($scope, mainSrvc) {

  $scope.test = 'mens working';
  $scope.test2 = mainSrvc.test;

  mainSrvc.getProducts(function (data) {
    $scope.products = data;
    console.log(data);
  });
});
'use strict';

angular.module('app').controller('ordersCtrl', function ($scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').controller('registerCtrl', function ($scope, mainSrvc) {

  $scope.test = 'register working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').controller('singleProductCtrl', function ($scope, mainSrvc) {

  $scope.test = 'single product working';
  $scope.test2 = mainSrvc.test;
});
'use strict';

angular.module('app').controller('womensCtrl', function ($scope, mainSrvc) {

  $scope.test = 'womens working';
  $scope.test2 = mainSrvc.test;
});
//# sourceMappingURL=bundle.js.map
