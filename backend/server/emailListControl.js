const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {
  addEmail: function(req, res){
     db.add_email(req.body.email_address, function(err, email){
       if(!err){
         res.send(req.body.email_address);
       }
       else {
         res.send(err);
       }
     })
   }
};
