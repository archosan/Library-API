const joi = require("joi");

const idValidationSchema = joi.object({
  id: joi.number().required().messages({
    "number.base": "Id must be a number",
    "any.required": "Id is required",
  }),
});

module.exports = idValidationSchema;
