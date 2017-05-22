angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './../views/home.html'
    })
    .state('mens', {
      url: '/mens',
      templateUrl: './../views/mens.html',
      controller: 'mensCtrl'
    })
    .state('womens', {
      url: '/womens',
      templateUrl: './../views/womens.html',
      controller: 'womensCtrl'
    })
    .state('kids', {
      url: '/kids',
      templateUrl: './../views/kids.html',
      controller: 'kidsCtrl'
    })
    .state('login', {
      url: '/login/:user_id',
      templateUrl: './../views/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './../views/register.html',
      controller: 'registerCtrl'
    })
    .state('singleProduct', {
      url: '/singleProduct/:product_id',
      templateUrl: './../views/singleProduct.html',
      controller: 'singleProductCtrl'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: './../views/cart.html',
      controller: 'cartCtrl'
    })
    .state('orders', {
      url: '/orders/:user_id',
      templateUrl: './../views/orders.html',
      controller: 'ordersCtrl'
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: './../views/checkout.html',
      controller: 'checkoutCtrl'
    })

});
