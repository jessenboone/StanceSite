const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  getProducts: (req, res) => {
    db.get_products((err, products) => {
      if (!err) {
        console.log(products);
        res.status(200).send(products);
      } else {
        res.send(err);
      }
    })
  },

  getProductsByCategory: (req, res) => {
    let category = req.params.category;
    db.get_prods_by_category(category, (err, products) => {
      if (!err) {
        res.status(200).send(products);
      } else {
        res.send(err);
      }
    });
  },

  getSingleProduct: (req, res) => {
    let search = req.params.id;
    console.log(req.params.id);
    db.get_single_product(search, (err, product) => {
      if (!err) {
        res.status(200).send(product);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  }

};
