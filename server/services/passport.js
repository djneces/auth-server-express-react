const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy (to login with email and password)
//specify that username is email
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  //verify this email and password, call done with the user
  //if it is the correct email and password
  //otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    //user not found
    if (!user) {
      return done(null, false);
    }

    //compare passwords - is password equal to user.password (compare encrypted password from the Db to a normal password)?
    //user - user that we found in the DB, password = from the request
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      //didn't match
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

//setup options for JWT Strategy
const jwtOptions = {
  //where to look on request to find the key
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  //secret to decode
  secretOrKey: config.secret,
};

//create JWT Strategy
//payload - decoded Jwt token (including user.id and timestamp), done - callback
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //see if the user Id in the payload exists in our DB
  //if it does, call 'done' with that user
  //otherwise, call done without an user object

  User.findById(payload.sub, function (err, user) {
    //err populated only if the search fails (don't have access to the DB, etc..)
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      //no error, no found user
      done(null, false);
    }
  });
});

//tel passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
