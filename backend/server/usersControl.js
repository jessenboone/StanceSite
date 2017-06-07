const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  register: (req, res) => {
    let user = req.body.user;
    db.register([user.first_name, user.last_name, user.email, user.password, user.newsletter], (err, user) => {
      if (!err) {
        res.send(user);
      } else {
        res.send(err);
      }
    });
  },

  login: (req, res) => {
    let user = req.body;
    let userInfo = [user.email, user.password];
    db.login(userInfo, (err, user) => {
      if (!err) {
        req.session.user = user;
        res.status(200).send(user);
      } else {
        res.send(err)
      }
    });
  },

  checkLoginStatus: (req, res) => {
    console.log('in function');
    if (req.session.user) {
      delete req.session.user[0].password;
      res.status(200).send(req.session.user[0]);
    } else {
      res.status(201).send();
    }
  }
};
