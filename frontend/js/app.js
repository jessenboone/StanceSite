angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './frontend/views/home.html'
    })
    .state('mens', {
      url: '/mens',
      templateUrl: './frontend/views/mens.html',
      controller: 'mensCtrl'
    })
    .state('womens', {
      url: '/womens',
      templateUrl: './frontend/views/womens.html',
      controller: 'womensCtrl'
    })
    .state('kids', {
      url: '/kids',
      templateUrl: './frontend/views/kids.html',
      controller: 'kidsCtrl'
    })
    .state('login', {
      url: '/login/:user_id',
      templateUrl: './frontend/views/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './frontend/views/register.html',
      controller: 'registerCtrl'
    })
    .state('singleProduct', {
      url: '/singleProduct/:product_id',
      templateUrl: './frontend/views/singleProduct.html',
      controller: 'singleProductCtrl'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: './frontend/views/cart.html',
      controller: 'cartCtrl'
    })
    .state('orders', {
      url: '/orders/:user_id',
      templateUrl: './frontend/views/orders.html',
      controller: 'ordersCtrl'
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: './frontend/views/checkout.html',
      controller: 'checkoutCtrl'
    })

});
