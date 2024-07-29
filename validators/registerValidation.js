const joi = require("joi");

const registerValidationSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 30 characters",
    "any.required": "Name is required",
  }),
});

module.exports = registerValidationSchema;
