<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');


var app = module.exports = express();
var connectionString = 'postgres://postgres:@localhost/Stance';
var massiveInstance = massive.connectSync({connectionString : connectionString})

app.set('db', massiveInstance);
var db = app.get('db',
  console.log("database set")
);

app.use(bodyParser.json());
app.use(cors());


app.get('/api/products/', function(req, res){
  console.log(res);
  res.send(res);
})


const port = 3000;
app.listen(port, function(){
  console.log("Ship Docked On", port)
})
||||||| merged common ancestors
=======
const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , session = require('express-session')
    , config = require('./config');

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString: 'postgres://postgres:@localhost/personal-project'});
//'postgres://postgres:@localhost/personal-project'
//config.connectionString    no single quotes

app.use(bodyParser.json());
app.use(express.static(__dirname + './../dist'));

app.use(session({
  secret: config.password,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const port = 3000;    //80

app.set('db', massiveInstance);
const productsControl = require('./backend/server/productsControl');
const usersControl = require('./backend/server/usersControl');
const cartControl = require('./backend/server/cartControl');
const emailListControl = require('./backend/server/emailListControl');
const ordersControl = require('./backend/server/ordersControl');

// PRODUCTS
app.get('/products', productsControl.getProducts);
app.get('/products/:category', productsControl.getProductsByCategory);
app.get('/products/:product_id', productsControl.getSingleProduct);

// USERS
app.post('/register', usersControl.register);
app.post('/login', usersControl.login);

// CART
app.post('/cart', cartControl.getCart);
app.delete('/cart/clear', cartControl.deleteCart);
app.delete('/cart/clear/:product_id/:user_id', cartControl.deleteItemInCart);
app.post('/cart/add', cartControl.createCart);
app.put('/cart/update', cartControl.updateCart);         /*?????????might not need if add to cart does it for us????????????*/

// EMAIL LIST
app.post('/email', emailListControl.addEmail);

// ORDERS
app.get('/orders/:user_id', ordersControl.getOrders);
app.post('/orders/submit', ordersControl.submitOrder);

//TEST////////////////////
app.get('/test', function(req, res) {
  res.status(200).json('test working');
})

app.listen(port, console.log('Listening on port:', port));
