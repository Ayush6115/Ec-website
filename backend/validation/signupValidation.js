const joi = require('joi')

const signupSchema = joi.object({
  name: joi.string().min(4).max(30).required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 4 characters',
      'string.max': 'Name must be at most 30 characters',
    }),
  phone: joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'string.empty': 'Phone number is required',
    }),
  email: joi.string().email().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    }),
  password: joi.string().min(5).max(30).required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 5 characters',
      'string.max': 'Password must be at most 30 characters',
    }),
});

module.exports = signupSchema


// const userSchema = joi.object({
//   name:joi.string().min(4).max(30).required(),
//   phone:joi.string().pattern(/^[0-9]{10}$/).required(),
//   email:joi.string().email().required(),
//   password:joi.string().min(5).max(30).required()
// })