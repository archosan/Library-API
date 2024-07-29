const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Book = require("./Book");
const User = require("./User");

const Loan = sequelize.define(
  "Loan",
  {
    loanDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "loans",
    freezeTableName: true,
  }
);

module.exports = Loan;
