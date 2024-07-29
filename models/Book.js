const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Loan = require("./Loan");

const Book = sequelize.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "books",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Book;
