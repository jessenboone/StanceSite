const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  register: (req, res) => {
    let user = req.body.user;
    console.log(req.body.user);
    db.register([user.first_name, user.last_name, user.email, user.password, user.newsletter], (err, user) => {
      if (!err) {
        res.send(user);
      } else {
        console.log(err);
        res.send(err);
      }
    });
  },

  login: (req, res) => {
    console.log(req.body);
    let user = req.body;
    let userInfo = [user.email, user.password];
    db.login(userInfo, (err, user) => {
      if (!err) {
        res.status(200).send(user);
      } else {
        res.send(err)
      }
    });
  }
};
