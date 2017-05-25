const app = require('../.././index.js')
    , db = app.get('db');

module.exports = {

  register: (req, res) => {
    let user = req.body;
    console.log(req.body);
    db.register([user[0].first_name, user[0].last_name, user[0].email, user[0].password, user[0].newsletter], (err, users) => {
      if (!err) {
        res.send(users);
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
        res.status(200).send(user);
      } else {
        res.send(err)
      }
    });
  }
};
