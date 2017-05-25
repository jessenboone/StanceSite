const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {
  addEmail: function(req, res){
     db.add_email(req.body.email_address, function(err, email){
       console.log(req.body.email_address);
       if(!err){
         console.log(req.body.email_address);
         res.send(req.body.email_address);
       }
       else {
         console.log(err);
         res.send(err);
       }
     })
   }
};
