const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  getCart: (req, res) => {
    let user = req.body[0].user_id;
    db.get_cart([user], (err, cart) => {
      if (!err) {
        res.send(cart);
      } else {
        res.send(err);
      }
    });
  },

  deleteCart: (req, res) => {
    db.delete_cart((err, cart) => {
      console.log(cart, 'in function')
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
    console.log(item, user);
    db.delete_item_in_cart([item, user], (err, cart) => {
      if (!err) {
        console.log(cart);
        res.send(cart);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  },

  createCart: (req, res) => {
    console.log(req.body);
    let item = req.body;
    db.get_cart([item.user_id], (err, cart) => {
      if (!err) {
        let found = false;
        let index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].product_id === item.purchase) {
            index = i;
            found = true;
            cart[i].quantity += item.quantity;
          }
        }
        if (found === false) {
          db.add_to_cart([item.product_id, item.quantity, item.user_id], (err, cart) => {
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


};
