const Joi = require("@hapi/joi");

module.exports = {
  registerEmail: Joi.object({
    first_name: Joi.string().required().empty().messages({
      "string.base": `first name should be a type of 'text'`,
      "string.empty": `first name cannot be an empty field`,
      "any.required": `first name is a required field`,
    }),
    last_name: Joi.string().required().empty().messages({
      "string.base": `last name should be a type of 'text'`,
      "string.empty": `last name cannot be an empty field`,
      "any.required": `last name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    role: Joi.string().valid('Bulk Customers', 'Corporate Customers', 'Retail Customers').required().messages({
      'string.base'  : `status should be a type of 'text'`,
      'string.empty' : `status canot be an empty field`,
      'string.valid' : `status should be 'Bulk Customers' or 'Corporate Customers' or 'Retail Customers'`,
    }),
    phone_number: Joi.number().required().messages({
      'number.base'  : `phone should be a type of 'number'`,
      'number.empty' : `phone cannot be an empty field`,
    }),
    password: Joi.string().required().empty().regex(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).*$/).min(8).max(16).messages({
      'string.base'         : `password should be a type of 'text'`,
      'string.empty'        : `password cannot be an empty field`,
      'string.min'          : 'password should be of minimum 8 characters',
      'string.max'          : 'password should be of maximum 16 characters',
      'string.pattern.base' : 'password must contain at least one uppercase alphabet, lowercase alphabet, number, and special characters.',
      'any.required'        : `password is a required field`,
    }),
    confirm_password: Joi.string().required().empty().regex(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).*$/).min(8).max(16).messages({
      'string.base'         : `confirm_password should be a type of 'text'`,
      'string.empty'        : `confirm_password cannot be an empty field`,
      'string.min'          : 'confirm_password should be of minimum 8 characters',
      'string.max'          : 'confirm_password should be of maximum 16 characters',
      'string.pattern.base' : 'confirm_password must contain at least one uppercase alphabet, lowercase alphabet, number, and special characters.',
      'any.required'        : `confirm_password is a required field`,
    })
  }),


  registerMobile : Joi.object({
    phone_number: Joi.number().required().messages({
      'number.base'  : `phone should be a type of 'number'`,
      'number.empty' : `phone cannot be an empty field`,
    }),
  }),
  
  login : Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().required().empty().regex(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).*$/).min(8).max(16).messages({
      'string.base'         : `password should be a type of 'text'`,
      'string.empty'        : `password cannot be an empty field`,
      'string.min'          : 'password should be of minimum 8 characters',
      'string.max'          : 'password should be of maximum 16 characters',
      'string.pattern.base' : 'password must contain at least one uppercase alphabet, lowercase alphabet, number, and special characters.',
      'any.required'        : `password is a required field`,
    }),
  })
};