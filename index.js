const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , session = require('express-session')
    , config = require('./backend/config');
    // , passport = require('passport') -- used for auth0
    // , Auth0Strategy = require('passport-auth0'); --used for auth0

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString: config.database_secret});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use(session({
  cookieName: "session",
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
  // cookie: { maxAge:600000 }
}));

// app.use(passport.initialize()); --used for auth0
// app.use(passport.session()); -- used for auth0

// passport.use(new Auth0Strategy({ --used for auth0
//   domain: config.auth0_domain, --used for auth0
//   clientID: config.auth0_clientID, --used for auth0
//   clientSecret: config.auth0_clientSecret, --used for auth0
//   callbackURL: config.auth0_callbackURL --used for auth0
// }, function(accessToken, refreshToken, extraParams, profile, done) { --used for auth0
//   console.log('profile', profile); --used for auth0
//   return done(null, profile); --used for auth0
// }));
//
// app.get('/auth', passport.authenticate('auth0')); --used for auth0
//
// app.get('/auth/callback', passport.authenticate('auth0', { --used for auth0
//   successRedirect: '/#!/', --used for auth0
//   failureRedirect: '/auth' --used for auth0
// }))
//
// passport.serializeUser(function(user, done) { --used for auth0
//   console.log('serial', user); --used for auth0
//   done(null, user); --used for auth0
// });
//
// passport.deserializeUser(function(obj, done) { --used for auth0
//   console.log('obj', obj); --used for auth0
//   done(null, obj); --used for auth0
// });
//
// app.get('/user/authed', (req, res, next) => { --used for auth0
//   console.log(req.session); --used for auth0
//   if (!req.user) { --used for auth0
//     return res.status(404).send('User not found') --used for auth0
//   } else { --used for auth0
//     return res.status(200).send(req.user) --used for auth0
//   } --used for auth0
// })


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
app.get("/loggedUser", usersControl.checkLoginStatus)
app.get('/logout', function(req, res) {
  req.session.destroy();
});

// CART
app.post('/api/cart', cartControl.getCart);
app.delete('/api/cart/clear', cartControl.deleteCart);
app.delete('/api/cart/clear/:product_id/:user_id', cartControl.deleteItemInCart);
app.post('/api/cart/add', cartControl.createCart);
app.put('/api/cart/update', cartControl.createCart);
app.post('/api/cart/add/unlogged', cartControl.unloggedUserCart);  

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
