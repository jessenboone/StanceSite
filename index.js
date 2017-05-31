const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , session = require('express-session')
    , config = require('./backend/config');

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString: config.database_secret});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use(session({
  cookieName: "session",
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

const port = 3030;    //80

app.set('db', massiveInstance);
const productsControl = require('./backend/server/productsControl');
const usersControl = require('./backend/server/usersControl');
const cartControl = require('./backend/server/cartControl');
const emailListControl = require('./backend/server/emailListControl');
const ordersControl = require('./backend/server/ordersControl');

// PRODUCTS
app.get('/api/products/:mwk/:category', productsControl.getProducts);
app.get('/api/products/:category', productsControl.getProductsByMwk);
app.get('/api/product/:id', productsControl.getSingleProduct);

// USERS
app.post('/api/register', usersControl.register);
app.post('/api/login', usersControl.login);
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

// CART
app.post('/api/cart', cartControl.getCart);
app.delete('/api/cart/clear', cartControl.deleteCart);
app.delete('/api/cart/clear/:product_id/:user_id', cartControl.deleteItemInCart);
app.post('/api/cart/add', cartControl.createCart);
app.put('/api/cart/update', cartControl.createCart);     /* still not working - needs more configuring */

// EMAIL LIST
app.post('/api/email', emailListControl.addEmail);

// ORDERS
app.get('/api/orders/:user_id', ordersControl.getOrders);
app.post('/api/orders/submit', ordersControl.submitOrder); /* not in working order */

//TEST////////////////////
app.get('/test', function(req, res) {
  res.status(200).json('test working');
})

app.listen(port, () => {
  console.log(`Ship docked on port ${port}`);
});
