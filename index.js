const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , session = require('express-session')
    , config = require('./backend/config')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0');

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString: config.database_secret});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use(session({
  secret: config.database_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: config.auth0_domain,
  clientID: config.auth0_clientID,
  clientSecret: config.auth0_clientSecret,
  callbackURL: config.auth0_callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  console.log('profile', profile);
  return done(null, profile);
}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: '/#!/',
  failureRedirect: '/auth'
}))

passport.serializeUser(function(user, done) {
  console.log('serial', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('obj', obj);
  done(null, obj);
});

app.get('/user/authed', (req, res, next) => {
  console.log(req.session);
  if (!req.user) {
    return res.status(404).send('User not found')
  } else {
    return res.status(200).send(req.user)
  }
})


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
