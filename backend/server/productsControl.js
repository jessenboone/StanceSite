const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  getProducts: (req, res) => {
    let r = req.params;
    if(r.mwk === 'undefined' && r.category === 'undefined') {
      db.get_products((err, products) => {
        if (!err) {
          return res.status(200).send(products);
        } else {
          return res.send(err);
        }
      })
    }
    else if(r.category === 'undefined' &&  r.mwk) {
      db.get_prods_by_category([r.mwk], (err, products) => {
        if(!err) {
          return res.status(200).send(products);
        }
        else {
          return res.send(err);
        }
      })
    }
    else if (r.category && r.mwk){
      db.get_mwk_category([r.mwk, r.category], (err, products) => {
        if(!err) {
          return res.status(200).send(products);
        }
        else {
          return res.send(err);
        }
      })
    }
  },

  getProductsByMwk: (req, res) => {
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
    db.get_single_product([search], (err, product) => {
      if (!err) {
        res.status(200).send(product);
      } else {
        res.send(err);
      }
    });

}
};
