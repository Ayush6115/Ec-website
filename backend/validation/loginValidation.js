const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(5).max(30).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 5 characters',
    'string.max': 'Password must be less than or equal to 30 characters',
  }),
});

module.exports = loginSchema;
