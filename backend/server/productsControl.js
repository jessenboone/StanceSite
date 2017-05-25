const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  getProducts: (req, res) => {
    let r = req.params;
    console.log(r.mwk, r.category);
    if(r.mwk === 'undefined' && r.category === 'undefined') {
      db.get_products((err, products) => {
        console.log('getting all products');
        if (!err) {
          return res.status(200).send(products);
        } else {
          console.log(err);
          return res.send(err);
        }
      })
    }
    else if(r.category === 'undefined' &&  r.mwk) {
      console.log('running prods by cat.');
      db.get_prods_by_category([r.category], (err, products) => {
        if(!err) {
          return res.status(200).send(products);
        }
        else {
          return res.send(err);
        }
      })
    }
    else if (r.category && r.mwk){
      console.log('mwk & cat.');
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
    console.log(req.params.id);
    console.log('single product function working!', search);
    db.get_single_product([search], (err, product) => {
      if (!err) {
        res.status(200).send(product);
      } else {
        console.log(err);
        res.send(err);
      }
    });

}
};
