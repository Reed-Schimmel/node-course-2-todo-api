const mongoose = require('mongoose');
const validator = require('validator');
  
  const User = mongoose.model('User', {
    email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
      validate: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    }
  });
  
module.exports = { User };
