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
  }).state('account', {
    url: '/account/:user_id',
    templateUrl: './../views/account.html',
    controller: 'accountCtrl'
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

  $scope.getCart = function (user) {
    $scope.subtotal = 0;
    storeSrvc.getCart(user).then(function (response) {
      $scope.userCart = response.map(function (v) {
        v.total = v.quantity * v.product_price;
        $scope.subtotal += v.total;
        return v;
      });
    });
  };

  $scope.deleteItemInCart = function (product, item) {
    storeSrvc(product, item).then(function (response) {
      $scope.response = response;
      /*????????????????????*/
    });
  };

  $scope.createItem = function (quantity, purchase) {
    var user_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : $scope.userId;

    storeSrvc.createItem(quantity, purchase, user_id).then(function (response) {
      $scope.getCartTotal($scope.userId);
    });
  };

  $scope.getCartTotal = function () {
    var user_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $scope.userId;

    $scope.cartTotal = 0;
    storeSrvc.getCart(user_id).then(function (response) {
      $scope.cartTotal = response.reduce(function (acc, value) {
        return value.quantity + acc;
      }, 0);
    });
  };
  $scope.getCartTotal();
});
'use strict';

angular.module('app').controller('checkoutCtrl', function ($scope, mainSrvc) {

  $scope.test = 'checkout working';
  $scope.test2 = mainSrvc.test;
<<<<<<< HEAD

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
||||||| merged common ancestors
=======

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
'use strict';

angular.module('app').directive('footerDirective', function () {

  return {
    restrict: 'E',
    templateUrl: '../../frontend/views/directives/footerDirective.html'

  };
});
'use strict';

angular.module('app').directive('headerDirective', function () {

  // menMenu = false;
  //
  // womenMenu = false;
  //
  // kidMenu = false;
  //
  // underwearMenu = false;
  //
  // discoverMenu = false;


  return {
    restrict: 'E',
    templateUrl: '../views/directives/headerDirective.html'

  };
>>>>>>> master
});
'use strict';

angular.module('app').controller('kidsCtrl', function ($scope, mainSrvc) {

  $scope.test = 'kids working';
<<<<<<< HEAD

  $scope.getProducts = function () {
    console.log('get products from ctrl');
    mainSrvc.getProducts('Kids', 'Kids').then(function (response) {
      $scope.products = response;
    });
    //  mainSrvc.getProducts('Girls', 'Kids').then(function(response) {
    //    $scope.product = response;
    //  });
    //  mainSrvc.getProducts('Baby Girl', 'Kids').then(function(response) {
    //    $scope.prod = response;
    //  });
  };
  $scope.getProducts();
||||||| merged common ancestors
  $scope.test2 = mainSrvc.test;
=======
  $scope.test2 = mainSrvc.test;

  $scope.getProducts = function () {
    mainSrvc.getProducts().then(function (response) {
      $scope.products = response;
    });
  };
  getProducts();

  $scope.getProductsByCategory = function (kids) {
    mainSrvc.getProductsByCategory(kids).then(function (response) {
      $scope.kidsProducts = response;
    });
  };
>>>>>>> master
});
'use strict';

angular.module('app').controller('loginCtrl', function ($scope, mainSrvc) {

  $scope.test = 'login working';
  $scope.test2 = mainSrvc.test;

  $scope.login = function (returnUserEmail, returnUserPassword) {
    mainSrvc.login(returnUserEmail, returnUserPassword).then(function (response) {
      $scope.email = response.email;
      $scope.password = response.password;
      if (returnUserEmail === $scope.email && returnUserPassword === $scope.password) {

        /*check the function names below with the functions in the view page*/

        $scope.isLoggedIn = true;
        $scope.userId = response.user_id;
        $scope.getCartTotal($scope.userId);
        $scope.showHide('prods');
      }
    });
  };
});
'use strict';

angular.module('app').service('mainSrvc', function ($http) {

<<<<<<< HEAD
  this.getProducts = function (mwk, category) {
    return $http({
      method: 'GET',
      url: '/api/products/' + mwk + '/' + category
    }).then(function (response) {
      return response.data;
    });
  };

  //  this.getProductsByMwk = (mwk) => {
  //    return $http({
  //       method: 'GET',
  //       url: '/api/products/' + mwk
  //     }).then(response => response.data)
  //   };
||||||| merged common ancestors
  this.test = 'service working';
<<<<<<< HEAD
=======
  // PRODUCTS //////////////////////////////////////////
  this.test = 'service working';
>>>>>>> master

  this.getSingleProduct = function (param) {
    return $http({
      method: 'GET',
      url: '/products/' + param
    }).then(function (response) {
      return response.data;
    });
  };

<<<<<<< HEAD
  // USERS //////////////////////////////////////////
  this.register = function (user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: { user: user }
    }).then(function (response) {
      return response;
    });
  };

  this.login = function (email, password) {
    return $http({
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      return response.data;
    } /*index number from table*/);
  };

  // CART //////////////////////////////////////////
  this.getCart = function (user) {
    return $http({
      method: 'POST',
      url: '/cart',
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
      url: '/create/cart',
      data: {
        quantity: quantity,
        purchase: purchase,
        user_id: user_id
      }
    }).then(function (response) {
      return response;
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
||||||| merged common ancestors
  this.getProducts = function () {
=======
  this.getProductsByCategory = function (param) {
>>>>>>> master
    return $http({
      method: 'GET',
<<<<<<< HEAD
      url: '/orders/' + user_id
    }).then(function (response) {
      return response.data;
    });
  };

  this.submitOrder = function (order) {
    return $http({
      method: 'POST',
      url: '/orders/submit',
      data: { order: order }
||||||| merged common ancestors
      url: '/products'
=======
      url: '/products/' + param
>>>>>>> master
    }).then(function (response) {
      return response.data;
    });
  };
<<<<<<< HEAD
  //need to talk to Todd about this
||||||| merged common ancestors
>>>>>>> master
=======

  this.getSingleProduct = function (param) {
    return $http({
      method: 'GET',
      url: '/products/' + param
    }).then(function (response) {
      return response.data;
    });
  };

  // USERS //////////////////////////////////////////
  this.register = function (user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: { user: user }
    }).then(function (response) {
      return response;
    });
  };

  this.login = function (email, password) {
    return $http({
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      return response.data;
    } /*index number from table*/);
  };

  // CART //////////////////////////////////////////
  this.getCart = function (user) {
    return $http({
      method: 'POST',
      url: '/cart',
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
      url: '/create/cart',
      data: {
        quantity: quantity,
        purchase: purchase,
        user_id: user_id
      }
    }).then(function (response) {
      return response;
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
      url: '/orders/' + user_id
    }).then(function (response) {
      return response.data;
    });
  };

  this.submitOrder = function (order) {
    return $http({
      method: 'POST',
      url: '/orders/submit',
      data: { order: order }
    }).then(function (response) {
      return response.data;
    });
  };
  //need to talk to Todd about this
>>>>>>> master
});
'use strict';

angular.module('app').controller('mensCtrl', function ($scope, mainSrvc) {

<<<<<<< HEAD
  $scope.getProducts = function () {
    console.log('get products from ctrl');
    mainSrvc.getProducts('Mens', 'New Arrivals').then(function (response) {
      $scope.products = response;
    });
    mainSrvc.getProducts('Mens', 'Super Invisible').then(function (response) {
      $scope.prod = response;
    });
  };
  $scope.getProducts();
||||||| merged common ancestors
  $scope.test = 'mens working';
  $scope.test2 = mainSrvc.test;

  mainSrvc.getProducts(function (data) {
    $scope.products = data;
    console.log(data);
  });
=======
  $scope.test = 'mens working';
  $scope.test2 = mainSrvc.test;

  mainSrvc.getProducts(function (data) {
    $scope.products = data;
    console.log(data);
  });

  $scope.getProductsByCategory = function (mens) {
    mainSrvc.getProductsByCategory(mens).then(function (response) {
      $scope.mensProducts = response;
    });
  };
>>>>>>> master
});
'use strict';

angular.module('app').controller('ordersCtrl', function ($scope, mainSrvc) {

  $scope.test = 'orders working';
  $scope.test2 = mainSrvc.test;

  $scope.getOrders = function (user_id) {
    mainSrvc.getOrders(user_id).then(function (response) {
      $scope.order = response;
    });
  };
});
'use strict';

angular.module('app').controller('registerCtrl', function ($scope, mainSrvc) {

  $scope.test = 'register working';
  $scope.test2 = mainSrvc.test;

  $scope.register = function (user) {
    mainSrvc.register(user).then(function (response) {
      user.first_name = '';
      user.last_name = '';
      user.email = '';
      user.password = '';
      /*may need to set default for newsletter*/
    });
  };
});
'use strict';

angular.module('app').controller('singleProductCtrl', function ($scope, mainSrvc) {

  $scope.test = 'single product working';
  $scope.test2 = mainSrvc.test;
<<<<<<< HEAD

  $scope.getSingleProduct = function (product) {
    mainSrvc.getSingleProduct(product).then(function (response) {
      $scope.singleProduct = response;
    });
  };
||||||| merged common ancestors
=======

  $scope.getSingleProduct = function (product) {
    mainSrvc.getSingleProduct(product).then(function (response) {
      $scope.singleProduct = response;
    });
  };
});
'use strict';

angular.module('app').controller('accountCtrl', function ($scope, mainSrvc) {

  $scope.test = 'account working';
  $scope.test2 = mainSrvc.test;
>>>>>>> master
});
'use strict';

angular.module('app').controller('womensCtrl', function ($scope, mainSrvc) {

  $scope.test = 'womens working';
  $scope.test2 = mainSrvc.test;
<<<<<<< HEAD

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
||||||| merged common ancestors
=======

  $scope.getProducts = function () {
    mainSrvc.getProducts().then(function (response) {
      $scope.products = response;
    });
  };
  getProducts();

  $scope.getProductsByCategory = function (womens) {
    mainSrvc.getProductsByCategory(womens).then(function (response) {
      $scope.womensProducts = response;
    });
  };
>>>>>>> master
});
//# sourceMappingURL=bundle.js.map
