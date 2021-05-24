const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//object, middleware, using jwt strategy. Passport by default uses cookie based session, we use token => false
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send('hi there');
  });
  //before the user gets to see Authentication.signin, the have to run through the local strategy middleware (if they don't supply correct email and password, they're out)
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
