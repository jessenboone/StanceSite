const app = require('./backend/server')
    , db = app.get('db');

module.exports = {

  getCart: (req, res) => {
    let user = req.body.user;
    db.get_cart([user], (err, cart) => {
      // console.log(cart);
      if (!err) {
        res.send(cart);
      } else {
        res.send(err);
      }
    });
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
            cart[i].quantity += item.quantity;
          }
        }
        if (found === false) {
          db.add_to_cart([item.purchase, item.quantity, item.user_id], (err) => {
            if (!err) {
              res.status(200).send();
            } else {
              res.send(err);
            }
          })
        } else {
          db.update_quantity([cart[index].product_id, cart[index].quantity, cart[index].customer_id], (err) => {
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
  }

};
