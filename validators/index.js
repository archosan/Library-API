const registerValidationSchema = require("./registerValidation");
const idValidationSchema = require("./idValidationSchema");
const bookRegisterSchema = require("./bookRegisterSchema");
const borrowValidationSchema = require("./borrowValidationSchema");
const returnBookValidationSchema = require("./returnBookValidationSchema");

module.exports = {
  registerValidationSchema,
  idValidationSchema,
  bookRegisterSchema,
  borrowValidationSchema,
  returnBookValidationSchema,
};
