const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  getCart: (req, res) => {
    if (req.body.user) {
      let user = req.body.user;
      db.get_cart([user], (err, cart) => {
        if (!err) {
          res.send(cart);
        } else {
          res.send(err);
        }
      });

    } else {
      console.log('unlogggedUser', req.session.cart);
      let cart = req.session.cart;
      res.status(200).send();
    }

  },

  deleteCart: (req, res) => {
    db.delete_cart((err, cart) => {
      if (!err) {
        res.send(cart);
      } else {
        res.send(err);
      }
    });
  },

  deleteItemInCart: (req, res) => {
    let item = req.params.product_id;
    let user = req.params.user_id;
    db.delete_item_in_cart([item, user], (err, cart) => {
      if (!err) {
        res.send(cart);
      } else {
        res.send(err);
      }
    });
  },

  createCart: (req, res) => {
    let item = req.body;
    db.get_cart([item.user_id], (err, cart) => {
      if (!err) {
        let found = false;
        let index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].product_id === item.purchase) {
            index = i;
            found = true;
            cart[i].quantity += parseInt(item.quantity);
          }
        }
        if (found === false) {
          db.add_to_cart([item.purchase, item.quantity, item.user_id], (err, cart) => {
            if (!err) {
              res.status(200).send(cart);
            } else {
              res.send(err);
            }
          })
        } else {
          db.update_quantity([cart[index].product_id, cart[index].quantity, cart[index].user_id], (err) => {
            if (!err) {
              res.status(200).send();
            } else {
              res.send(err);
            }
          })
        }
      }
      else {
        res.send(err);
      }
    })
  },

  unloggedUserCart: (req, res) => {
    var item = req.body.purchase;
    var quantity = req.body.quantity;
    var itemsInCart = req.session.cart || [];
    if (itemsInCart.length > 0) {
      for (var i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].item === item) {
          itemsInCart[i].quantity += parseInt(quantity);
        } else {
          itemsInCart.push({item, quantity});
        }
      }
    } else {
      itemsInCart.push({item, quantity});
    }
    req.session.cart = itemsInCart;
    res.status(200).send(req.session.cart)
  }

};
