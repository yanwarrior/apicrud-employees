var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var mysqlConnection = require('../configs/database.js');
var configAuth = require('../configs/auth.js');


router.post("/token-create", (req, res) => {
  if (req.body.email && req.body.password) {
    let email = req.body.email;
    let password = req.body.password;

    mysqlConnection.query('SELECT * FROM user WHERE email=? AND password=?', [email, password], (err, rows, fields) => {
      if (!err) {
        let users = rows;
        if (users.length) {
          let payload = {
            email: users[0].email
          };
          let token = jwt.encode(payload, configAuth.jwtSecret);
          res.json({
            token: token
          });
        } else {
          res.json("Login invalid.");
        }        
      } else {
        res.json(JSON.stringify(err));
      }
    })
  } else {
    res.json("Invalid your data login.");
  }
});

module.exports = router;
