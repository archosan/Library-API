const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
