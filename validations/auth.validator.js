const Joi = require("joi");

const loginBodyValidationSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { loginBodyValidationSchema };
