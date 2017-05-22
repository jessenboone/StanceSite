const app = require('./backend/server')
    , db = app.get('db');

module.exports = {

  getProducts: (req, res) => {
    db.get_products((err, products) => {
      if (!err) {
        res.status(200).send(products);
      } else {
        res.send(err);
      }
    })
  },

  getProductsByCategory: (req, res) => {
    let category = req.params.category;
    db.get_products_by_category(category, (err, products) => {
      if (!err) {
        res.status(200).send(products);
      } else {
        res.send(err);
      }
    });
  },

  getSingleProduct: (req, res) => {
    let search = req.params.product_id;
    db.get_single_product(search, (err, product) => {
      if (!err) {
        res.status(200).send(product);
      } else {
        res.send(err);
      }
    });
  }

};
