const app = require('./backend/server')
    , db = app.get('db');

module.exports = {

  addEmail: (req, res) => {
    let email = req.body.email;
    db.add_email(email, (err, addedEmail) => {
      if (!err) {
        res.status(200).send(addedEmail);
      } else {
        res.send(err)
      }
    });
  }

};
