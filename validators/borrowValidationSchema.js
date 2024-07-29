const joi = require("joi");

const borrowValidationSchema = joi.object({
  id: joi.number().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  bookid: joi.number().required().messages({
    "number.base": "Book ID must be a number",
    "any.required": "Book ID is required",
  }),
});

module.exports = borrowValidationSchema;
