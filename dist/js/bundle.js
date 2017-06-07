'use strict';

angular.module('app', ['ui.router', 'angular-stripe']).config(function ($stateProvider, $urlRouterProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_udqh9s4rjfo18x53kQPAvNrR');

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
    url: '/login',
    templateUrl: './../views/login.html',
    controller: 'loginCtrl'
  }).state('account', {
    url: '/account', /*/:user_id*/
    templateUrl: './../views/account.html',
    controller: 'accountCtrl'
  }).state('register', {
    url: '/register',
    templateUrl: './../views/register.html',
    controller: 'registerCtrl'
  }).state('singleProduct', {
    url: '/single/product/:id/:mwk', /* /:product_id */
    templateUrl: './../views/singleProduct.html',
    controller: 'singleProductCtrl'
  }).state('cart', {
    url: '/cart',
    templateUrl: './../views/cart.html',
    controller: 'cartCtrl'
  }).state('orders', {
    url: '/orders', /* /:user_id */
    templateUrl: './../views/orders.html',
    controller: 'ordersCtrl'
  }).state('checkout', {
    url: '/checkout',
    templateUrl: './../views/checkout.html',
    controller: 'checkoutCtrl'
  }).state('billing', {
    url: '/billing',
    templateUrl: './../views/billing.html',
    controller: 'billingCtrl'
  }).state("inventory", {
    url: "/inventory",
    templateUrl: "./../views/inventory.html",
    controller: "inventoryCtrl"
  }).state("inventoryMens", {
    url: "/inventoryMens",
    templateUrl: "./../views/inventoryMens.html",
    controller: "inventoryMensCtrl"
  }).state("inventoryKids", {
    url: "/inventoryKids",
    templateUrl: "./../views/inventoryKids.html",
    controller: "inventoryKidsCtrl"
  });
});

angular.module('app').run(function ($rootScope, mainSrvc) {
  mainSrvc.checkLoginStatus().then(function (response) {
    $rootScope.loggedUser = response;
  });
});
'use strict';

angular.module('app').controller('billingCtrl', function ($rootScope, $scope, mainSrvc, $location, $anchorScroll, stripe) {

  $scope.checked = true;

  $location.hash('top');
  $anchorScroll();

  $scope.uspsGround = {
    "name": "USPS Shipping",
    "price": 0.00
  };

  $scope.upsGround = {
    "name": "UPS Ground",
    "price": 7.00
  };

  $scope.upsSecondDay = {
    "name": "UPS Second Day",
    "price": 12.00
  };

  $scope.upsNextDay = {
    "name": "UPS Next Day Delivery",
    "price": 18.00
  };

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      checkoutService.processPayment($scope.total * 100, payment);
    }).then(function (payment) {
      swal({
        title: "Thank You!",
        text: "Your order will be shipped within 3 business days.",
        imageUrl: "http://www.sv411.com/wp-content/uploads/GoPro-Logo.jpg",
        confirmButtonText: "Continue exporing GoBro"
      });
      $scope.zeroOut();
      $state.go('home');
    }).catch(function (err) {
      if (err.type && /^Stripe/.test(err.type)) {
        console.log('Stripe error: ', err.message);
      } else {
        console.log('Other error occurred, possibly with your API', err.message);
      }
    });
  };
});
'use strict';

angular.module('app').controller('cartCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.getCart = function () {
    $scope.subtotal = 0;
    if ($rootScope.loggedUser) {
      mainSrvc.getCart($rootScope.loggedUser.id).then(function (response) {
        $rootScope.products = $scope.products = response;
      });
    } else {
      $scope.products = $rootScope.cart;
    }
  };
  $scope.getCart();

  // $scope.deleteItemInCart = (product, item) => {
  //   mainSrvc(product, item).then((response) => {
  //     $scope.response = response;
  //     /*????????????????????*/
  //   });
  // };
  //
  // $scope.createItem = (quantity, purchase, user_id = $scope.userId) => {
  //   mainSrvc.createItem(quantity, purchase, user_id).then(function(response) {
  //     $scope.getCartTotal($scope.userId);
  //   });
  // };

  $scope.getCartTotal = function () {
    var user_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $rootScope.loggedUser.id;

    $scope.cartTotal = 0;
    mainSrvc.getCart(user_id).then(function (response) {
      $rootScope.cartTotal = $scope.cartTotal = response.reduce(function (acc, value) {
        console.log('in the reduce');
        return value.quantity * value.price + acc;
      }, 0);
    });
  };
  $scope.getCartTotal();
});
'use strict';

angular.module('app').controller('checkoutCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;

  $scope.uspsGround = {
    "name": "USPS Shipping",
    "price": 0.00
  };

  $scope.upsGround = {
    "name": "UPS Ground",
    "price": 7.00
  };

  $scope.upsSecondDay = {
    "name": "UPS Second Day",
    "price": 12.00
  };

  $scope.upsNextDay = {
    "name": "UPS Next Day Delivery",
    "price": 18.00
  };

  $scope.submitOrder = function () {
    /*talk to Todd about this*/
  };

  $scope.deleteCart = function () {
    storeSrvc.deleteCart().then(function (response) {
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
"use strict";
'use strict';

angular.module('app').directive('footerDirective', function () {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/footerDirective.html'

  };
});
'use strict';

angular.module('app').directive('headerDirective', function (mainSrvc) {

  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html',

    controller: function controller($scope, $rootScope) {
      if ($rootScope.loggedUser) {
        // $scope.user = $rootScope.loggedUser[0];
        // isLoggedIn = true;
        $scope.user = $rootScope.loggedUser[0];
      }

      $scope.getProducts = function () {
        mainSrvc.getProducts().then(function (response) {
          $scope.products = response;
        });
      };
      $scope.getProducts();

      $scope.getCart = function () {
        $scope.subtotal = 0;
        if ($rootScope.loggedUser) {
          mainSrvc.getCart($rootScope.loggedUser.id).then(function (response) {
            var count = 0;
            for (var i = 0; i < response.length; i++) {
              count += response[i].quantity;
            }
            $scope.c = count;
          });
        } else {
          $scope.c = 0;
        }
      };
      $scope.getCart();

      $rootScope.refreshHeader = function () {
        setTimeout(function () {
          $scope.$apply($scope.getCart());
        }, 100);
      };
    }
  };
});
'use strict';

angular.module('app').directive('helpDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './views/directives/helpDirective.html'
  };
});
'use strict';

angular.module('app').controller('inventoryCtrl', function ($scope, mainSrvc, $stateParams) {

  $scope.getProducts = function () {
    mainSrvc.getProducts("Womens").then(function (response) {
      $scope.product = response;
    });
  };
  $scope.getProducts();
});
'use strict';

angular.module('app').controller('inventoryKidsCtrl', function ($scope, mainSrvc, $stateParams) {

  $scope.getProducts = function () {
    mainSrvc.getProducts("Kids").then(function (response) {
      $scope.product = response;
    });
  };
  $scope.getProducts();
});
'use strict';

angular.module('app').controller('inventoryMensCtrl', function ($scope, mainSrvc, $stateParams) {

  $scope.getProducts = function () {
    mainSrvc.getProducts("Mens").then(function (response) {
      $scope.product = response;
    });
  };
  $scope.getProducts();
});
'use strict';

angular.module('app').controller('kidsCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.test = 'kids working';

  $scope.getProducts = function () {
    console.log('get products from ctrl');
    mainSrvc.getProducts('Kids', 'Boys').then(function (response) {
      $scope.products = response;
    });
    mainSrvc.getProducts('Kids', 'Girls').then(function (response) {
      $scope.product = response;
    });
    mainSrvc.getProducts('Kids', 'Baby').then(function (response) {
      $scope.prod = response;
    });
  };
  $scope.getProducts();
});
'use strict';

angular.module('app').controller('loginCtrl', function ($rootScope, $scope, $location, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.noMatch = false;

  $("#email").keypress(function (event) {
    if (event.which === 13) {
      $("#password").focus();
    }
  });

  $("#password").keypress(function (event) {
    if (event.which === 13) {
      $scope.login();
    }
  });

  $scope.login = function () {
    var returnUserEmail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $scope.userEmail;
    var returnUserPassword = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $scope.userPassword;

    mainSrvc.login(returnUserEmail, returnUserPassword).then(function (response) {
      if (response[0]) {
        $rootScope.loggedUser = response[0];
        $scope.email = '';
        $scope.password = '';
        $location.path('account');
        $rootScope.refreshHeader();
      } else {
        $scope.noMatch = true;
      }
    });

    console.log('login', $rootScope);
  };

  // $scope.login = (returnUserEmail, returnUserPassword) => {
  //   mainSrvc.login(returnUserEmail, returnUserPassword).then(function(response) {
  //     $scope.email = response.email;
  //     $scope.password = response.password;
  //
  //     if (returnUserEmail !== user.email && returnUserPassword !== user.password) {
  //
  //     }
  //
  //
  //     else {
  //       // (returnUserEmail === $scope.email && returnUserPassword === $scope.password)
  //
  //       $scope.isLoggedIn = true;
  //       $scope.userId = response.user_id;
  //       $scope.getCartTotal($scope.userId);
  //       $scope.showHide('prods');
  //
  //
  //       user.email = '';
  //       user.password = '';
  //     }
  //
  //       /*check the function names below with the functions in the view page*/
  //
  //
  //   });
  // };

});
'use strict';

angular.module('app').service('mainSrvc', function ($http) {

  this.test = 'service working';

  // PRODUCTS //////////////////////////////////////////
  this.getProducts = function (mwk, category) {
    return $http({
      method: 'GET',
      url: '/api/products/' + mwk + '/' + category
    }).then(function (response) {
      return response.data;
    });
  };

  this.getSingleProduct = function (param) {
    return $http({
      method: 'GET',
      url: '/api/product/' + param + '/'
    }).then(function (response) {
      return response.data;
    });
  };

  // USERS //////////////////////////////////////////
  this.register = function (user) {
    return $http({
      method: 'POST',
      url: '/api/register',
      data: { user: user }
    }).then(function (response) {
      return response;
    });
  };

  this.login = function (email, password) {
    console.log('service', email, password);
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      return response.data;
    });
  };

  // response => response.data

  // CART //////////////////////////////////////////
  this.getCart = function (user) {
    return $http({
      method: 'POST',
      url: '/api/cart',
      data: { user: user }
    }).then(function (response) {
      return response.data;
    });
  };

  this.deleteCart = function () {
    return $http({
      method: 'DELETE',
      url: '/cart/clear'
    }).then(function (response) {
      return response.data;
    });
  };

  this.deleteItemInCart = function (product, user) {
    return $http({
      method: 'DELETE',
      url: '/cart/clear/' + product + '/' + user
    }).then(function (response) {
      return response;
    });
  };

  this.createCart = function (quantity, purchase, user_id) {
    return $http({
      method: 'POST',
      url: '/api/cart/add',
      data: {
        quantity: quantity,
        purchase: purchase,
        user_id: user_id
      }
    }).then(function (response) {
      return response;
    });
  };

  this.unloggedUserCart = function (quantity, purchase) {
    return $http({
      method: 'POST',
      url: '/api/cart/add/unlogged',
      data: {
        quantity: quantity,
        purchase: purchase
      }
    }).then(function (response) {
      return response.data;
    });
  };

  // EMAIL LIST //////////////////////////////////////////
  this.addEmail = function (email) {
    return $http({
      method: 'POST',
      url: '/email',
      data: { email: email }
    }).then(function (response) {
      return response;
    });
  }; /*FOR THE FOOTER*/

  // ORDERS //////////////////////////////////////////
  this.getOrders = function (user_id) {
    return $http({
      method: 'GET',
      url: '/api/orders/' + user_id
    }).then(function (response) {
      return response.data;
    });
  };

  this.submitOrder = function (order) {
    return $http({
      method: 'POST',
      url: '/api/orders/submit',
      data: { order: order }
    }).then(function (response) {
      return response.data;
    });
  };
  //need to talk to Todd about this
  this.checkLoginStatus = function () {
    return $http({
      method: 'GET',
      url: '/loggedUser'
    }).then(function (response) {
      if (response.status === 200) {
        return response.data;
      } else {
        return;
      }
    });
  }, this.logOut = function () {
    return $http({
      method: 'GET',
      url: "/logout"
    }).then(function (response) {});
  };
});
'use strict';

angular.module('app').controller('mensCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.getProducts = function () {
    mainSrvc.getProducts('Mens', 'New Arrivals').then(function (response) {
      $scope.products = response;
    });
    mainSrvc.getProducts('Mens', 'Super Invisible').then(function (response) {
      $scope.prod = response;
    });
  };
  $scope.getProducts();
});
'use strict';

angular.module('app').controller('ordersCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;

  $scope.getOrders = function () {
    mainSrvc.getOrders($rootScope.loggedUser.id).then(function (response) {
      console.log(response);
      $scope.orders = response;
    });
  };
  $scope.getOrders();
});
'use strict';

angular.module('app').directive('randomDirective', function (mainSrvc, $location, $anchorScroll) {

  return {
    restrict: 'E',
    templateUrl: './views/directives/randomDirective.html',
    // scope: {
    //
    // }

    controller: function controller($scope, $stateParams) {
      $scope.getProducts = function () {
        console.log('stateParams', $stateParams.mwk);
        mainSrvc.getProducts($stateParams.mwk).then(function (response) {
          var arr = [];
          var rand = [];
          if ($stateParams.mwk) {
            for (var i = 0; i < response.length; i++) {
              if (response[i]['mwk'] === $stateParams.mwk) {
                arr.push(response[i]);
              }
            }
            // for (var j = 0; j < 4; j++) {
            //   rand.push(arr[Math.floor(arr.length * Math.random())]);
            // }
            while (rand.length < 4) {
              var randomNumber = Math.floor(arr.length * Math.random());
              if (rand.indexOf(arr[randomNumber]) === -1) {
                rand.push(arr[randomNumber]);
              }
            }
          } else {
            while (rand.length < 4) {
              var randomNumber = Math.floor(response.length * Math.random());
              if (rand.indexOf(response[randomNumber]) === -1) {
                rand.push(response[randomNumber]);
              }
            }
          }
          $scope.random = rand;

          //////MOVES PAGE TO TOP/////////////
          $location.hash('top');
          $anchorScroll();
        });
      };
      $scope.getProducts();
    }
  };
});
'use strict';

angular.module('app').controller('registerCtrl', function ($scope, mainSrvc) {

  $scope.isShown = true;
  $scope.isShown2 = true;

  $scope.register = function (user) {
    var flag = true;
    var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (user.email !== user.email_confirm) {
      $scope.match2 = true;
      flag = false;
    }
    console.log(EMAIL_REGEXP.test(user.email));
    if (!EMAIL_REGEXP.test(user.email)) {
      $scope.match = true;
      flag = false;
    }
    if (user.password.length < 8) {
      $scope.match3 = true;
      flag = false;
    }
    if (user.password !== user.password_confirm) {
      $scope.match4 = true;
      flag = false;
    }
    if (flag) {
      mainSrvc.register(user).then(function (response) {
        user.first_name = '';
        user.last_name = '';
        user.email = '';
        user.email_confirm = '';
        user.password = '';
        user.password_confirm = '';
        $scope.firstNameEmpty = false;
        $scope.lastNameEmpty = false;
        $scope.emailEmpty = false;
        $scope.emailConfirmEmpty = false;
        $scope.passwordEmpty = false;
        $scope.passwordConfirmEmpty = false;
        $scope.match = false;
        $scope.match2 = false;
        $scope.match3 = false;
        $scope.match4 = false;
        /*may need to set default for newsletter*/
      });
    }
  };
});
'use strict';

angular.module('app').controller('singleProductCtrl', function ($rootScope, $scope, mainSrvc, $stateParams) {

  $scope.pic1 = true;

  $scope.getSingleProduct = function () {
    mainSrvc.getSingleProduct($stateParams.id).then(function (response) {
      $scope.singleProduct = response;
    });
  };
  $scope.getSingleProduct();

  $scope.createItem = function (quantity, purchase) {
    if ($rootScope.loggedUser) {
      mainSrvc.createCart(quantity, purchase, $rootScope.loggedUser.id).then(function (response) {
        $rootScope.refreshHeader();
      });
    } else {
      console.log('in unlogged function');
      mainSrvc.unloggedUserCart(quantity, purchase).then(function (response) {
        $rootScope.cart = response;
        $rootScope.refreshHeader();
      });
    }
  };

  // $scope.createItem = (quantity, product_id) => {
  //   if($rootScope.loggedUser[0].id){
  //     mainServ.createCart(quantity, product_id).then(function(response){
  //
  //     })
  //   }
  // }

  // $scope.getProducts = () => {
  //   mainSrvc.getProducts($stateParams.mwk).then(function(response) {
  //     console.log(response);
  //     $scope.random = response;
  //   });
  // }
  // $scope.getProducts();

  $scope.showHide = function (pic) {
    $scope.pic1 = false;
    $scope.pic2 = false;
    $scope.pic3 = false;
    $scope[pic] = true;
  };
});
'use strict';

angular.module('app').controller('accountCtrl', function ($rootScope, $scope, mainSrvc, $location, $timeout) {

  $scope.user = $rootScope.loggedUser;

  $scope.isShown = true;
  $scope.isShown2 = true;
  $scope.isShown3 = true;
  $scope.isShown4 = true;

  $scope.logOut = function () {
    mainSrvc.logOut().then(function (response) {});

    $timeout(function () {
      $location.path("login");
      //  $scope.$apply();
      $rootScope.$apply($rootScope.loggedUser = false);
    }, 300);
  };
});
'use strict';

angular.module('app').directive('userDataDirective', function ($rootScope) {

  return {
    method: 'E',
    templateUrl: './views/directives/userDataDirective.html'
  };
});
'use strict';

angular.module('app').controller('womensCtrl', function ($rootScope, $scope, mainSrvc) {

  $scope.test = 'womens working';
  $scope.test2 = mainSrvc.test;

  $scope.getProducts = function () {
    console.log('get products from ctrl');
    mainSrvc.getProducts('Womens', 'New Arrivals').then(function (response) {
      $scope.products = response;
    });
    mainSrvc.getProducts('Womens', 'Training').then(function (response) {
      $scope.product = response;
    });
    mainSrvc.getProducts('Womens', 'Uncommon Solids').then(function (response) {
      $scope.prod = response;
    });
  };
  $scope.getProducts();
});
"use strict";

angular.module('app').directive("kidsCarousel", function () {
  return {
    restrict: "E",
    templateUrl: "./views/kidsCarousel.html",
    link: function link(scope, element, attributes) {}
  };
});
"use strict";

angular.module('app').directive("orderSummary", function () {
  return {
    restrict: "E",
    templateUrl: "./views/orderSummary.html",
    controller: function controller($rootScope, $scope) {
      $scope.items = $rootScope.products;
      $scope.cartTotal = $rootScope.cartTotal;
    }
  };
});
"use strict";

angular.module('app').directive("featured", function () {
  return {
    restrict: "E",
    templateUrl: "./views/featured.html"
  };
});
"use strict";

angular.module('app').directive("punksAndPoets", function () {
  return {
    restrict: "E",
    templateUrl: "./views/punksAndPoets.html"
  };
});
//# sourceMappingURL=bundle.js.map
