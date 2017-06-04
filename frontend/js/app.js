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
      url: '/login',
      templateUrl: './../views/login.html',
      controller: 'loginCtrl'
    })
    .state('account', {
      url: '/account',  /*/:user_id*/
      templateUrl: './../views/account.html',
      controller: 'accountCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './../views/register.html',
      controller: 'registerCtrl'
    })
    .state('singleProduct', {
      url: '/single/product/:id/:mwk', /* /:product_id */
      templateUrl: './../views/singleProduct.html',
      controller: 'singleProductCtrl'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: './../views/cart.html',
      controller: 'cartCtrl'
    })
    .state('orders', {
      url: '/orders',  /* /:user_id */
      templateUrl: './../views/orders.html',
      controller: 'ordersCtrl'
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: './../views/checkout.html',
      controller: 'checkoutCtrl'
    })
    .state('billing', {
      url: '/billing',
      templateUrl: './../views/billing.html',
      controller: 'billingCtrl'
    })
    .state("inventory", {
      url: "/inventory",
      templateUrl: "./../views/inventory.html",
      controller: "inventoryCtrl"
    })
    .state("inventoryMens", {
      url: "/inventoryMens",
      templateUrl: "./../views/inventoryMens.html",
      controller: "inventoryMensCtrl"
    })
    .state("inventoryKids", {
      url: "/inventoryKids",
      templateUrl: "./../views/inventoryKids.html",
      controller: "inventoryKidsCtrl"
    })
});

angular.module('app').run(function($rootScope, mainSrvc){
  mainSrvc.checkLoginStatus().then(function(response){
    $rootScope.loggedUser = response.data;
  })
})
