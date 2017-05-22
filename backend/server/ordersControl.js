const app = require('./backend/server')
    , db = app.get('db');

module.exports = {

  getOrders: (req, res) => {
    let user = req.params.user_id;
    db.get_orders(user, (err, order) => {
      if (!err) {
        res.status(200).send(order);
      } else {
        res.send(err)
      }
    })
  },

  submitOrder: (req, res) => {
    // WE DONT KNOW WHAT TO DO HERE
    db.submit_order([], (err, order) => {
      if (!err) {
        res.status(200).send(order);
      } else {
        res.send(err)
      }
    })
  }

};
