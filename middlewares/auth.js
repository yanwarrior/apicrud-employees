const passport = require('passport');
const passportJWT = require('passport-jwt');
const mysqlConnector = require('../configs/database.js');
const configAuth = require('../configs/auth.js');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: configAuth.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = () => {
  var strategy = new Strategy(params, (payload, done) => {
    mysqlConnector.query("SELECT * FROM user WHERE email=?", [payload.email], (err, rows, fields) => {
      if (!err && rows.length != 0) {
        return done(null, {email: rows[0].email});
      } else {
        return done(new Error('User not found ' + JSON.stringify(err)), null);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", configAuth.jwtSession);
    }
  }
};

