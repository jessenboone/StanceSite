const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  addEmail: (req, res) => {
    console.log('addEmail function working')
    let email = req.body.email_address;
    db.add_email(email, (err, addedEmail) => {
      if (!err) {
        res.status(200).send(addedEmail);
      } else {
        res.send(err)
      }
    });
  }

};
