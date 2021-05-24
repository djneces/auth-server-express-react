const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
  //email first turned into lowercase, to pass the uniqueness check
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//On Save Hook, encrypt password

//before saving a model, run this func
userSchema.pre('save', function (next) {
  //user model (user is an instance)
  const user = this;
  //generate a salt, takes time -> callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    //hash the password using the salt, takes time -> callback
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

//compare passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  //this.password = hashed and salted password (stored in the Db)
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//create the model class
const model = mongoose.model('user', userSchema);

//export the model
module.exports = model;
