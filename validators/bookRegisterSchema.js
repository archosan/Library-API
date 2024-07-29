const joi = require("joi");

const bookRegisterSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must be at most 30 characters",
    "any.required": "Title is required",
  }),
  score: joi.number().min(0.0).max(10.0).messages({
    "number.base": "Score must be a number",
    "number.min": "Score must be at least 0",
    "number.max": "Score must be at most 5",
  }),
});

module.exports = bookRegisterSchema;
