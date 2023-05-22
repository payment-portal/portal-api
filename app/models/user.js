const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const environment = require('../../config/environment');
const { createEncryption } = require('../utils/encryption.utils');

const UserSchema = new mongoose.Schema(
  {
    role: [{
      type: String,
      enum: ['shareholder', 'user', 'admin'], /// Not sure if you use this enum setup, but feel free to change it. As you mentioned, I think we should have one more designation of "super"
    }],
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    firstName: { 
      type: String
    },
    lastName: { 
      type: String
    },
    password: {
      type: String,
    },
  }
);

/*
* This function hashes the user's password before storing it
* */
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

/*
* These are helper functions attached to the model. They can only be
* used when an instance of the model has been created
* */
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getPublicUserData = async function () {
  const user = this.toJSON();
  delete user.password;
  return user;
};

UserSchema.methods.createAccessToken = function () {
  let expiresIn = parseFloat(environment.JWT_EXPIRATION_IN_MINUTES);
  if (Number.isNaN(expiresIn)) expiresIn = 0;
  expiresIn *= 60000;

  return createEncryption(jwt.sign(
    { _id: this.id },
    environment.JWT_SECRET,
    { expiresIn },
  ));
};

/*
* These are helper functions attached to the model. They can be
* used without creating an instance of the model.`
* */
UserSchema.statics.findByEmailAddress = function (email) {
  return this.findOne({ email });
};

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);
