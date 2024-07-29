const joi = require("joi");

const returnBookValidationSchema = joi.object({
  id: joi.number().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  loanid: joi.number().required().messages({
    "number.base": "Loan ID must be a number",
    "any.required": "Loan ID is required",
  }),
});

module.exports = returnBookValidationSchema;
