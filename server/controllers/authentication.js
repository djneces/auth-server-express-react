const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//create token for user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  //sub (subject), iat (issued at time)
  //user.id (_id in the DB)
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  //user has already had their email and password auth'd
  //we just need to give them a token
  //req.user = user form callback done in Local strategy (passport.js)
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }

  //*here can be used validation

  //see if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    //if a user with email does exist, return error
    //422 unprocessable entity
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //if a user with email does NOT exist, create and save user record
    const user = new User({ email: email, password: password });
    //passing callback into save()
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
