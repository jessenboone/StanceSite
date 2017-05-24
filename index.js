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

// app.use(session({
//   secret: config.password,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

const port = 3030;    //80

app.set('db', massiveInstance);
const productsControl = require('./backend/server/productsControl');
// const usersControl = require('./backend/server/usersControl');
// const cartControl = require('./backend/server/cartControl');
const emailListControl = require('./backend/server/emailListControl');
// const ordersControl = require('./backend/server/ordersControl');

// PRODUCTS
app.get('/api/products/:mwk/:category', productsControl.getProducts);
// app.get('/api/products/:category', productsControl.getProductsByMwk);
app.get('/api/product/:id', productsControl.getSingleProduct);

// USERS
// app.post('/register', usersControl.register);
// app.post('/login', usersControl.login);

// CART
// app.post('/cart', cartControl.getCart);
// app.delete('/cart/clear', cartControl.deleteCart);
// app.delete('/cart/clear/:product_id/:user_id', cartControl.deleteItemInCart);
// app.post('/cart/add', cartControl.createCart);
// app.put('/cart/update', cartControl.updateCart);         /*?????????might not need if add to cart does it for us????????????*/

// EMAIL LIST
app.post('/email', emailListControl.addEmail);

// ORDERS
// app.get('/orders/:user_id', ordersControl.getOrders);
// app.post('/orders/submit', ordersControl.submitOrder);

//TEST////////////////////
app.get('/test', function(req, res) {
  res.status(200).json('test working');
})

app.listen(port, () => {
  console.log(`Ship docked on port ${port}`);
});

// app.all('/*', function(req, res, next){
//   res.header("Access-Contro-Allow-Origin", '*');
// })
